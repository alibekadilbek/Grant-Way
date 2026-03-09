export interface Program {
  id: number;
  university_id: number;
  name: string;
  specialty: string;
  degree: string;
  grant_name: string;
  criteria: string;
  min_gpa: number;
  min_ielts: number;
  uni_name?: string;
  country?: string;
  probability?: number;
}

export interface University {
  id: number;
  name: string;
  country: string;
  city: string;
  website: string;
  email: string;
  description: string;
}

export const UNIVERSITIES: University[] = [
  {
    id: 1,
    name: "Technical University of Munich",
    country: "Germany",
    city: "Munich",
    website: "https://www.tum.de",
    email: "studium@tum.de",
    description: "One of Europe's top universities for engineering and tech."
  },
  {
    id: 2,
    name: "Eötvös Loránd University (ELTE)",
    country: "Hungary",
    city: "Budapest",
    website: "https://www.elte.hu",
    email: "iro@elte.hu",
    description: "Oldest and largest university in Hungary."
  },
  {
    id: 3,
    name: "Middle East Technical University",
    country: "Turkey",
    city: "Ankara",
    website: "https://www.metu.edu.tr",
    email: "oidb@metu.edu.tr",
    description: "Leading research university in Turkey."
  },
  {
    id: 4,
    name: "University of Oxford",
    country: "United Kingdom",
    city: "Oxford",
    website: "https://www.ox.ac.uk",
    email: "study@ox.ac.uk",
    description: "World-renowned research university."
  },
  {
    id: 5,
    name: "Seoul National University",
    country: "South Korea",
    city: "Seoul",
    website: "https://en.snu.ac.kr",
    email: "admission@snu.ac.kr",
    description: "Top-ranked university in Korea."
  },
  {
    id: 6,
    name: "Tsinghua University",
    country: "China",
    city: "Beijing",
    website: "https://www.tsinghua.edu.cn",
    email: "admission@tsinghua.edu.cn",
    description: "Premier research university in China."
  }
];

export const PROGRAMS: Program[] = [
  {
    id: 1,
    university_id: 1,
    name: "Informatics",
    specialty: "Computer Science",
    degree: "Master",
    grant_name: "DAAD",
    criteria: "IELTS 6.5, GPA 3.2/4.0",
    min_gpa: 3.2,
    min_ielts: 6.5
  },
  {
    id: 2,
    university_id: 1,
    name: "Mechanical Engineering",
    specialty: "Engineering",
    degree: "Master",
    grant_name: "DAAD",
    criteria: "IELTS 6.5, GPA 3.0/4.0",
    min_gpa: 3.0,
    min_ielts: 6.5
  },
  {
    id: 3,
    university_id: 2,
    name: "Computer Science",
    specialty: "IT",
    degree: "Bachelor",
    grant_name: "Stipendium Hungaricum",
    criteria: "IELTS 5.5, GPA 2.8/4.0",
    min_gpa: 2.8,
    min_ielts: 5.5
  },
  {
    id: 4,
    university_id: 2,
    name: "International Relations",
    specialty: "Social Sciences",
    degree: "Master",
    grant_name: "Stipendium Hungaricum",
    criteria: "IELTS 6.0, GPA 3.0/4.0",
    min_gpa: 3.0,
    min_ielts: 6.0
  },
  {
    id: 5,
    university_id: 3,
    name: "Architecture",
    specialty: "Design",
    degree: "Bachelor",
    grant_name: "Türkiye Bursları",
    criteria: "IELTS 6.0, GPA 2.8/4.0",
    min_gpa: 2.8,
    min_ielts: 6.0
  },
  {
    id: 6,
    university_id: 4,
    name: "Public Policy",
    specialty: "Social Sciences",
    degree: "Master",
    grant_name: "Chevening",
    criteria: "IELTS 7.5, GPA 3.8/4.0",
    min_gpa: 3.8,
    min_ielts: 7.5
  },
  {
    id: 7,
    university_id: 5,
    name: "Business Administration",
    specialty: "Business",
    degree: "Bachelor",
    grant_name: "GKS (Global Korea Scholarship)",
    criteria: "IELTS 6.0, GPA 3.2/4.0",
    min_gpa: 3.2,
    min_ielts: 6.0
  },
  {
    id: 8,
    university_id: 6,
    name: "Global Affairs",
    specialty: "Social Sciences",
    degree: "Master",
    grant_name: "Schwarzman Scholars",
    criteria: "IELTS 7.0, GPA 3.6/4.0",
    min_gpa: 3.6,
    min_ielts: 7.0
  }
];
