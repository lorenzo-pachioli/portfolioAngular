export interface SkillCategory {
    /** Identificador usado para la clase de tamaño en el grid bento (span-<key>) */
    key: string;
    /** Clave de traducción (ngx-translate), no el texto final */
    label: string;
    /** Columnas que ocupa en el grid de 12 columnas */
    span: number;
    technologies: string[];
}

export const skillCategories: SkillCategory[] = [
    {
        key: 'frontend',
        label: 'app.SKILLS.FRONTEND',
        span: 7,
        technologies: [
            'HTML', 'CSS', 'SASS', 'JavaScript', 'TypeScript',
            'React.js', 'Next.js', 'Angular', 'React Native',
            'Bootstrap', 'Tailwind', 'Material UI', 'Redux', 'NgRx', 'Zustand'
        ]
    },
    {
        key: 'backend',
        label: 'app.SKILLS.BACKEND',
        span: 5,
        technologies: [
            'Java', 'Spring Boot', 'Node.js', 'Express', 'PHP',
            'Laravel', 'Firebase', 'WordPress', 'WebSockets', 'Socket.io'
        ]
    },
    {
        key: 'tools',
        label: 'app.SKILLS.TOOLS',
        span: 5,
        technologies: ['Git', 'GitHub', 'GitLab', 'GitFlow', 'Scrum', 'Jira', 'Taiga', 'Zephyr Scale']
    },
    {
        key: 'testing',
        label: 'app.SKILLS.TESTING',
        span: 4,
        technologies: ['Jest', 'Manual Testing', 'API Testing']
    },
    {
        key: 'database',
        label: 'app.SKILLS.DATABASE',
        span: 3,
        technologies: ['MongoDB', 'MySQL', 'PostgreSQL']
    }
];