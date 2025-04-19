import React, { useState, useMemo, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import SpaceSearchBar from '../components/Espacios/SpaceSeachBar/SpaceSeachBar';
import SpaceList from '../components/Espacios/List/SpaceList';
import PaginationBar from '../components/Espacios/Pagination/PaginationBar';
import { useAuth } from '../context/AuthContext';

const EspaciosPage = () => {
  const { user } = useAuth();
  const [espacios, setEspacios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [espacioExpandido, setEspacioExpandido] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [debouncedFiltro, setDebouncedFiltro] = useState('');
  const espaciosPorPagina = 8;

  useEffect(() => {
    // Esperar 300ms después de que el usuario deja de escribir
    const handler = setTimeout(() => {
      setDebouncedFiltro(inputValue);
    }, 300);
  
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  // Obtener los espacios de la API
  useEffect(() => {
    const fetchEspacios = async () => {
      try {
        setLoading(true);
        console.log(`http://localhost:8090/espacios?propietario=${user.username}`)
        const response = await fetch(`http://localhost:8090/espacios?propietario=${user.username}`, 
            {
              method: "GET",
              credentials: 'include' 
            }
          );
        
        if (!response.ok) {
          throw new Error('No se pudieron cargar los espacios');
        }
        
        const data = await response.json();
        console.log('Datos de espacios:', data);
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

  const espaciosFiltrados = useMemo(() => {
    return espacios.filter(e =>
      e.resumen.nombre.toLowerCase().includes(debouncedFiltro.toLowerCase()) ||
      e.resumen.direccion.toLowerCase().includes(debouncedFiltro.toLowerCase())
    );
  }, [espacios, debouncedFiltro]);

  const totalPaginas = Math.ceil(espaciosFiltrados.length / espaciosPorPagina);
  const espaciosPagina = useMemo(() => {
    const start = (paginaActual - 1) * espaciosPorPagina;
    return espaciosFiltrados.slice(start, start + espaciosPorPagina);
  }, [espaciosFiltrados, paginaActual]);

  // Mostrar estado de carga o error
  if (loading) return <Container className="my-4"><p>Cargando espacios...</p></Container>;
  if (error) return <Container className="my-4"><p>Error: {error}</p></Container>;

  return (
    <Container className="my-4">
      <h1 className="fw-bold h3 text-start text-primary mb-4">Mis Espacios</h1>
      <SpaceSearchBar onSearch={setInputValue} />

      <SpaceList
        espacios={espaciosPagina}
        espacioExpandido={espacioExpandido}
        onExpand={setEspacioExpandido}
      />

      {espaciosFiltrados.length > 0 ? (
        <PaginationBar
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          onPageChange={setPaginaActual}
        />
      ) : (
        <p className="text-center mt-4">No se encontraron espacios que coincidan con la búsqueda.</p>
      )}
    </Container>
  );
};

export default EspaciosPage;
