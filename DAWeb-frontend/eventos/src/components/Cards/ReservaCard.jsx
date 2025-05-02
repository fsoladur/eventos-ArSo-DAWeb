import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getUserDisplayData } from '../../utils/displayUser';
import { Button } from 'react-bootstrap';
import './ReservaCard.css'; 

const ReservasCard = ({ reservas, btnCancelado, onCancelado, gestor }) => {
  return (
    <Card.Body>
        {gestor && <Card.Title className="text-primary fw-bold mb-4">Reservas</Card.Title>}

        {reservas.map(r => (
            <Card key={r.id} className="card-glass mb-3">
            <Row className="g-0 align-items-center p-2">

                <Col xs="auto">
                <div className="avatar-ring">
                    <img 
                    src={getUserDisplayData(r.idUsuario).avatar} 
                    alt={`Avatar de ${getUserDisplayData(r.idUsuario).name}`} 
                    />
                </div>
                </Col>

                <Col className="ms-3">
                <h6 className="mb-1 fw-semibold">
                  {gestor && getUserDisplayData(r.idUsuario).name}
                  {!gestor && r.nombreEvento}
                  </h6>
                <span className="badge badge-seats">
                    {r.plazasReservadas} asiento{r.plazasReservadas > 1 && 's'}
                </span>
                </Col>

                {btnCancelado && (
                  <Col xs="auto" className="me-2">
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => onCancelado(r.id)}
                      className="px-3"
                    >
                      Cancelar
                    </Button>
                  </Col>
                )}
            </Row>
            </Card>
        ))}
    </Card.Body>
  );
};

ReservasCard.propTypes = {
  reservas: PropTypes.array.isRequired
};

export default ReservasCard;