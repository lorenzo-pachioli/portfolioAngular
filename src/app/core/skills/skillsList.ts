import { cloudinarySvg } from "src/assets/svg-cloudinary/svg-cloudinary"
const simpleCode = "../../../assets/svg/simple-code.svg";

interface obj {
    svg: string
    name: string
}

type list = obj[]

export const skillsList: list = [
    {
        svg: cloudinarySvg.html,
        name: 'HTML'
    }, {
        svg: cloudinarySvg.css,
        name: 'CSS'
    }, {
        svg: cloudinarySvg.javascript,
        name: 'Javascript'
    }, {
        svg: cloudinarySvg.typescript,
        name: 'Typescript'
    }, {
        svg: cloudinarySvg.react,
        name: 'React'
    }, {
        svg: cloudinarySvg.next,
        name: 'Next.js'
    }, {
        svg: cloudinarySvg.angular,
        name: 'Angular'
    }, {
        svg: cloudinarySvg.materialUi,
        name: 'Material UI'
    }, {
        svg: cloudinarySvg.redux,
        name: 'Redux'
    }, {
        svg: cloudinarySvg.ngrx,
        name: 'NGRX'
    }, {
        svg: cloudinarySvg.socketIO,
        name: 'Socket.io'
    }, {
        svg: cloudinarySvg.sass,
        name: 'SASS'
    }, {
        svg: cloudinarySvg.firebase,
        name: 'Firebase'
    }, {
        svg: cloudinarySvg.node,
        name: 'Node'
    }, {
        svg: cloudinarySvg.mongodb,
        name: 'MongoDB'
    }, {
        svg: cloudinarySvg.jest,
        name: 'Jest'
    }, {
        svg: cloudinarySvg.githubIcon,
        name: 'Github'
    }, {
        svg: cloudinarySvg.gitlab,
        name: 'GitLab'
    }, {
        svg: cloudinarySvg.jira,
        name: 'Jira'
    }, {
        svg: cloudinarySvg.taiga,
        name: 'Taiga'
    }, {
        svg: cloudinarySvg.java,
        name: 'Java'
    }, {
        svg: cloudinarySvg.php,
        name: 'PHP'
    }, {
        svg: cloudinarySvg.laravel,
        name: 'Laravel'
    }, {
        svg: cloudinarySvg.bootstrap,
        name: 'Bootstrap'
    }, {
        svg: cloudinarySvg.tailwind,
        name: 'Tailwind'
    }, {
        svg: cloudinarySvg.mysql,
        name: 'MySQL'
    }, {
        svg: cloudinarySvg.express,
        name: 'Express'
    }, {
        svg: cloudinarySvg.wordpress,
        name: 'Wordpress'
    }, {
        svg: cloudinarySvg.postgresql,
        name: 'Postgresql'
    }, {
        svg: cloudinarySvg.zustand,
        name: 'Zustand'
    }, {
        svg: cloudinarySvg.simpleCode,
        name: 'GitFlow'
    }, {
        svg: simpleCode,
        name: 'Scrum'
    }, {
        svg: cloudinarySvg.zephyr,
        name: 'Zephyr Scale'
    }
]
