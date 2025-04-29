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
    'https://i.pinimg.com/236x/d7/7e/31/d77e31b4f7c02493d585c8fb34f6d956.jpg'

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


 