import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import AccordionList from '../components/Lists/AccordionList.jsx';
import PaginationBar from '../components/Pagination/PaginationBar';
import { useDebounce } from '../hooks/useDebounce';
import { usePagination } from '../hooks/usePagination';
import EventCard from '../components/Cards/EventCard.jsx';
import { useEventos } from '../hooks/Eventos/useEventos.js';
import { useEventFilter } from '../hooks/Eventos/useEventFilter.js';
import EventSearchBar from '../components/SearchBars/EventSearchBar.jsx';
import { useUpdateEvento } from '../hooks/Eventos/useUpdateEvento.js';

const EventosPage = () => {
  const [inputValue, setInputValue]     = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [eventoExpandido, setExpandido]= useState(null);

  // Lectura
  const { eventos, loading, error, addEspacio } = useEventos();
  // Escritura
  const { update, isSaving, error: saveError } = useUpdateEvento();

  const debouncedFiltro   = useDebounce(inputValue, 300);
  const filtrados         = useEventFilter(eventos, debouncedFiltro);
  const { paginatedItems, totalPages } = usePagination(filtrados, paginaActual, 6);

  const handleExpand = id =>
    setExpandido(prev => (prev === id ? null : id));

  const handleSave = async formData => {
    console.log('Guardando:', formData);
    const ok = await update(formData);
    if (!ok) {
      console.error('No guardado:', saveError);
    }
  };

  if (loading) return <Container>Cargando…</Container>;

  return (
    <Container className="my-4">
      <h1 className="text-primary h4 fw-bold">Gestiona los eventos</h1>

      <EventSearchBar onSearch={setInputValue} addEspacio={addEspacio} />

      <AccordionList
        items={paginatedItems}
        itemExpandido={eventoExpandido}
        onExpand={handleExpand}
        onSave={handleSave}
        isSaving={isSaving}
        CardComponent={EventCard}
      />

      {filtrados.length > 0 ? (
        <PaginationBar
          totalPaginas={totalPages}
          paginaActual={paginaActual}
          onPageChange={setPaginaActual}
          initialMaxEllipsis={3}
        />
      ) : (
        <p>No se encontraron eventos.</p>
      )}
    </Container>
  );
};

export default EventosPage;
