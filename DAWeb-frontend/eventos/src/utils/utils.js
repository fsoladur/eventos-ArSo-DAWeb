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


 