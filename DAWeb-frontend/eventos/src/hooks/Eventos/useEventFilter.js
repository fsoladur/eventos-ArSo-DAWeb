import { useMemo } from 'react';

export function useEventFilter(eventos, filterText) {
  return useMemo(() => {
    return eventos.filter(e =>
      e.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
      e.organizador.toLowerCase().includes(filterText.toLowerCase()) ||
      e.categoria.toLowerCase().includes(filterText.toLowerCase()) 
    );
  }, [eventos, filterText]);
}