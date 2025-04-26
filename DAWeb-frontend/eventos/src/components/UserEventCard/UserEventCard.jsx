import React from 'react';
import { Card } from 'react-bootstrap';
import DischargeButton from '../DischargeButton/DischargeButton';
import './userEventCard.css';

function UserEventCard({
  cardTitle,
  cardText,
  eventDate,
  eventLocation,
  onClick
}) {
  // Dividir la fecha y la hora usando "T" como separador
  const [datePart, timePart] = eventDate ? eventDate.split('T') : ['', ''];

  return (
    <Card className="event-card">
      <Card.Img
        variant="top"
        src="/images/culturalDiversity.png"
        alt={cardTitle}
        className="event-card-img"
      />
      <Card.Body className="event-card-body">
        <Card.Title className="event-card-title">{cardTitle}</Card.Title>
        <Card.Text className="event-card-description">{cardText}</Card.Text>

        <div className="event-card-date-container">
          <span className="event-card-date-label">Fecha: </span>
          <span className="event-card-date">{datePart}</span>
        </div>
        <div className="event-card-time-container">
          <span className="event-card-time-label">Hora: </span>
          <span className="event-card-time">{timePart}</span>
        </div>

        <div className="event-card-location-container">
          <span className="event-card-location-label">Ubicación: </span>
          <span className="event-card-location">{eventLocation}</span>
        </div>
      </Card.Body>
      <Card.Footer className="event-card-footer">
        <DischargeButton
          buttonLabel="Reservar"
          shortButtonLabel="Reservar"
          onClick={onClick}
          className="w-100 fw-bold text-white"
        />
      </Card.Footer>
    </Card>
  );
}

export default UserEventCard;
