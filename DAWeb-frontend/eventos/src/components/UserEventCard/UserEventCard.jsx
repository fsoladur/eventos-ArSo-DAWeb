import React from 'react';
import DischargeButton from '../DischargeButton/DischargeButton';
import { useAuth } from '../../context/useAuth';
import './userEventCard.css';
import PropTypes from 'prop-types';
import { Card, Button, Form } from 'react-bootstrap';

function UserEventCard({
  cardTitle,
  cardText,
  eventDate,
  eventLocation,
  eventSpaceName,
  eventId,
  onHandleSubmit
}) {
  const [datePart, timePart] = eventDate ? eventDate.split('T') : ['', ''];
  const { user } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    const plazasReservadas = e.target.plazasReservadas.value;
    const requestBody = {
      idUsuario: user.id,
      idEvento: eventId,
      plazasReservadas: parseInt(plazasReservadas)
    };

    onHandleSubmit(requestBody);
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

        <div className="event-card-spaceName-container">
          <span className="event-card-spaceName-label">Espacio: </span>
          <span className="event-card-spaceName">{eventSpaceName}</span>
        </div>
      </Card.Body>
      <Card.Footer className="event-card-footer">
        <DischargeButton
          buttonLabel="Reservar"
          shortButtonLabel="Reservar"
          className="w-100 fw-bold text-white"
        >
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="number"
                placeholder="Plazas reservadas"
                name="plazasReservadas"
                required
                min={1}
              />
            </Form.Group>
            <Button type="submit" className="mt-2 w-100">
              Reservar
            </Button>
          </Form>
        </DischargeButton>
      </Card.Footer>
    </Card>
  );
}

UserEventCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  cardText: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
  eventLocation: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
  onHandleSubmit: PropTypes.func.isRequired
};

export default UserEventCard;
