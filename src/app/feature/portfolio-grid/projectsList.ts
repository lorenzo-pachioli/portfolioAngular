import { IProject } from '../../shared/interfaces/IProject';

export const projectsList: IProject[] = [
  {
    title: 'Devs United',
    cols: 2,
    rows: 1,
    color: 'var(--color4)',
    hrColor: 'var(--color5)',
    image: '../../../assets/img/devsUnited.png',
    description: 'Its a tweeter alike website using firebase as back-end and React router for the difrent pages. It was created as a evaluated project for the last sprint of the Acamica course.',
    github: 'https://github.com/lorenzo-pachioli/Devs_united',
    deployed: 'https://devsunited-pachioli.netlify.app'
  },
  {
    title: 'Api-brainstorming',
    cols: 1,
    rows: 2,
    color: 'var(--color5)',
    hrColor: 'var(--color4)',
    image: '../../../assets/img/api-brainstorming.png',
    description: "It's the server aplication for Brainstorming made in Node with Express and MongoDB.",
    github: 'https://github.com/lorenzo-pachioli/api-brainstorming',
    deployed: ''
  },
  {
    title: 'Portfolio',
    cols: 1,
    rows: 2,
    color: 'var(--color3)',
    hrColor: 'var(--color4)',
    image: '../../../assets/img/portfolio.png',
    description: 'Its the web page you are currently visiting. Check out the code in Github to see how it works!',
    github: 'https://github.com/lorenzo-pachioli/portfolioAngular',
    deployed: 'https://lorenzo-pachioli.netlify.app/'
  },
  {
    title: 'Gify',
    cols: 2,
    rows: 1,
    color: 'var(--color4)',
    hrColor: 'var(--color5)',
    image: '../../../assets/img/giphy.png',
    description: 'Its a static SPA that conects to the API of Giphy (https://giphy.com/) and alows the user to search gifs throw a simple searcher.It was created as a evaluated project for the third sprint of the Acamica course.',
    github: 'https://github.com/lorenzo-pachioli/Sprint_proyect_Giphy',
    deployed: 'https://sprint-proyect-giphy.netlify.app'
  },
  {
    title: 'Brainstorming',
    cols: 2,
    rows: 1,
    color: 'var(--color3)',
    hrColor: 'var(--color4)',
    image: '../../../assets/img/brainstormingDescktop.png',
    description: "It's a scrum base task manager created as a final project for the Lamansys bootcamp using Angular and Angular Material, conecting to an API provided by them and following some requirements.",
    github: 'https://github.com/lorenzo-pachioli/frontend-bootcamp',
    deployed: 'https://frontend-bootcamp-pachioli.netlify.app'
  },
  {
    title: 'Redux practice',
    cols: 1,
    rows: 2,
    color: 'var(--color4)',
    hrColor: 'var(--color5)',
    image: '../../../assets/img/reduxPractice.png',
    description: 'This page is a task organizer app and it was created using React and Redux, following the tutorial of the Redux documentation.',
    github: 'https://github.com/lorenzo-pachioli/practiceRedux',
    deployed: 'https://redux-practice-pachioli.netlify.app'
  },
  {
    title: 'Api chat',
    cols: 1,
    rows: 2,
    color: 'var(--color4)',
    hrColor: 'var(--color5)',
    image: '../../../assets/img/apiChat.png',
    description: "It's the server aplication for Chat-app made in Node with Socket.io, Express and MongoDB.",
    github: 'https://github.com/lorenzo-pachioli/Api-chat',
    deployed: ''
  },
  {
    title: 'Chat app',
    cols: 2,
    rows: 1,
    color: 'var(--color5)',
    hrColor: 'var(--color4)',
    image: '../../../assets/img/chatApp.png',
    description: "It's a real time chat web site that uses React and Socket.io-client to communicate with Api-chat.",
    github: 'https://github.com/lorenzo-pachioli/Chat-app',
    deployed: 'https://pachioli-chat-app.netlify.app'
  },

];