const html = '../../../assets/svg/html-1.svg';
const css = '../../../assets/svg/css-3.svg';
const react = '../../../assets/svg/react-2.svg';
const redux = '../../../assets/svg/redux.svg';
const sass = '../../../assets/svg/sass-1.svg';
const javascript = '../../../assets/svg/javascript-1.svg';
const typescript = '../../../assets/svg/typescript-2.svg';
const firebase = '../../../assets/svg/firebase-1.svg';
const git = '../../../assets/svg/git-icon.svg';
const github = '../../../assets/svg/github-icon-1.svg';
const angular = '../../../assets/svg/angular-icon-1.svg';
const materialUi = '../../../assets/svg/material-ui-1.svg';
const socketIO = '../../../assets/svg/socket-io.svg';
const node = '../../../assets/svg/nodejs-1.svg';
const mongodb = '../../../assets/svg/mongodb-icon-1.svg';
const gitlab = '../../../assets/svg/gitlab.svg';
const jira = '../../../assets/svg/jira-3.svg';
const taiga = '../../../assets/svg/taiga-2.svg';
const ngrx = '../../../assets/svg/ngrx.svg';
const jest = '../../../assets/svg/jest.svg';
const next = '../../../assets/svg/next-js.svg';

interface obj {
    svg: string
    name: string
}

type list = obj[]

export const skillsList: list = [
    {
        svg: html,
        name: 'HTML'
    }, {
        svg: css,
        name: 'CSS'
    }, {
        svg: javascript,
        name: 'Javascript'
    }, {
        svg: typescript,
        name: 'Typescript'
    }, {
        svg: react,
        name: 'React'
    }, {
        svg: next,
        name: 'Next.js'
    }, {
        svg: angular,
        name: 'Angular'
    }, {
        svg: materialUi,
        name: 'Material UI'
    }, {
        svg: redux,
        name: 'Redux'
    }, {
        svg: ngrx,
        name: 'NGRX'
    }, {
        svg: socketIO,
        name: 'Socket.io'
    }, {
        svg: sass,
        name: 'SASS'
    }, {
        svg: firebase,
        name: 'Firebase'
    }, {
        svg: node,
        name: 'Node'
    }, {
        svg: mongodb,
        name: 'MongoDB'
    }, {
        svg: jest,
        name: 'Jest'
    }, {
        svg: git,
        name: 'Git'
    }, {
        svg: github,
        name: 'Github'
    }, {
        svg: gitlab,
        name: 'GitLab'
    }, {
        svg: jira,
        name: 'Jira'
    }, {
        svg: taiga,
        name: 'Taiga'
    }
]

