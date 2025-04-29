import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './prueba.css'; 
import {generateAvatarURL} from "../utils/utils"

// Mockup data (puedes reemplazarlo con datos reales)
const mockEvent = {
  title: "Concierto de Rock",
  description: "Un concierto inolvidable con las mejores bandas de rock.",
  date: "2025-05-15",
  location: "Auditorio Nacional",
};

const mockReservations = [
  { id: 1, name: "Juan Pérez", seats: 2, image: generateAvatarURL() },
  { id: 2, name: "María López", seats: 4, image: generateAvatarURL() },
  { id: 3, name: "Carlos García", seats: 1, image: generateAvatarURL() },
  { id: 4, name: "Ana Torres", seats: 3, image: generateAvatarURL() },
  { id: 5, name: "Luis Fernández", seats: 2, image: generateAvatarURL() },
];

const EventoDetailPage = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <Container className="EventoDetailPage py-4">
      <Row className="g-4">
        {/* Información del evento */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-primary fw-bold">{mockEvent.title}</Card.Title>
              <Card.Text>
                <strong>Descripción:</strong> {mockEvent.description}
              </Card.Text>
              <Card.Text>
                <strong>Fecha:</strong> {mockEvent.date}
              </Card.Text>
              <Card.Text>
                <strong>Ubicación:</strong> {mockEvent.location}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Lista de reservas */}
        <Col md={6}>
          <Card style={{ maxHeight: 420, overflowY: 'auto' }} className="shadow-none bg-transparent border-0">
            <Card.Body>
              <Card.Title className="text-primary fw-bold mb-4">Reservas</Card.Title>
          
              {mockReservations.map(r => (
                <Card key={r.id} className="card-glass mb-3">
                  <Row className="g-0 align-items-center p-2">
                    {/* Avatar con anillo */}
                    <Col xs="auto">
                      <div className="avatar-ring">
                        <img src={r.image} alt={`Avatar de ${r.name}`} />
                      </div>
                    </Col>
          
                    {/* Nombre + seats */}
                    <Col className="ms-3">
                      <h6 className="mb-1 fw-semibold">{r.name}</h6>
                      <span className="badge badge-seats">
                        {r.seats} asiento{r.seats > 1 && 's'}
                      </span>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EventoDetailPage;
