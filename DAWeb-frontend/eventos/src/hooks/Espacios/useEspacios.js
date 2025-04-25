import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export function useEspacios() {
  const { user } = useAuth();
  const [espacios, setEspacios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEspacios = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8090/espacios?propietario=${user.username}`,
          {
            method: "GET",
            credentials: 'include' 
          }
        );
        
        if (!response.ok) {
          throw new Error('No se pudieron cargar los espacios');
        }
        
        const data = await response.json();
        const espaciosResumen = data.espacio.map((espacio) => espacio.resumen);
        setEspacios(espaciosResumen);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error al cargar los espacios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEspacios();
  }, [user]);

  function addEspacio(espacio) {
    setEspacios((prevEspacios) => [...prevEspacios, espacio]);
  }
    
  async function espaciosLibres(fechaInicio, fechaFin, capacidad) {
    const response = await fetch(
      `http://localhost:8090/espacios/libres?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&capacidadRequerida=${capacidad}`,
      {
        method: "GET",
        credentials: 'include' 
      }
    );
    
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return data.espacio.map((espacio) => espacio.resumen);
    
  }

  return { espacios, loading, error, addEspacio, espaciosLibres };
}