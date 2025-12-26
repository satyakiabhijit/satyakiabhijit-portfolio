export interface Project {
    id: string;
    name: string;
    description: string;
    longDescription?: string;
    techStack: string[];
    category: string;
    github?: string;
    demo?: string;
    image?: string;
    featured?: boolean;
    year?: string;
}

export const projects: Project[] = [
    {
        id: "hotel-booking",
        name: "Bookongo - Hotel Booking System",
        description: "Full-stack MERN application for hotel room booking with payment integration and admin dashboard",
        longDescription: "Complete booking platform with payment integration, room management, user authentication, and admin dashboard for managing reservations.",
        techStack: ["React", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
        category: "fullstack",
        github: "https://github.com/satyakiabhijit/bookongo",
        demo: "https://bookongo.vercel.app",
        featured: true,
        year: "2024"
    },
    {
        id: "phishing-detection",
        name: "Phishing Website Detection",
        description: "ML-powered cybersecurity solution for detecting phishing websites with 97% accuracy",
        longDescription: "Machine learning model trained on URL features to classify websites as legitimate or phishing. Includes a web interface for real-time detection.",
        techStack: ["Python", "TensorFlow", "Flask", "Scikit-learn"],
        category: "ai-ml",
        github: "https://github.com/satyakiabhijit/Phishing-Website-Detection",
        featured: true,
        year: "2024"
    },
    {
        id: "resumelyze",
        name: "Resumelyzer - ATS Resume Checker",
        description: "AI-powered resume optimization and ATS compatibility checker built with Streamlit",
        longDescription: "Analyzes resumes against job descriptions, provides ATS score, keyword matching, and suggestions for improvement.",
        techStack: ["Python", "Streamlit", "NLP", "Google Gemini AI"],
        category: "ai-ml",
        github: "https://github.com/satyakiabhijit/resumelyze",
        demo: "https://resumelyzer.streamlit.app/",
        featured: true,
        year: "2024"
    },
    {
        id: "gamehub",
        name: "GameHub",
        description: "Interactive gaming platform with multiple classic games including Chess with full AI and modern UI design",
        techStack: ["React", "TypeScript", "Chakra UI", "RAWG API"],
        category: "web",
        github: "https://github.com/satyakiabhijit/gamehub",
        demo: "https://game-hub-satyakiabhijit.vercel.app",
        featured: true,
        year: "2024"
    },
    {
        id: "business-card",
        name: "Business Card Generator",
        description: "Create professional digital business cards with customizable templates and export options",
        techStack: ["JavaScript", "HTML5", "CSS3", "Canvas API"],
        category: "web",
        github: "https://github.com/satyakiabhijit/business-card-generator",
        demo: "https://business-card-generator-eight.vercel.app",
        year: "2024"
    },
    {
        id: "sound-wave",
        name: "Sound Wave",
        description: "Music streaming web application with playlist management and audio visualization",
        techStack: ["JavaScript", "Web Audio API", "HTML5", "CSS3"],
        category: "web",
        github: "https://github.com/satyakiabhijit/Sound_Wave",
        demo: "https://sound-wave-iota.vercel.app",
        year: "2024"
    },
    {
        id: "hypermathix",
        name: "HyperMathix",
        description: "Interactive math learning platform with games and educational content",
        techStack: ["JavaScript", "HTML5", "CSS3"],
        category: "web",
        github: "https://github.com/satyakiabhijit/HyperMathix",
        demo: "https://satyakiabhijit.github.io/HyperMathix/",
        year: "2024"
    },
    {
        id: "plant-disease",
        name: "Plant Disease Detection",
        description: "CNN-based model to identify plant diseases from leaf images with high accuracy",
        techStack: ["Python", "TensorFlow", "CNN", "OpenCV"],
        category: "ai-ml",
        github: "https://github.com/satyakiabhijit/Plant_Disease_Detection",
        year: "2024"
    },
    {
        id: "ai-assistant",
        name: "AI Assistant",
        description: "Voice-controlled AI assistant with natural language processing capabilities",
        techStack: ["Python", "Speech Recognition", "NLP", "pyttsx3"],
        category: "ai-ml",
        github: "https://github.com/satyakiabhijit/Ai_Assistant",
        year: "2023"
    }
];

export const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Development" },
    { id: "fullstack", name: "Full-Stack" },
    { id: "ai-ml", name: "AI/ML" },
];
