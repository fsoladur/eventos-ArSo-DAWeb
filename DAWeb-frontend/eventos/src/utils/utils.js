export function getBadgeColor(categoria)
{
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
  };

  export function formatDate(date) {
    if (!date) return null;
    try {
      return new Date(date).toISOString().replace(/\.\d{3}Z$/, '');
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return null;
    }
  }

  const avatars = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubQH1F3DZWpm3WYs5SKpQBSH_ocCYenGjkA&s',
    'https://i.pinimg.com/236x/d7/7e/31/d77e31b4f7c02493d585c8fb34f6d956.jpg',
    'https://scontent-mad1-1.xx.fbcdn.net/v/t39.30808-6/454527306_2415791605276273_4503072747468743054_n.png?_nc_cat=106&ccb=1-7&_nc_sid=0b6b33&_nc_ohc=OR4PD3ZhB6wQ7kNvwGw8BGN&_nc_oc=AdmLsUxGWamhzd_uUPxH-st6Ci8uXSv8VpFalDsdqnNCwGKcm89FON_Hzt7makRXNYY&_nc_zt=23&_nc_ht=scontent-mad1-1.xx&_nc_gid=Wvk9BXibWmMuA2M7gRtZvA&oh=00_AfHQpzSNlK8i_QZXjgqcElA9GvyQ1wlOEfglI3I71yGyCw&oe=68196564',
    'https://preview.redd.it/4amici5tq4g81.jpg?width=640&crop=smart&auto=webp&s=77a1c3f9195438933c5e1d1d42a5f72c6c27e953'
  ]

  const places = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubQH1F3DZWpm3WYs5SKpQBSH_ocCYenGjkA&s',
    'https://i.pinimg.com/236x/d7/7e/31/d77e31b4f7c02493d585c8fb34f6d956.jpg'

  ]

  export function generateAvatarURL(){
    return generate(avatars);
  }

  export function generatePlacesURL() {
    return generate(places);
  }

  function generate(images)
  {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  const firstNames = ['Ana', 'Carlos', 'Elena', 'Pablo', 'Sofía', 'Javier', 'Laura', 'Miguel', 'Lucía', 'David', 'Carmen', 'Diego'];
  const lastNames = ['García', 'Pérez', 'López', 'Martínez', 'Rodríguez', 'González', 'Fernández', 'Sánchez', 'Ramírez', 'Torres'];

  export const generateRandomName = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  };

 