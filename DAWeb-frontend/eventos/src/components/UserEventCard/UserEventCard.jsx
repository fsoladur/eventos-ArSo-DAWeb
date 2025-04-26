import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './userEventCard.css';

function UserEventCard({ cardTitle, cardText, eventId, eventDate }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const cardLink = `/eventos/${eventId}`;
    navigate(cardLink);
  };

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
          <span className="event-card-date">{eventDate}</span>
        </div>
      </Card.Body>
      <Card.Footer className="event-card-footer">
        <Button
          variant="primary"
          onClick={handleClick}
          className="event-card-button w-100 fw-bold text-white"
        >
          Reservar
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default UserEventCard;
