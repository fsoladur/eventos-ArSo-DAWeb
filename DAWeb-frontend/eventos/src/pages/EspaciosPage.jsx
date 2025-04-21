import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SpaceSearchBar from '../components/SearchBars/SeachBar';
import SpaceList from '../components/Lists/SpaceList';
import PaginationBar from '../components/Pagination/PaginationBar';
import { useUpdateEspacio } from '../hooks/useUpdateEspacio.js';
import { useEspacios } from '../hooks/useEspacios.js';
import { useDebounce } from '../hooks/useDebounce';
import { useSpaceFilter } from '../hooks/useSpaceFilter';
import { usePagination } from '../hooks/usePagination';
import SpaceCard from '../components/Cards/SpaceCard';

const EspaciosPage = () => {
  const [inputValue, setInputValue]     = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [espacioExpandido, setExpandido]= useState(null);

  // Lectura
  const { espacios, loading, error } = useEspacios();
  // Escritura
  const { update, isSaving, error: saveError } = useUpdateEspacio();

  const debouncedFiltro   = useDebounce(inputValue, 300);
  const filtrados         = useSpaceFilter(espacios, debouncedFiltro);
  const { paginatedItems, totalPages } = usePagination(filtrados, paginaActual, 6);

  const handleExpand = id =>
    setExpandido(prev => (prev === id ? null : id));

  const handleSave = async formData => {
    const ok = await update(formData);
    if (!ok) {
      // aquí podrías mostrar un toast o alert con saveError
      console.error('No guardado:', saveError);
    }
  };

  if (loading) return <Container>Cargando…</Container>;
  if (error)   return <Container>Error: {error}</Container>;

  return (
    <Container className="my-4">
      <h1 className="text-primary h3 fw-bold">Mis Espacios</h1>
      <SpaceSearchBar onSearch={setInputValue} />

      <SpaceList
        items={paginatedItems}
        itemExpandido={espacioExpandido}
        onExpand={handleExpand}
        onSave={handleSave}
        isSaving={isSaving}
        CardComponent={SpaceCard}
      />

      {filtrados.length > 0 ? (
        <PaginationBar
          totalPaginas={totalPages}
          paginaActual={paginaActual}
          onPageChange={setPaginaActual}
          initialMaxEllipsis={3}
        />
      ) : (
        <p>No se encontraron espacios.</p>
      )}
    </Container>
  );
};

export default EspaciosPage;
