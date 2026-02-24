// =============================
// ROOTLANE RL ENTRANCE TEST
// Total: 50 Marks
// 30 MCQ = 30 Marks
// 5 Text = 20 Marks
// Qualification: 35+
// =============================

const questions = [

  // =========================
  // MCQ SECTION (30 Marks)
  // =========================

  {
    type: "mcq",
    question: "RL stands for?",
    options: [
      "Reinforced Learning",
      "RootLane Certified Developer",
      "Rapid Logic",
      "Real Layer"
    ],
    answer: 1,
    marks: 1
  },
  {
    type: "mcq",
    question: "RootLane Intelligence Systems is primarily?",
    options: [
      "Gaming Company",
      "AI-Powered Software Engineering Startup",
      "Marketing Agency",
      "Hardware Manufacturer"
    ],
    answer: 1,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which language runs in the browser?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: 2,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which is a frontend library?",
    options: ["React", "Node", "MongoDB", "Express"],
    answer: 0,
    marks: 1
  },
  {
    type: "mcq",
    question: "CSS is used for?",
    options: ["Logic", "Database", "Styling", "Server"],
    answer: 2,
    marks: 1
  },
  {
    type: "mcq",
    question: "Git is mainly used for?",
    options: ["Design", "Version Control", "Hosting", "Testing"],
    answer: 1,
    marks: 1
  },
  {
    type: "mcq",
    question: "2 + 3 * 2 = ?",
    options: ["10", "8", "12", "7"],
    answer: 1,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which database is NoSQL?",
    options: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
    answer: 1,
    marks: 1
  },
  {
    type: "mcq",
    question: "API stands for?",
    options: [
      "Application Programming Interface",
      "Applied Program Internet",
      "Advanced Programming Input",
      "Application Private Interface"
    ],
    answer: 0,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which is backend runtime?",
    options: ["React", "Node.js", "HTML", "CSS"],
    answer: 1,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which HTTP method is used to fetch data?",
    options: ["POST", "PUT", "GET", "DELETE"],
    answer: 2,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which company created React?",
    options: ["Google", "Microsoft", "Facebook", "Amazon"],
    answer: 2,
    marks: 1
  },
  {
    type: "mcq",
    question: "Full form of SaaS?",
    options: [
      "Software as a Service",
      "System as a Software",
      "Service as a System",
      "Software as a System"
    ],
    answer: 0,
    marks: 1
  },
  {
    type: "mcq",
    question: "Cloud computing allows?",
    options: [
      "Local storage only",
      "Remote server access",
      "Offline coding",
      "Hardware replacement"
    ],
    answer: 1,
    marks: 1
  },
  {
    type: "mcq",
    question: "Next number: 2, 4, 8, 16, ?",
    options: ["18", "24", "32", "20"],
    answer: 2,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which is not a programming language?",
    options: ["Python", "HTML", "Java", "C++"],
    answer: 1,
    marks: 1
  },
  {
    type: "mcq",
    question: "Database stores?",
    options: ["Images only", "Structured data", "Design only", "Logic only"],
    answer: 1,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which is version control platform?",
    options: ["GitHub", "Figma", "Postman", "Photoshop"],
    answer: 0,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which improves website performance?",
    options: ["Large images", "Code optimization", "No caching", "More plugins"],
    answer: 1,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which is backend language?",
    options: ["HTML", "CSS", "Node.js", "Bootstrap"],
    answer: 2,
    marks: 1
  },
  {
    type: "mcq",
    question: "If 5 machines take 5 minutes for 5 items, time for 100 machines for 100 items?",
    options: ["5 minutes", "100 minutes", "20 minutes", "50 minutes"],
    answer: 0,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which is used for API testing?",
    options: ["Postman", "Figma", "VS Code", "Photoshop"],
    answer: 0,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which layer handles business logic?",
    options: ["Frontend", "Backend", "CSS", "UI"],
    answer: 1,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which is used for responsive design?",
    options: ["Bootstrap", "Node", "Express", "MongoDB"],
    answer: 0,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which protocol is secure?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    answer: 2,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which stores project dependencies?",
    options: ["package.json", "index.html", "style.css", "README.md"],
    answer: 0,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which is cloud provider?",
    options: ["AWS", "HTML", "CSS", "Git"],
    answer: 0,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which is mobile development framework?",
    options: ["Flutter", "MongoDB", "MySQL", "Apache"],
    answer: 0,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which improves scalability?",
    options: ["Hard coding", "Load balancing", "Manual testing", "Inline styling"],
    answer: 1,
    marks: 1
  },
  {
    type: "mcq",
    question: "Which is used for containerization?",
    options: ["Docker", "React", "Bootstrap", "Figma"],
    answer: 0,
    marks: 1
  },

  // =========================
  // TEXT SECTION (20 Marks)
  // =========================

  {
    type: "text",
    question: "What is frontend development?",
    keywords: ["frontend", "user", "interface", "browser", "ui"],
    minWords: 12,
    marks: 4
  },
  {
    type: "text",
    question: "What is backend development?",
    keywords: ["backend", "server", "database", "logic", "api"],
    minWords: 12,
    marks: 4
  },
  {
    type: "text",
    question: "Why is Git important?",
    keywords: ["git", "version", "track", "changes", "repository"],
    minWords: 12,
    marks: 4
  },
  {
    type: "text",
    question: "What does scalable mean in software?",
    keywords: ["scale", "users", "growth", "performance"],
    minWords: 12,
    marks: 4
  },
  {
    type: "text",
    question: "What makes an RL Developer different?",
    keywords: ["system", "architecture", "performance", "evaluation", "intelligence"],
    minWords: 12,
    marks: 4
  }

];