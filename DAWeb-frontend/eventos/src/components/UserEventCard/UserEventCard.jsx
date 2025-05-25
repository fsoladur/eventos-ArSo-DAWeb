import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DischargeButton from '../DischargeButton/DischargeButton';
import { useAuth } from '../../context/useAuth';
import { getBadgeColor } from '../../utils/utils';
import './userEventCard.css';

function UserEventCard({
  cardTitle,
  cardText,
  eventStartDate,
  eventEndDate,
  eventOrganizer,
  eventLocation,
  eventPhoto,
  eventSpaceName,
  eventCategory,
  eventTotalSeats,
  eventId,
  onHandleSubmit,
  className = ''
}) {
  const { user } = useAuth();
  const [dateStartPart, timeStartPart] = eventStartDate
    ? eventStartDate.split('T')
    : ['', ''];

  const [dateEndPart, timeEndPart] = eventEndDate
    ? eventEndDate.split('T')
    : ['', ''];

  const handleSubmit = e => {
    e.preventDefault();
    onHandleSubmit({
      idUsuario: user.id,
      idEvento: eventId,
      plazasReservadas: parseInt(e.target.plazasReservadas.value, 10)
    });
  };

  return (
    <Card className={`event-card ${className}`}>
      <Card.Img
        variant="top"
        src={eventPhoto}
        alt={cardTitle}
        style={{ objectfit: 'cover', objectposition: 'center' }}
        className="event-card-image"
      />

      <Card.Body className="d-flex flex-column p-3 pb-1 flex-grow-1">
        <Card.Title className="fs-6 fw-bold text-truncate">
          {cardTitle}
        </Card.Title>

        <span
          className={`badge bg-${getBadgeColor(
            eventCategory
          )} align-self-start mb-2`}
        >
          {eventCategory}
        </span>

        <Card.Text className="event-description mb-2">{cardText}</Card.Text>

        <div>
          <strong>Plazas totales: </strong>
          <p className="text-primary">{eventTotalSeats}</p>
        </div>

        <div className="mb-1 fw-medium">
          <strong>Organizador: </strong> {eventOrganizer}
        </div>
        <div className="mb-1 fw-medium">
          <strong>Fecha de inicio:</strong> {dateStartPart}
        </div>
        <div className="mb-1 fw-medium">
          <strong>Hora de inicio:</strong> {timeStartPart}
        </div>

        <div className="mb-1 fw-medium">
          <strong>Fecha de fin:</strong> {dateEndPart}
        </div>
        <div className="mb-1 fw-medium">
          <strong>Hora de fin:</strong> {timeEndPart}
        </div>

        <div className="mb-1 fw-medium">
          <strong>Ubicación: </strong>
          <span className="event-location">{eventLocation}</span>
        </div>

        <div className="mb-2 fw-medium">
          <strong>Espacio: </strong>
          <span className="event-space">{eventSpaceName}</span>
        </div>
      </Card.Body>

      <Card.Footer className="bg-transparent border-0 d-flex justify-content-center">
        <DischargeButton
          buttonLabel="Reservar"
          shortButtonLabel="Reservar"
          className="w-100"
        >
          <Form onSubmit={handleSubmit}>
            <Form.Label className="text-center mb-2 fw-bold">
              <span className="text-danger">
                Estas a punto de reservar para el evento:
              </span>{' '}
              <span className="text-muted">{cardTitle}</span>
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
            <Button
              type="submit"
              size="sm"
              className="w-100 fw-bold text-white"
            >
              Reservar
            </Button>
          </Form>
        </DischargeButton>
      </Card.Footer>
    </Card>
  );
}

export default UserEventCard;
