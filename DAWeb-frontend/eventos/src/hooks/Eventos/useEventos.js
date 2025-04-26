import { useState, useEffect } from 'react';

export function useEventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8090/eventos`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error('No se pudieron cargar los espacios');
        }

        const eventos = await response.json();
        setEventos(eventos._embedded.eventoDTOList);
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
