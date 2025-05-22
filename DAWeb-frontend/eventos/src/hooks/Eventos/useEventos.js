import { useState, useEffect } from 'react';
import { getEventos } from '../../services/EventService';
import { generatePlacesURL } from '../../utils/utils';

export function useEventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setLoading(true);
        const eventosFetch = await getEventos();
        const eventosBase = eventosFetch._embedded?.eventoDTOList || [];

        // Añadir foto aleatoria a cada evento - forma correcta
        const eventosConFotos = eventosBase.map(evento => ({
          ...evento,
          fotoEvento: generatePlacesURL()
        }));

        setEventos(eventosConFotos);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error al cargar los espacios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  function addEvento(evento) {
    // También asegúrate de añadir foto a los nuevos eventos
    const eventoConFoto = {
      ...evento,
      fotoEvento: generatePlacesURL()
    };
    setEventos(prevEventos => [...prevEventos, eventoConFoto]);
  }

  return { eventos, loading, error, addEvento };
}
