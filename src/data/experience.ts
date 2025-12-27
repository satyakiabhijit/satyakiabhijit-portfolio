export interface Experience {
    id: string;
    type: "work" | "education";
    title: string;
    organization: string;
    location?: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string[];
    skills?: string[];
}

export const experiences: Experience[] = [
    // Work Experience
    {
        id: "edulinkup",
        type: "work",
        title: "Web Developer & Software Tester",
        organization: "EduLinkUp",
        startDate: "Dec 2025",
        endDate: "Present",
        current: true,
        description: [
            "Developing and maintaining responsive web applications using modern frameworks",
            "Performing comprehensive software testing to ensure quality and reliability",
            "Collaborating with cross-functional teams to deliver seamless user experiences",
            "Implementing best practices for code quality and testing standards"
        ],
        skills: ["React", "Node.js", "TypeScript", "Testing", "QA"]
    },
    {
        id: "pinnacle-labs",
        type: "work",
        title: "Web Development Intern",
        organization: "Pinnacle Labs",
        startDate: "Jul 2025",
        endDate: "Aug 2025",
        current: false,
        description: [
            "Developed responsive web applications using modern frameworks and technologies",
            "Collaborated with design teams to create user-friendly interfaces",
            "Implemented best practices for cross-browser compatibility"
        ],
        skills: ["React", "JavaScript", "CSS3"]
    },
    {
        id: "haldia-iot-2025",
        type: "work",
        title: "Research Intern - IoMT Security",
        organization: "Haldia Institute of Technology",
        startDate: "Jun 2025",
        endDate: "Jul 2025",
        current: false,
        description: [
            "POCT Security: Implemented Zero-Knowledge Proofs + Merkle Hash Trees for IoMT data protection",
            "Enhanced security protocols for medical data transmission",
            "Contributed to research publication on IoMT security frameworks"
        ],
        skills: ["Python", "Cryptography", "Security", "IoT"]
    },
    {
        id: "tech-talent",
        type: "work",
        title: "WordPress Development Intern",
        organization: "Tech & Talent",
        startDate: "Sep 2024",
        endDate: "Oct 2024",
        current: false,
        description: [
            "Customized and managed WordPress themes and plugins",
            "Optimized website performance and implemented responsive design solutions",
            "Provided technical support and maintenance for multiple websites"
        ],
        skills: ["WordPress", "PHP", "MySQL"]
    },
    {
        id: "haldia-iot-2024",
        type: "work",
        title: "Research Intern - IoMT Optimization",
        organization: "Haldia Institute of Technology",
        startDate: "Jun 2024",
        endDate: "Aug 2024",
        current: false,
        description: [
            "Optimized IoMT data processing achieving 95% reliability",
            "Reduced energy consumption by 8.9% through algorithm optimization",
            "Implemented efficient compressed sensing techniques"
        ],
        skills: ["Python", "Data Science", "IoT", "Optimization"]
    },
    // Education
    {
        id: "jgec",
        type: "education",
        title: "B.Tech in Information Technology",
        organization: "Jalpaiguri Government Engineering College",
        location: "Jalpaiguri, West Bengal",
        startDate: "2023",
        endDate: "Present",
        current: true,
        description: [
            "Pursuing B.Tech in Information Technology with CGPA: 7.5",
            "Active participant in coding competitions and hackathons",
            "Published research in IEEE and SCOPUS-indexed publications",
            "Focusing on web technologies, data structures, algorithms, and ML"
        ],
        skills: ["Data Structures", "Algorithms", "Web Development", "Machine Learning"]
    },
    {
        id: "polytechnic",
        type: "education",
        title: "Diploma in Civil Engineering",
        organization: "Rajganj Government Polytechnic",
        location: "Jalpaiguri, West Bengal",
        startDate: "2020",
        endDate: "2022",
        current: false,
        description: [
            "Completed Diploma in Civil Engineering with CGPA: 7.9",
            "Strong foundation in engineering principles and problem-solving",
            "Developed analytical thinking and technical skills"
        ],
        skills: ["Engineering", "Problem Solving", "Technical Drawing"]
    },
    {
        id: "higher-secondary",
        type: "education",
        title: "Higher Secondary (Engineering & Technology)",
        organization: "Bajkul Balai Chandra Vidyapith (WBSCT&VE&SD)",
        startDate: "2018",
        endDate: "2020",
        current: false,
        description: [
            "Completed with 94% marks",
            "Specialized in Engineering & Technology stream",
            "Exceptional academic performance"
        ],
        skills: ["Mathematics", "Physics", "Engineering Basics"]
    }
];
