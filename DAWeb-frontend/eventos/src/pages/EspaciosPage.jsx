import React, { Suspense, useState } from 'react';
import { Container } from 'react-bootstrap';
import SpaceSearchBar from '../components/SearchBars/SpaceSeachBar.jsx';
import AccordionList from '../components/Lists/AccordionList.jsx';
import PaginationBar from '../components/Pagination/PaginationBar';
import { useEspacios } from '../hooks/Espacios/useEspacios.js';
import { useDebounce } from '../hooks/useDebounce';
import { useSpaceFilter } from '../hooks/Espacios/useSpaceFilter.js';
import { usePagination } from '../hooks/usePagination';
import SpaceCard from '../components/Cards/SpaceCard.jsx';
import { useUpdateEspacio } from '../hooks/Espacios/useUpdateEspacio.js';

const EspaciosPage = () => {
  const [inputValue, setInputValue]     = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [espacioExpandido, setExpandido]= useState(null);

  // Lectura
  const { espacios, loading, error, addEspacio } = useEspacios();
  // Escritura
  const { update, isSaving, error: saveError, toggleActivo } = useUpdateEspacio();

  const debouncedFiltro   = useDebounce(inputValue, 300);
  const filtrados         = useSpaceFilter(espacios, debouncedFiltro);
  const { paginatedItems, totalPages } = usePagination(filtrados, paginaActual, 6);

  const handleExpand = id =>
    setExpandido(prev => (prev === id ? null : id));

  const handleSave = formData => async () => {
    let success = await update(formData)
    return success;
  };

  const handleToggleActivo = (id, activo) => {
    return toggleActivo(id, activo);
      
  };

  if (loading) return <Container>Cargando…</Container>;

  return (
    <Container className="my-4">
      <h1 className="text-primary h4 fw-bold">Gestiona los espacios fisicos</h1>

      <SpaceSearchBar onSearch={setInputValue} addEspacio={addEspacio} />

      <AccordionList
        items={paginatedItems}
        itemExpandido={espacioExpandido}
        onExpand={handleExpand}
        onSave={handleSave}
        isSaving={isSaving}
        CardComponent={SpaceCard}
        toggleActivo={handleToggleActivo}
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
