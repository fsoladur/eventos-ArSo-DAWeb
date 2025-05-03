import Card   from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form   from 'react-bootstrap/Form';
import DischargeButton from '../DischargeButton/DischargeButton';
import { useAuth } from '../../context/useAuth';
import './userEventCard.css';

function UserEventCard({
  cardTitle,
  cardText,
  eventDate,
  eventLocation,
  eventSpaceName,
  eventId,
  onHandleSubmit,
  className = '',            
}) {
  const { user } = useAuth();
  const [datePart, timePart] = eventDate ? eventDate.split('T') : ['', ''];

  const handleSubmit = e => {
    e.preventDefault();
    onHandleSubmit({
      idUsuario: user.id,
      idEvento: eventId,
      plazasReservadas: parseInt(e.target.plazasReservadas.value, 10),
    });
  };

  return (
    <Card className={`event-card ${className}`}>
      {/* ---------- Imagen más baja ---------- */}
      <Card.Img
        variant="top"
        src="/images/culturalDiversity.png"
        alt={cardTitle}
        style={{ height: 135, objectFit: 'cover' }}  /* ↓ altura = tarjeta más baja */
      />

      {/* ---------- Cuerpo ---------- */}
      <Card.Body className="d-flex flex-column p-3 pb-1 flex-grow-1">
        <Card.Title className="fs-6 fw-bold text-truncate">
          {cardTitle}
        </Card.Title>

        <Card.Text className="event-description mb-2">
          {cardText}
        </Card.Text>

        <div className="mb-1"><strong>Fecha:</strong> {datePart}</div>
        <div className="mb-1"><strong>Hora:</strong> {timePart}</div>

        <div className="mb-1">
          <strong>Ubicación:</strong>{' '}
          <span className="event-location">{eventLocation}</span>
        </div>

        <div className="mb-2">
          <strong>Espacio:</strong>{' '}
          <span className="event-space">{eventSpaceName}</span>
        </div>
      </Card.Body>

      {/* ---------- Footer ---------- */}
      <Card.Footer className="bg-transparent border-0 d-flex justify-content-center">
        <DischargeButton buttonLabel="Reservar" shortButtonLabel="Reservar" className="w-100">
          <Form onSubmit={handleSubmit}>
            <Form.Label className="text-center mb-2 fw-bold">
              <span className='text-danger'>Estas a punto de reservar para el evento:</span> <span className='text-muted'>{cardTitle}</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="plazasReservadas"
              min="1"
              placeholder="Plazas"
              size="sm"
              className="mb-2"
              required
            />
            <Button type="submit" size="sm" className="w-100 fw-bold text-white">
              Reservar
            </Button>
          </Form>
        </DischargeButton>
      </Card.Footer>
    </Card>
  );
}

export default UserEventCard;
