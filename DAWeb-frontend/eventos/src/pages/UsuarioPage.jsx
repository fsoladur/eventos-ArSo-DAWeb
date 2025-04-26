import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import UserEventCard from '../components/UserEventCard/UserEventCard';

const UsuarioPage = () => {
  const { user } = useAuth();
  const { isLoading, setIsLoading } = useState(true);

  return (
    <article>
      <h1>{'Bienvenido ' + user.username}</h1>
      <h2>Eventos disponibles</h2>
      <h3>Empieza a disfrutar de los mejores eventos</h3>

      <h4>Eventos culturales</h4>
      <UserEventCard
        cardTitle="Evento 1"
        cardText="Descripción del evento 1"
        cardImage="../../../resources/images/culturalDiversity.png"
        eventId={1}
        eventDate="2023-10-01"
      />
    </article>
  );
};

export default UsuarioPage;
