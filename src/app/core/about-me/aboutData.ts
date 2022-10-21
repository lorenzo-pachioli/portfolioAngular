interface objC {
    backgroundColor: string
    top?: string
    border?: string
}

interface obj {
    name: string
    story: string
    style: objC
    class: string
}



type list = {
    today: obj,
    acamica: obj,
    utnba: obj,
    before: obj
}

const card3 = {
    backgroundColor: "lightblue"
}

const card2 = {
    backgroundColor: "lightsalmon",
    top: "20%",
    border: "2px solid lightsalmon"
}
const card1 = {
    backgroundColor: "lightgreen",
    top: "40%",
    border: "2px solid lightgreen"
}
const card = {
    backgroundColor: "lightgray",
    top: "60%",
    border: "2px solid lightgray"
}

export const history: list = {
    today: {
        name: "Today",
        story: "Now I'm looking for my first job as a front-end developer and studying on my own with the documentation and the info available on the internet. Being self taught I continue on expanding no only my technical knowledge, but ago my capability to learn and solve coding problems.",
        style: card,
        class: "card c1"
    },
    acamica: {
        name: "Acamica",
        story: "This nine month course separated on four sprints gave me the knowledge to become a front-end web developer, teaching me about HTM, CSS, Javascript, React and Firebase.",
        style: card1,
        class: "card c2"
    },
    utnba: {
        name: "UTNBA",
        story: "A year ago, my friends convinced me to try out programing so I started this short course of Porgraming Fundamentals. In the end of it, I found out myself loving programing. It was divided in three modules: -Module 1: Introduction to programming, -Module 2: Structured programming, -Module 3: Object-oriented programming",
        style: card2,
        class: "card c3"
    },
    before: {
        name: "Before coding",
        story: "I finished school on an art oriented highschool and move out to Buenos Aires to study a three year career. After I graduated as a superior mechanical technician, I pass through two short time jobs to finally end up in a commercial naval mechanics shop. I worked there until march 2022 when I resign to fully dedicate to get a job in the IT world as a front-end developer.",
        style: card3,
        class: "card c4"
    }
}