import { cloudinarySvg } from "src/assets/svg-cloudinary/svg-cloudinary"

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
        svg: cloudinarySvg.git,
        name: 'Git'
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
    }
]

