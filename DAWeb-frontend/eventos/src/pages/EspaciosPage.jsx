import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SpaceSearchBar from '../components/SearchBars/SeachBar';
import SpaceList from '../components/Lists/SpaceList';
import PaginationBar from '../components/Pagination/PaginationBar';
import SpaceCard from "../components/Cards/SpaceCard";
import { useEspacios } from '../hooks/useEspacios';
import { useDebounce } from '../hooks/useDebounce';
import { usePagination } from '../hooks/usePagination';
import { useSpaceFilter } from '../hooks/useSpaceFilter';

const EspaciosPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [espacioExpandido, setEspacioExpandido] = useState(null);
  
  // Hooks personalizados
  const { espacios, loading, error } = useEspacios();
  const debouncedFiltro = useDebounce(inputValue, 300);
  const espaciosFiltrados = useSpaceFilter(espacios, debouncedFiltro);
  const { paginatedItems: espaciosPagina, totalPages: totalPaginas } = 
    usePagination(espaciosFiltrados, paginaActual, 6);

  // Mostrar estado de carga o error
  if (loading) return <Container className="my-4"><p>Cargando espacios...</p></Container>;
  if (error) return <Container className="my-4"><p>Error: {error}</p></Container>;

  return (
    <Container className="my-4">
      <h1 className="fw-bold h3 text-start text-primary mb-4">Mis Espacios</h1>
      <SpaceSearchBar onSearch={setInputValue} />

      <SpaceList
        items={espaciosPagina}
        itemExpandido={espacioExpandido}
        onExpand={setEspacioExpandido}
        CardComponent={SpaceCard}
      />

      {espaciosFiltrados.length > 0 ? (
        <PaginationBar
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          onPageChange={setPaginaActual}
          initialMaxEllipsis={3}
        />
      ) : (
        <p className="text-center mt-4">No se encontraron espacios que coincidan con la búsqueda.</p>
      )}
    </Container>
  );
};

export default EspaciosPage;
