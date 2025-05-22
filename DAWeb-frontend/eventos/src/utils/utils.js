export function getBadgeColor(categoria) {
  switch (categoria) {
    case 'CULTURAL':
      return 'primary';
    case 'DEPORTES':
      return 'success';
    case 'ENTRETENIMIENTO':
      return 'secondary';
    case 'ACADEMICO':
      return 'info';
    default:
      return 'dark';
  }
}

export function formatDate(date) {
  if (!date) return null;
  try {
    return new Date(date).toISOString().replace(/\.\d{3}Z$/, '');
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return null;
  }
}

const avatars = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubQH1F3DZWpm3WYs5SKpQBSH_ocCYenGjkA&s',
  'https://i.pinimg.com/236x/d7/7e/31/d77e31b4f7c02493d585c8fb34f6d956.jpg',
  'https://preview.redd.it/4amici5tq4g81.jpg?width=640&crop=smart&auto=webp&s=77a1c3f9195438933c5e1d1d42a5f72c6c27e953'
];

const places = [
  'https://picsum.photos/seed/1/400/200',
  'https://picsum.photos/seed/2/400/200',
  'https://picsum.photos/seed/3/400/200',
  'https://picsum.photos/seed/4/400/200',
  'https://picsum.photos/seed/5/400/200',
  'https://picsum.photos/seed/6/400/200',
  'https://picsum.photos/seed/7/400/200',
  'https://picsum.photos/seed/8/400/200',
  'https://picsum.photos/seed/9/400/200',
  'https://picsum.photos/seed/10/400/200'
];

export function generateAvatarURL() {
  return generate(avatars);
}

export function generatePlacesURL() {
  return generate(places);
}

function generate(images) {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

const firstNames = [
  'Ana',
  'Carlos',
  'Elena',
  'Pablo',
  'Sofía',
  'Javier',
  'Laura',
  'Miguel',
  'Lucía',
  'David',
  'Carmen',
  'Diego'
];
const lastNames = [
  'García',
  'Pérez',
  'López',
  'Martínez',
  'Rodríguez',
  'González',
  'Fernández',
  'Sánchez',
  'Ramírez',
  'Torres'
];

export const generateRandomName = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};
