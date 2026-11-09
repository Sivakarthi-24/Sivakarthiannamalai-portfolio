/**
 * ====================================================================
 * PORTFOLIO DATA CONFIGURATION
 * Sivakarthi A | ECE Student @ Panimalar Engineering College
 * ====================================================================
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Sivakarthi A",
    college: "Panimalar Engineering College, Chennai, India",
    department: "Electronics and Communication Engineering (ECE)",
    studyStartYear: 2026,
    studyStartMonth: 6,
    studyDuration: 4,
    role: "ECE Student | Aspiring Embedded Systems & IoT Developer",
    tagline: "Bridging software algorithms and hardware circuits through practical engineering.",
    location: "Chennai, Tamil Nadu, India",
    photoPath: "https://raw.githubusercontent.com/Sivakarthi-24/Sivakarthiannamalai-portfolio/main/profile-photo.jpeg",
    github: "https://github.com/Sivakarthi-24",
    linkedin: "https://www.linkedin.com/in/sivakarthi-annamalai?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    email: "sivakarthiannamalai@gmail.com",
    contactEndpoint: "",
    resumePath: "assets/resume-placeholder.pdf"
  },

  skills: [
    {
      name: "C Programming",
      category: "languages",
      level: "Beginner",
      levelClass: "beginner",
      description: "Core syntax, data types, pointers, structures, memory handling, and algorithmic problem solving.",
      icon: "code"
    },
    {
      name: "Python",
      category: "languages",
      level: "Beginner",
      levelClass: "beginner",
      description: "Fundamentals, data structures, conditional logic, file handling, and introductory automation.",
      icon: "terminal"
    },
    {
      name: "C++",
      category: "languages",
      level: "Learning",
      levelClass: "learning",
      description: "Exploring object-oriented programming, classes, objects, and standard library basics.",
      icon: "cpu"
    },
    {
      name: "Java",
      category: "languages",
      level: "Learning",
      levelClass: "learning",
      description: "Understanding core OOP ideas, syntax, control structures, and standard runtime concepts.",
      icon: "coffee"
    },
    {
      name: "HTML5",
      category: "web",
      level: "Learning",
      levelClass: "learning",
      description: "Semantic page structures, accessibility basics, forms, media integration, and modern standards.",
      icon: "layout"
    },
    {
      name: "CSS3",
      category: "web",
      level: "Learning",
      levelClass: "learning",
      description: "Flexbox, CSS Grid, responsive design, and custom properties.",
      icon: "palette"
    },
    {
      name: "JavaScript",
      category: "web",
      level: "Learning",
      levelClass: "learning",
      description: "Modern ES6+ syntax, DOM updates, event listeners, fetch API, and interactive UI logic.",
      icon: "zap"
    },
    {
      name: "REST APIs",
      category: "web",
      level: "Practicing",
      levelClass: "learning",
      description: "Fetching live data, handling asynchronous responses, and presenting API results in responsive interfaces.",
      icon: "wifi"
    },
    {
      name: "Local Storage",
      category: "web",
      level: "Practicing",
      levelClass: "learning",
      description: "Persisting client-side application state for offline-capable tools and browser-based workflows.",
      icon: "layout"
    },
    {
      name: "Git & GitHub",
      category: "tools",
      level: "Learning",
      levelClass: "learning",
      description: "Version control workflows, commit tracking, branches, repository hosting, and collaboration basics.",
      icon: "git-branch"
    },
    {
      name: "Embedded Systems",
      category: "hardware",
      level: "Exploring",
      levelClass: "exploring",
      description: "Microcontroller architecture basics, GPIO pins, digital logic, and hardware-software interfacing.",
      icon: "microchip"
    },
    {
      name: "IoT (Internet of Things)",
      category: "hardware",
      level: "Exploring",
      levelClass: "exploring",
      description: "Sensor data collection, connected microcontrollers, telemetry protocols, and smart systems concepts.",
      icon: "wifi"
    }
  ],

  projects: [
    {
      id: "personal-portfolio-website",
      title: "Personal Portfolio Website",
      shortDescription: "A responsive engineering portfolio highlighting technical skills, student projects, and academic goals.",
      technologies: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive design", "Canvas animation"],
      status: "Completed / Active",
      statusBadge: "status-active",
      githubUrl: "https://github.com/Sivakarthi-24/Sivakarthiannamalai-portfolio",
      modalDetails: {
        problemStatement: "I wanted a clear, accessible web presence to share my coursework, skills, and project work as an ECE student.",
        keyFeatures: [
          "Responsive layout with a subtle animated background",
          "Data-driven skills, project, and certificate sections",
          "Dark mode by default with persistent light-mode toggle",
          "Accessible project detail dialogs with keyboard support",
          "Interactive C-code terminal preview"
        ],
        circuitOrArchitecture: "Static client-side architecture using semantic HTML, CSS design tokens, a lightweight canvas animation, and vanilla JavaScript.",
        keyLearnings: [
          "Designing for accessibility and responsiveness while creating rich visual aesthetics",
          "Building modular CSS and canvas effects without heavy third-party bloat",
          "Keeping profile, skills, and projects in one clean, editable data structure"
        ],
        futureEnhancements: [
          "Publish live hardware circuit simulations via Wokwi",
          "Add project documentation and Arduino prototypes"
        ]
      }
    },
    {
      id: "space-racing",
      title: "Space Racing",
      shortDescription: "A student game concept on GitHub: interstellar speedway mechanics explored while learning programming loops, version control, and game physics.",
      technologies: ["Game Design", "GitHub", "Python / C (planned)"],
      status: "In Progress",
      statusBadge: "status-example",
      githubUrl: "https://github.com/Sivakarthi-24/Space-racing",
      modalDetails: {
        problemStatement: "I wanted a fun first GitHub project that would push me to plan a small game loop, store code in Git, and keep iterating as my programming skills grow.",
        keyFeatures: [
          "Public GitHub repository for the Space Racing concept",
          "Focus on player movement, obstacles, and a simple score loop",
          "Practice with commits, repository setup, and documenting student work"
        ],
        circuitOrArchitecture: "Planned as a small 2D game loop: input handling, player state, collision checks, and a score/display layer. Implementation is actively progressing on GitHub.",
        keyLearnings: [
          "Creating and publishing a GitHub repository",
          "Breaking a game idea into smaller programming tasks",
          "Keeping student projects public so they can grow over time"
        ],
        futureEnhancements: [
          "Ship a playable prototype with collision and scoring",
          "Add a README with controls, controls graphics, and screenshots"
        ]
      }
    },
    {
      id: "student-record-system",
      title: "Student Record Management System",
      shortDescription: "A console C program to manage student academic records, calculate GPA, and store data with structures and file handling.",
      technologies: ["C", "File Handling", "Structs", "CLI"],
      status: "In Progress",
      statusBadge: "status-example",
      githubUrl: "",
      modalDetails: {
        problemStatement: "Paper lists and messy spreadsheets make student marks easy to lose. This project uses C file I/O to keep a small local record system.",
        keyFeatures: [
          "Add, edit, view, and delete student records by roll number",
          "GPA / percentage calculation from semester marks",
          "File persistence so data survives between runs",
          "Menu-driven command-line interface with input checks"
        ],
        circuitOrArchitecture: "Console flow: input validation, GPA processing, then file storage with C FILE pointers.",
        keyLearnings: [
          "Pointers and structured data in C",
          "Custom struct definitions",
          "File streams with fopen, fread, fwrite, and error handling"
        ],
        futureEnhancements: [
          "CSV export",
          "Simple admin login",
          "Sort by rank or name"
        ]
      }
    },
    {
      id: "number-guessing-game",
      title: "Number Guessing Game",
      shortDescription: "A Python command-line guessing game with random numbers, difficulty levels, input validation, and score tracking.",
      technologies: ["Python 3", "CLI", "Logic Flow", "Exception Handling"],
      status: "In Progress",
      statusBadge: "status-example",
      githubUrl: "",
      modalDetails: {
        problemStatement: "A foundational programming exercise to master control flow, randomized logic, user input sanitization, and edge case handling in Python.",
        keyFeatures: [
          "Dynamic number generation using Python's random module",
          "Three configurable difficulty levels with attempt metrics",
          "Input sanitization to handle non-numeric entries gracefully",
          "Replay loop and round-by-round hint indicators"
        ],
        circuitOrArchitecture: "Logic flow: input sanitization -> state assessment -> feedback output -> repeat or terminate.",
        keyLearnings: [
          "Implementing robust try-except blocks",
          "Managing loop conditions and state variables",
          "Writing clean, readable, modular Python functions"
        ],
        futureEnhancements: [
          "Tkinter GUI interface",
          "Persistent high-score leaderboard"
        ]
      }
    },
    {
      id: "taskflow",
      title: "TaskFlow — Smart Productivity Manager",
      shortDescription: "An offline-capable task manager for organizing work, personal, study, and project tasks, built with vanilla web technologies.",
      technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "LocalStorage", "Drag and Drop API"],
      status: "Completed",
      statusBadge: "status-active",
      githubUrl: "https://github.com/Sivakarthi-24/Taskflow",
      modalDetails: {
        problemStatement: "TaskFlow provides a simple, browser-based way to organize tasks and track progress without requiring an account or backend.",
        keyFeatures: [
          "Create, view, edit, and delete tasks",
          "Organize tasks into five categories with Low, Medium, and High priorities",
          "Track due dates and filter by active, completed, or overdue status",
          "Search tasks and reorder them with drag and drop",
          "Offline LocalStorage persistence, dashboard statistics, and progress bar",
          "Light/dark themes, keyboard shortcuts, responsive layouts, and accessible navigation"
        ],
        circuitOrArchitecture: "A standalone HTML, CSS, and vanilla JavaScript app. Task state and ordering are persisted in browser LocalStorage, so the app works offline without a server.",
        keyLearnings: [
          "Managing CRUD state and persistence with browser LocalStorage",
          "Building drag-and-drop ordering and interactive filters",
          "Designing responsive, accessible interfaces with keyboard controls"
        ],
        futureEnhancements: [
          "Deploy a public demo and add its URL when available"
        ]
      }
    },
    {
      id: "nami-weather",
      title: "Nami Weather",
      shortDescription: "A responsive weather dashboard for current conditions and a five-day forecast, using live weather data for cities around the world.",
      technologies: ["HTML", "CSS", "JavaScript", "OpenWeatherMap API", "REST"],
      status: "GitHub Project",
      statusBadge: "status-active",
      githubUrl: "https://github.com/Sivakarthi-24/nami-weather",
      modalDetails: {
        problemStatement: "Nami Weather makes current conditions and forecast information easy to check for a searched city.",
        keyFeatures: [
          "Search for global cities and retrieve current weather conditions",
          "Show temperature, humidity, wind speed, and atmospheric pressure",
          "Display a five-day temperature forecast",
          "Present weather conditions with matching icons",
          "Handle loading and invalid-city states in a responsive interface"
        ],
        circuitOrArchitecture: "A client-side dashboard that requests weather data asynchronously from the OpenWeatherMap REST API and updates the interface with the current conditions and forecast.",
        keyLearnings: [
          "Calling a third-party REST API from JavaScript",
          "Handling asynchronous loading and invalid search results",
          "Presenting current and forecast data in a responsive interface"
        ],
        futureEnhancements: [
          "Add a live demo link when a deployment URL is available"
        ]
      }
    },
    {
      id: "kana-idly-kadai",
      title: "KANA — Tamil Nadu Idly Kadai",
      shortDescription: "A browser-based cooking and restaurant management game inspired by Tamil Nadu tiffin shops, with interactive food preparation and customer service.",
      technologies: ["HTML", "CSS", "JavaScript", "Vercel"],
      status: "Live Game",
      statusBadge: "status-active",
      githubUrl: "https://github.com/Sivakarthi-24/KANA_idly_kadai_game",
      liveUrl: "https://kanaidlykadaigame-five.vercel.app/",
      modalDetails: {
        problemStatement: "KANA turns the atmosphere of a Tamil Nadu tiffin shop into an interactive browser game about preparing food and serving customers.",
        keyFeatures: [
          "Tamil Nadu-inspired dishes and restaurant setting",
          "Interactive cooking and restaurant gameplay",
          "Customer orders, earnings, and tips",
          "Playable directly in the browser"
        ],
        circuitOrArchitecture: "A browser game built with HTML, CSS, and JavaScript and deployed on Vercel.",
        keyLearnings: [
          "Building interactive gameplay with JavaScript",
          "Combining web styling and interaction in a browser game",
          "Deploying a web project to Vercel"
        ],
        futureEnhancements: [
          "Continue expanding the gameplay and restaurant experience"
        ]
      }
    },
    {
      id: "delivery-da",
      title: "Delivery DA",
      shortDescription: "A Tamil Nadu-inspired 2D arcade delivery game about riding a scooter through busy streets to pick up and deliver food orders.",
      technologies: ["HTML", "2D Browser Game"],
      status: "GitHub Project",
      statusBadge: "status-active",
      githubUrl: "https://github.com/Sivakarthi-24/delivery-da",
      modalDetails: {
        problemStatement: "Delivery DA explores an arcade-style food delivery challenge set in busy, Tamil Nadu-inspired streets.",
        keyFeatures: [
          "Ride a scooter to collect and deliver food orders",
          "Navigate busy streets and dodge traffic",
          "Vehicle customization and mission-based gameplay"
        ],
        circuitOrArchitecture: "A 2D browser game project hosted in a public GitHub repository.",
        keyLearnings: [
          "Planning an arcade game around movement, missions, and obstacles",
          "Turning a local setting into a game concept"
        ],
        futureEnhancements: [
          "Add a public gameplay demo when a deployment URL is available"
        ]
      }
    },
    {
      id: "basic-iot-monitoring-project",
      title: "Basic IoT Monitoring Project",
      shortDescription: "A conceptual embedded systems project simulating sensor inputs with microcontroller logic to monitor environmental conditions.",
      technologies: ["C / C++", "Embedded Systems", "Microcontrollers", "IoT"],
      status: "Exploring / Concept",
      statusBadge: "status-exploring",
      githubUrl: "",
      modalDetails: {
        problemStatement: "Environmental tracking is vital in smart agriculture and classrooms. This project explores the foundational principles of interfacing sensors with microcontrollers.",
        keyFeatures: [
          "Sensor input interfacing via General Purpose I/O (GPIO) pins",
          "Threshold alert logic: Triggering visual indicators on parameter breach",
          "Serial monitor telemetry logging with structured timestamp formats",
          "Conceptual foundation for wireless data transmission over Wi-Fi"
        ],
        circuitOrArchitecture: "Hardware Concept: Sensor Module -> ADC / GPIO Input -> Microcontroller (running C/C++) -> Serial Output / Actuator.",
        keyLearnings: [
          "Understanding analog vs. digital sensor signal acquisition",
          "Writing non-blocking timing routines in microcontroller firmware",
          "Exploring fundamental IoT communication protocols (UART, I2C, SPI)"
        ],
        futureEnhancements: [
          "I2C OLED display for live on-device readings",
          "Publishing telemetry to an MQTT broker"
        ]
      }
    }
  ],

  certificates: [
    {
      id: "datheon-full-stack-internship",
      title: "Full Stack Web Development Internship",
      issuer: "Datheon",
      date: "Nov 7–Dec 5, 2026",
      status: "In progress",
      statusClass: "learning",
      description: "A four-week, project-based internship. Completion certificate is pending project submission and evaluation.",
      credentialLinkLabel: "View Program Details",
      credentialUrl: "https://www.datheon.in/training/catalog/full-stack-web-development-internship"
    },
    {
      id: "cert-c-programming-basics",
      title: "C Programming Basics",
      issuer: "SkillUp by Simplilearn",
      date: "Completed · date not listed",
      status: "Earned",
      statusClass: "earned",
      description: "Completed an introductory course in C programming and software development.",
      credentialLinkLabel: "View Certificate",
      credentialUrl: "https://simpli.app.link/kUqG7jFE26b"
    },
    {
      id: "cert-google-vids",
      title: "Create Engaging Video with Google Vids",
      issuer: "SkillUp by Simplilearn",
      date: "Completed · date not listed",
      status: "Earned",
      statusClass: "earned",
      description: "Completed an online course covering Google Vids and generative-AI-aligned skills.",
      credentialLinkLabel: "View Certificate",
      credentialUrl: "https://simpli.app.link/uRw88n5Q26b"
    },
    {
      id: "cert-dca",
      title: "Diploma in Computer Applications (DCA)",
      issuer: "Nimbus Computer Centre · CSRI",
      date: "Jul–Sep 2026 · Distinction",
      status: "Earned",
      statusClass: "earned",
      description: "Completed the Diploma in Computer Applications with a Distinction grade.",
      credentialLinkLabel: "View Announcement",
      credentialUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7517917283390746624/"
    },
    {
      id: "cert-introduction-embedded-systems",
      title: "Introduction to Embedded Systems",
      issuer: "Panimalar Engineering College",
      date: "Completed · date not listed",
      status: "Earned",
      statusClass: "earned",
      description: "Completed an introductory certification in embedded systems.",
      credentialLinkLabel: "View Announcement",
      credentialUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7521568921284497408/"
    }
  ]
};

// Export to window object for browser access
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
