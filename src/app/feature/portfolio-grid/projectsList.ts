import { IProject } from '../../shared/interfaces/IProject';

export const projectsList: IProject[] = [
  {
    title: 'Devs United',
    cols: 2,
    rows: 1,
    color: 'var(--color4)',
    image: '../../../assets/img/devsUnited.png',
    description: 'Its a tweeter alike website using firebase as back-end and React router for the difrent pages.',
    github: 'https://github.com/lorenzo-pachioli/Devs_united',
    deployed: 'https://devsunited-pachioli.netlify.app'
  },
  {
    title: 'Gify',
    cols: 1,
    rows: 2,
    color: 'var(--color5)',
    image: '../../../assets/img/gify.jpeg',
    description: 'Its a static SPA with links on the top bar that drives you to diferent parts of it. It also has iframes of spotify podcasts and a responsive desing.',
    github: 'https://github.com/lorenzo-pachioli/Sprint_proyect_Giphy',
    deployed: 'https://sprint-proyect-giphy.netlify.app'
  },
  {
    title: 'Reserva de hoteles',
    cols: 1,
    rows: 1,
    color: 'var(--color4)',
    image: '../../../assets/img/reservaDeHoteles.png',
    description: 'Its a booking page that works with a local list of lodgings and search options to filter the list showing the results remaining below.',
    github: 'https://github.com/lorenzo-pachioli/reserva-de-alojamientos',
    deployed: 'https://reserva-de-alojamientos.netlify.app'
  },
  {
    title: 'Brainstorming',
    cols: 2,
    rows: 1,
    color: 'var(--color3)',
    image: '../../../assets/img/brainstormingDescktop.png',
    description: "It's a scrum base task manager created as a final project for the Lamansys bootcamp",
    github: 'https://github.com/lorenzo-pachioli/frontend-bootcamp',
    deployed: 'https://frontend-bootcamp-pachioli.netlify.app'
  },
  {
    title: 'Redux practice',
    cols: 1,
    rows: 2,
    color: 'var(--color4)',
    image: '../../../assets/img/reduxPractice.png',
    description: 'This page is a task organizer app and it was created using React and Redux.',
    github: 'https://github.com/lorenzo-pachioli/practiceRedux',
    deployed: 'https://redux-practice-pachioli.netlify.app'
  },
  {
    title: 'Api chat',
    cols: 1,
    rows: 1,
    color: 'var(--color4)',
    image: '../../../assets/img/apiChat.png',
    description: "It's the server aplication for Chat-app made in Node with Socket.io and MongoDB as database.",
    github: 'https://github.com/lorenzo-pachioli/Api-chat',
    deployed: ''
  },
  {
    title: 'Chat app',
    cols: 2,
    rows: 1,
    color: 'var(--color5)',
    image: '../../../assets/img/chatApp.png',
    description: "It's a real time chat web site that uses Socket.io-client to communicate with Api-chat.",
    github: 'https://github.com/lorenzo-pachioli/Chat-app',
    deployed: 'https://pachioli-chat-app.netlify.app'
  },
];