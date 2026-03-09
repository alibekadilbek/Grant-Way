import { UNIVERSITIES, PROGRAMS, Program } from '../data/universities';

export const getUniversities = (search?: string, country?: string, specialty?: string) => {
  let results = PROGRAMS.map(prog => {
    const uni = UNIVERSITIES.find(u => u.id === prog.university_id);
    return {
      ...uni,
      program_name: prog.name,
      specialty: prog.specialty,
      degree: prog.degree,
      grant_name: prog.grant_name,
      criteria: prog.criteria
    };
  });

  if (search) {
    const s = search.toLowerCase();
    results = results.filter(r => 
      r.name?.toLowerCase().includes(s) || 
      r.program_name?.toLowerCase().includes(s)
    );
  }

  if (country && country !== "Any") {
    results = results.filter(r => r.country === country);
  }

  if (specialty && specialty !== "Any") {
    results = results.filter(r => r.specialty === specialty);
  }

  return results;
};

export const calculateProbability = (gpa: number, ielts: number, country?: string, specialty?: string) => {
  let filteredPrograms = PROGRAMS.map(prog => {
    const uni = UNIVERSITIES.find(u => u.id === prog.university_id);
    return {
      ...prog,
      uni_name: uni?.name,
      country: uni?.country
    };
  });

  if (country && country !== "Any") {
    filteredPrograms = filteredPrograms.filter(p => p.country === country);
  }

  if (specialty && specialty !== "Any") {
    filteredPrograms = filteredPrograms.filter(p => p.specialty === specialty);
  }

  const results = filteredPrograms.map(prog => {
    // Weighting: GPA 60%, IELTS 40%
    let gpaScore = 0;
    let ieltsScore = 0;
    
    // GPA Score (0 to 1)
    if (gpa >= prog.min_gpa) {
      gpaScore = 1 + (gpa - prog.min_gpa) * 0.5; // Bonus for exceeding
    } else {
      gpaScore = Math.max(0, 1 - (prog.min_gpa - gpa) * 2);
    }

    // IELTS Score (0 to 1)
    if (ielts >= prog.min_ielts) {
      ieltsScore = 1 + (ielts - prog.min_ielts) * 0.2; // Bonus for exceeding
    } else {
      ieltsScore = Math.max(0, 1 - (prog.min_ielts - ielts) * 1.5);
    }

    // Combine scores with weights
    let totalScore = (gpaScore * 0.6) + (ieltsScore * 0.4);
    
    // Apply a sigmoid-like curve or just cap it
    let probability = totalScore * 85; // Base probability
    
    // If significantly below requirements, drop probability sharply
    if (gpa < prog.min_gpa - 0.4 || ielts < prog.min_ielts - 1.0) {
      probability *= 0.3;
    }

    return {
      ...prog,
      probability: Math.min(Math.round(probability), 100)
    };
  }).sort((a, b) => (b.probability || 0) - (a.probability || 0));

  return results;
};
