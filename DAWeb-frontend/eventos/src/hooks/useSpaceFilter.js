import { useMemo } from 'react';

export function useSpaceFilter(espacios, filterText) {
  return useMemo(() => {
    return espacios.filter(e =>
      e.resumen.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
      e.resumen.direccion.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [espacios, filterText]);
}