import React from 'react';
import { useParams } from 'react-router-dom';

const EventoDetailPage = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="EventoDetailPage">
      <h1>Evento Detalle</h1>
      <p>Detalles del evento aquí.</p>
    </div>
  );
};

export default EventoDetailPage;
