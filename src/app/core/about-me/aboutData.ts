interface obj {
    name: string
    story: string
}

type list = {
    today: obj,
    swaplyar: obj,
    udemyqa: obj,
    utn: obj,
    alkemy: obj,
    lamansys: obj,
    udemy: obj,
    acamica: obj,
    utnba: obj,
    before: obj
}

export const history: list = {
    today: {
        name: "Today",
        story: "Now I'm looking for my first job as a software developer and studying on Universidad Tecnológica Nacional and online courses. I continue on expanding no only my technical knowledge, but also my capability to learn and solve coding problems while improving the code quality."
    },
    swaplyar: {
        name: "SwaplyAr",
        story: "Collaborated with Front End functionalities using Next.js and Tailwind, improving and adding features centered on the logic and the information management algorithms. Helped the Back End team using Nest.js to solve bugs related to the features I was working on in the front. Worked collaboratively with a multicultural Latin American team on the implementation of features and bug fixing in the public, internal, and administration sections."
    },
    udemyqa: {
        name: "Udemy QA",
        story: "Currently doing this 36hs QA bootcamp. Web site: 'https:// www.udemy.com/ course/ testerbootcamp/'"
    },
    utn: {
        name: "UTN",
        story: "Currently during first year of this two year carrer at Universidad Tecnológica Nacional in Mar del Plata. The carrer website: 'https:// mdp.utn.edu.ar/ tecnicatura/ tecnico_ universitario_ en_ programacion/' "
    },
    alkemy: {
        name: "Alkemy",
        story: "A 15 day Angular group project accomplishing the requests proposed by Alkemy and created applying scrum and git flow methodologies."
    },
    lamansys: {
        name: "Lamansys",
        story: "A two month front end boostcamp with Angular, Typescript and Material-UI. It ended with a final project that had some requirments and manage with Taiga."
    },
    udemy: {
        name: "Udemy",
        story: "The Complete Guide to Advanced React Component Patterns: Short course of advanced React Component Patterns. More info in: https:// www.udemy.com/ course/the- complete- guide-to- advanced- react- patterns/"
    },
    acamica: {
        name: "Acamica",
        story: "This nine month course separated on four sprints gave me the knowledge to become a front-end web developer, teaching me about HTM, CSS, Javascript, React and Firebase."
    },
    utnba: {
        name: "UTNBA",
        story: "A year ago, my friends convinced me to try out programing so I started this short course of Porgraming Fundamentals. In the end of it, I found out myself loving programing. It was divided in three modules: -Module 1: Introduction to programming, -Module 2: Structured programming, -Module 3: Object-oriented programming"
    },
    before: {
        name: "Before coding",
        story: "I finished school on an art oriented highschool and move out to Buenos Aires to study a three year career. After I graduated as a superior mechanical technician, I pass through two short time jobs to finally end up in a commercial naval mechanics shop. I worked there until march 2022 when I resign to fully dedicate to get a job in the IT world as a front-end developer."
    }
}

export const buttonsHistory = ['Today', 'SwaplyAr', 'Udemy QA', 'UTN', 'Alkemy', 'Lamansys', 'Udemy', 'Acamica', 'UTNBA', 'Before coding']
