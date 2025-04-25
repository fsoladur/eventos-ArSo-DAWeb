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

 