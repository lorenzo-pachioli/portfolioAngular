import { cloudinary } from 'src/assets/img-cloudinary/img-cloudinary';
import { IProject } from '../../shared/interfaces/IProject';

export const projectsList: IProject[] = [
  {
    title: 'Devs United',
    cols: 2,
    rows: 1,
    color: 'var(--color4)',
    hrColor: 'var(--color5)',
    image: cloudinary.devsUnited,
    description: "app.PROJECT.DEVUNITED",
    github: 'https://github.com/lorenzo-pachioli/Devs_united',
    deployed: 'https://devsunited-pachioli.netlify.app'
  },
  {
    title: 'Api-brainstorming',
    cols: 1,
    rows: 2,
    color: 'var(--color4)',
    hrColor: 'var(--color5)',
    image: cloudinary.apiBrainstorm,
    description: "app.PROJECT.APIBRAIN",
    github: 'https://github.com/lorenzo-pachioli/api-brainstorming',
    deployed: ''
  },
  {
    title: 'Portfolio',
    cols: 1,
    rows: 2,
    color: 'var(--color4)',
    hrColor: 'var(--color5)',
    image: cloudinary.portfolio,
    description: "app.PROJECT.PORTFOLIO",
    github: 'https://github.com/lorenzo-pachioli/portfolioAngular',
    deployed: 'https://lorenzo-pachioli.netlify.app/'
  },
  {
    title: 'Gify',
    cols: 2,
    rows: 1,
    color: 'var(--color4)',
    hrColor: 'var(--color5)',
    image: cloudinary.gify,
    description: "app.PROJECT.GIFY",
    github: 'https://github.com/lorenzo-pachioli/Sprint_proyect_Giphy',
    deployed: 'https://sprint-proyect-giphy.netlify.app'
  },
  {
    title: 'Brainstorming',
    cols: 2,
    rows: 1,
    color: 'var(--color4)',
    hrColor: 'var(--color5)',
    image: cloudinary.brainstorm,
    description: "app.PROJECT.BRAIN",
    github: 'https://github.com/lorenzo-pachioli/frontend-bootcamp',
    deployed: 'https://frontend-bootcamp-pachioli.netlify.app'
  },
  {
    title: 'RM servicios navales',
    cols: 1,
    rows: 2,
    color: 'var(--color4)',
    hrColor: 'var(--color5)',
    image: cloudinary.rm,
    description: "app.PROJECT.RM",
    github: 'https://github.com/lorenzo-pachioli/RMservicios-navales',
    deployed: 'https://rm-servicios-navales.netlify.app/'
  },
  {
    title: 'Api chat',
    cols: 1,
    rows: 2,
    color: 'var(--color4)',
    hrColor: 'var(--color5)',
    image: cloudinary.apiChat,
    description: "app.PROJECT.APICHAT",
    github: 'https://github.com/lorenzo-pachioli/Api-chat',
    deployed: ''
  },
  {
    title: 'Chat app',
    cols: 2,
    rows: 1,
    color: 'var(--color4)',
    hrColor: 'var(--color5)',
    image: cloudinary.chat,
    description: "app.PROJECT.CHAT",
    github: 'https://github.com/lorenzo-pachioli/Chat-app',
    deployed: 'https://pachioli-chat-app.netlify.app'
  },

];