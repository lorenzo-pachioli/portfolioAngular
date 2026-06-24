export interface AboutMilestone {
  keyValue: string;
  /** Clave de traducción para la fecha corta que se muestra sobre la línea */
  date: string;
  /** Clave de traducción del título (también se usa dentro de la píldora del nodo) */
  title: string;
  /** Clave de traducción de la historia (STORY) */
  description: string;
  /** Lado de la línea de tiempo en el que aparece la card */
  side: 'left' | 'right';
  /** Si la fecha es informativa (no un placeholder genérico como "Formación"), se repite dentro de la card */
  showDateInCard: boolean;
}

export const descriptions: AboutMilestone[] = [
  {
    keyValue: 'actualidad',
    date: 'app.ABOUT.ACTUALIDAD.DATE',
    title: 'app.ABOUT.ACTUALIDAD.TITLE',
    description: 'app.ABOUT.ACTUALIDAD.STORY',
    side: 'left',
    showDateInCard: true
  },
  {
    keyValue: 'utn',
    date: 'app.ABOUT.UTN.DATE',
    title: 'app.ABOUT.UTN.TITLE',
    description: 'app.ABOUT.UTN.STORY',
    side: 'right',
    showDateInCard: true
  },
  {
    keyValue: 'swaplyar',
    date: 'app.ABOUT.SWAPLYAR.DATE',
    title: 'app.ABOUT.SWAPLYAR.TITLE',
    description: 'app.ABOUT.SWAPLYAR.STORY',
    side: 'left',
    showDateInCard: true
  },
  {
    keyValue: 'udemyqa',
    date: 'app.ABOUT.UDEMYQA.DATE',
    title: 'app.ABOUT.UDEMYQA.TITLE',
    description: 'app.ABOUT.UDEMYQA.STORY',
    side: 'right',
    showDateInCard: false
  },
  {
    keyValue: 'alkemy',
    date: 'app.ABOUT.ALKEMY.DATE',
    title: 'app.ABOUT.ALKEMY.TITLE',
    description: 'app.ABOUT.ALKEMY.STORY',
    side: 'left',
    showDateInCard: false
  },
  {
    keyValue: 'lamansys',
    date: 'app.ABOUT.LAMANSYS.DATE',
    title: 'app.ABOUT.LAMANSYS.TITLE',
    description: 'app.ABOUT.LAMANSYS.STORY',
    side: 'right',
    showDateInCard: false
  },
  {
    keyValue: 'udemy',
    date: 'app.ABOUT.UDEMY.DATE',
    title: 'app.ABOUT.UDEMY.TITLE',
    description: 'app.ABOUT.UDEMY.STORY',
    side: 'left',
    showDateInCard: false
  },
  {
    keyValue: 'acamica',
    date: 'app.ABOUT.ACAMICA.DATE',
    title: 'app.ABOUT.ACAMICA.TITLE',
    description: 'app.ABOUT.ACAMICA.STORY',
    side: 'right',
    showDateInCard: false
  },
  {
    keyValue: 'before',
    date: 'app.ABOUT.BEFORE.DATE',
    title: 'app.ABOUT.BEFORE.TITLE',
    description: 'app.ABOUT.BEFORE.STORY',
    side: 'left',
    showDateInCard: true
  }
];
