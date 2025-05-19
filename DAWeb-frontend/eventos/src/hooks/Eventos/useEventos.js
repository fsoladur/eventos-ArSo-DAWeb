import { useState, useEffect } from 'react';
import { getEventos } from '../../services/EventService';

export function useEventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setLoading(true);
        const eventosFetch = await getEventos();
        setEventos(eventosFetch._embedded?.eventoDTOList || []);
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
    setEventos(prevEventos => [...prevEventos, evento]);
  }

  return { eventos, loading, error, addEvento };
}
