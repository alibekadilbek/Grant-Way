import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("grants.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS universities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    website TEXT,
    email TEXT,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    university_id INTEGER,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    degree TEXT NOT NULL,
    grant_name TEXT,
    criteria TEXT,
    min_gpa REAL,
    min_ielts REAL,
    FOREIGN KEY (university_id) REFERENCES universities(id)
  );
`);

// Seed Data if empty
const universityCount = db.prepare("SELECT COUNT(*) as count FROM universities").get() as { count: number };
if (universityCount.count === 0) {
  const insertUni = db.prepare("INSERT INTO universities (name, country, city, website, email, description) VALUES (?, ?, ?, ?, ?, ?)");
  const insertProg = db.prepare("INSERT INTO programs (university_id, name, specialty, degree, grant_name, criteria, min_gpa, min_ielts) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

  const unis = [
    ["Technical University of Munich", "Germany", "Munich", "https://www.tum.de", "studium@tum.de", "One of Europe's top universities for engineering and tech."],
    ["Eötvös Loránd University (ELTE)", "Hungary", "Budapest", "https://www.elte.hu", "iro@elte.hu", "Oldest and largest university in Hungary."],
    ["Middle East Technical University", "Turkey", "Ankara", "https://www.metu.edu.tr", "oidb@metu.edu.tr", "Leading research university in Turkey."],
    ["University of Oxford", "United Kingdom", "Oxford", "https://www.ox.ac.uk", "study@ox.ac.uk", "World-renowned research university."],
    ["Seoul National University", "South Korea", "Seoul", "https://en.snu.ac.kr", "admission@snu.ac.kr", "Top-ranked university in Korea."],
    ["Tsinghua University", "China", "Beijing", "https://www.tsinghua.edu.cn", "admission@tsinghua.edu.cn", "Premier research university in China."]
  ];

  unis.forEach((uni, idx) => {
    const info = insertUni.run(...uni);
    const uniId = info.lastInsertRowid;

    if (uni[0] === "Technical University of Munich") {
      insertProg.run(uniId, "Informatics", "Computer Science", "Master", "DAAD", "IELTS 6.5, GPA 4.0/5.0", 4.0, 6.5);
      insertProg.run(uniId, "Mechanical Engineering", "Engineering", "Master", "DAAD", "IELTS 6.5, GPA 3.8/5.0", 3.8, 6.5);
    } else if (uni[0] === "Eötvös Loránd University (ELTE)") {
      insertProg.run(uniId, "Computer Science", "IT", "Bachelor", "Stipendium Hungaricum", "IELTS 5.5, GPA 3.5/5.0", 3.5, 5.5);
      insertProg.run(uniId, "International Relations", "Social Sciences", "Master", "Stipendium Hungaricum", "IELTS 6.0, GPA 3.7/5.0", 3.7, 6.0);
    } else if (uni[0] === "Middle East Technical University") {
      insertProg.run(uniId, "Architecture", "Design", "Bachelor", "Türkiye Bursları", "IELTS 6.0, GPA 3.5/5.0", 3.5, 6.0);
    } else if (uni[0] === "University of Oxford") {
      insertProg.run(uniId, "Public Policy", "Social Sciences", "Master", "Chevening", "IELTS 7.5, GPA 4.8/5.0", 4.8, 7.5);
    } else if (uni[0] === "Seoul National University") {
      insertProg.run(uniId, "Business Administration", "Business", "Bachelor", "GKS (Global Korea Scholarship)", "IELTS 6.0, GPA 4.0/5.0", 4.0, 6.0);
    } else if (uni[0] === "Tsinghua University") {
      insertProg.run(uniId, "Global Affairs", "Social Sciences", "Master", "Schwarzman Scholars", "IELTS 7.0, GPA 4.5/5.0", 4.5, 7.0);
    }
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/universities", (req, res) => {
    const { search, country, specialty } = req.query;
    let query = `
      SELECT u.*, p.name as program_name, p.specialty, p.degree, p.grant_name, p.criteria
      FROM universities u
      JOIN programs p ON u.id = p.university_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (search) {
      query += " AND (u.name LIKE ? OR p.name LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }
    if (country) {
      query += " AND u.country = ?";
      params.push(country);
    }
    if (specialty) {
      query += " AND p.specialty = ?";
      params.push(specialty);
    }

    const results = db.prepare(query).all(...params);
    res.json(results);
  });

  app.post("/api/calculator", (req, res) => {
    const { gpa, ielts, country, specialty } = req.body;
    
    // Simple logic for probability
    // We find programs where criteria are met or close
    let query = `
      SELECT u.name as uni_name, u.country, p.*
      FROM programs p
      JOIN universities u ON u.id = p.university_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (country && country !== "Any") {
      query += " AND u.country = ?";
      params.push(country);
    }
    if (specialty && specialty !== "Any") {
      query += " AND p.specialty = ?";
      params.push(specialty);
    }

    const allPrograms = db.prepare(query).all(...params) as any[];
    
    const results = allPrograms.map(prog => {
      let score = 0;
      let maxScore = 2;
      
      if (gpa >= prog.min_gpa) score++;
      else if (gpa >= prog.min_gpa - 0.5) score += 0.5;

      if (ielts >= prog.min_ielts) score++;
      else if (ielts >= prog.min_ielts - 0.5) score += 0.5;

      const probability = (score / maxScore) * 100;
      
      return {
        ...prog,
        probability: Math.min(probability, 100)
      };
    }).sort((a, b) => b.probability - a.probability);

    res.json(results);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
