import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

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
        console.log(data)
        setEspacios(data.espacio);
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

  return { espacios, loading, error };
}