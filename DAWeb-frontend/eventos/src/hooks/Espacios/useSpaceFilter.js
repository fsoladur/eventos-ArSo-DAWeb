import { useMemo } from 'react';

export function useSpaceFilter(espacios, filterText) {
  return useMemo(() => {
    return espacios.filter(e =>
      e.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
      e.direccion.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [espacios, filterText]);
}