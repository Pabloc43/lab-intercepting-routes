export interface Photo {
  readonly id: string;
  readonly title: string;
  readonly location: string;
  readonly description: string;
  readonly alt: string;
  readonly src: string;
  readonly credit: string;
}

export const photos: readonly Photo[] = [
  {
    id: 'montanas',
    title: 'Entre montañas',
    location: 'Cordillera',
    description: 'Los pliegues del terreno marcan el horizonte.',
    alt: 'Cumbres nevadas y laderas de roca alrededor de un valle',
    src: '/photos/montanas.jpg',
    credit: 'Go Wild · Unsplash',
  },
  {
    id: 'lago',
    title: 'Agua quieta',
    location: 'Ribera',
    description: 'La calma del agua duplica la vista hacia los árboles y las paredes de roca.',
    alt: 'Árboles y paredes de roca reflejados en aguas tranquilas',
    src: '/photos/lago.jpg',
    credit: 'Christian Joudrey · Unsplash',
  },
  {
    id: 'costa',
    title: 'Donde termina la tierra',
    location: 'Costa',
    description: 'La marea deja al descubierto la roca y la playa.',
    alt: 'Rocas oscuras frente a una playa con oleaje calmo',
    src: '/photos/costa.jpg',
    credit: 'Paul Jarvis · Unsplash',
  },
  {
    id: 'bosque',
    title: 'Dentro del bosque',
    location: 'Bosque',
    description: 'Las copas se extienden hasta la línea de las montañas.',
    alt: 'Copas de coníferas con montañas azules al fondo',
    src: '/photos/bosque.jpg',
    credit: 'Paul Jarvis · Unsplash',
  },
  {
    id: 'desierto',
    title: 'Piedra y arena',
    location: 'Terreno árido',
    description: 'La luz revela capas y surcos en el suelo seco.',
    alt: 'Extensión de lomas áridas rojizas bajo el cielo azul',
    src: '/photos/desierto.jpg',
    credit: 'Jeffrey Kam · Unsplash',
  },
  {
    id: 'cascada',
    title: 'Agua en movimiento',
    location: 'Cascada',
    description: 'El agua encuentra su propio camino entre las rocas.',
    alt: 'Cascada angosta que cae entre laderas rocosas',
    src: '/photos/cascada.jpg',
    credit: 'Paul Jarvis · Unsplash',
  },
  {
    id: 'glaciar',
    title: 'La línea de nieve',
    location: 'Alta montaña',
    description: 'Por encima de las rocas, el paisaje se vuelve blanco.',
    alt: 'Montañas cubiertas de nieve y rocas con líquenes amarillos en primer plano',
    src: '/photos/glaciar.jpg',
    credit: 'Wolfgang Lutz · Unsplash',
  },
  {
    id: 'valle',
    title: 'Un valle abierto',
    location: 'Valle',
    description: 'El cauce dibuja el camino entre laderas cubiertas de árboles.',
    alt: 'Cauce sinuoso y laderas boscosas bajo un cielo claro',
    src: '/photos/valle.jpg',
    credit: 'Paul Jarvis · Unsplash',
  },
  {
    id: 'cielo',
    title: 'Después del atardecer',
    location: 'Hora azul',
    description: 'Queda un hilo de luz detrás de los árboles.',
    alt: 'Silueta oscura de árboles contra un cielo cálido al anochecer',
    src: '/photos/cielo.jpg',
    credit: 'Julie Geiger · Unsplash',
  },
  {
    id: 'acantilados',
    title: 'Al borde del mar',
    location: 'Mirador costero',
    description: 'Desde lo alto, la niebla difumina la línea de la costa.',
    alt: 'Costa vista desde una ladera con niebla y surf al fondo',
    src: '/photos/acantilados.jpg',
    credit: 'Christopher Sardegna · Unsplash',
  },
  {
    id: 'cumbre',
    title: 'Entre nubes',
    location: 'Cumbre',
    description: 'Una cresta rocosa queda recortada contra el cielo.',
    alt: 'Cumbre rocosa con nubes blancas en un cielo azul',
    src: '/photos/cumbre.jpg',
    credit: 'Nicholas Swanson · Unsplash',
  },
  {
    id: 'oasis',
    title: 'Un claro verde',
    location: 'Quebrada',
    description: 'Los árboles cierran el paisaje alrededor del arroyo.',
    alt: 'Arroyo rocoso entre laderas llenas de árboles verdes',
    src: '/photos/oasis.jpg',
    credit: 'Jerry Adney · Unsplash',
  },
];

export function findPhoto(id: string): Photo | undefined {
  return photos.find((photo) => photo.id === id);
}
