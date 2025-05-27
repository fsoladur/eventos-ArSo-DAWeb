import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getEvento, cancelarEvento } from '../services/EventService';
import { getReservas } from '../services/reservasServices';
import { getBadgeColor } from '../utils/utils';
import ReservasCard from '../components/Cards/ReservaCard';
import { toast } from 'react-toastify';

const EventoDetailPage = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        setLoading(true);
        const data = await getEvento(id);
        setEvento(data);
      } catch (error) {
        console.error('Error al cargar el evento:', error);
      }
    };

    const fetchReservas = async () => {
      try {
        const data = await getReservas(id);
        setReservas(data.filter(reserva => !reserva.cancelado));
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
      }
    };
    fetchEvento();
    fetchReservas();
    setLoading(false);
  }, [id]);

  const handleCancel = async () => {
    try {
      await cancelarEvento(id);
      setEvento(prevEvento => ({ ...prevEvento, cancelado: true }));
      setReservas(prevReservas =>
        prevReservas.map(reserva => ({ ...reserva, cancelada: true }))
      );
      toast.success('Evento cancelado con éxito', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } catch (error) {
      toast.error('Error al cancelar el evento', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </Container>
    );
  }

  if (!evento || !reservas) {
    return (
      <Container className="my-5 text-center">
        <h3>No se pudo cargar el evento o sus reservas asociadas</h3>
        <p>Por favor, inténtalo de nuevo más tarde</p>
      </Container>
    );
  }

  return (
    <Container className="EventoDetailPage my-5 py-4">
      <Row className="shadow-sm g-4 bg-light rounded-3 p-4">
        {/* Información del evento */}
        <Col md={6} className="border-end border-0">
          <Card className="shadow-none border-0">
            <Card.Body>
              <Card.Title className="text-primary fw-bold">
                {evento.nombre}
                <span
                  className={`badge bg-${getBadgeColor(
                    evento.categoria
                  )} ms-xl-5 ms-2 fs-6 align-middle`}
                >
                  {evento.categoria}
                </span>
              </Card.Title>
              <Card.Text>
                <strong>Descripción:</strong>{' '}
                {evento.descripcion || 'No disponible'}
              </Card.Text>
              <Card.Text>
                <strong>Organizador:</strong> {evento.organizador}
              </Card.Text>
              <Card.Text>
                <strong>Nº Plazas:</strong> {evento.numPlazas}
              </Card.Text>

              {!evento.cancelado && (
                <>
                  <Card.Subtitle className="text-primary fw-bold mb-3">
                    <strong>Detalles Adicionales:</strong>
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Fecha de inicio:</strong>{' '}
                    {evento.ocupacion.fechaInicio}
                  </Card.Text>
                  <Card.Text>
                    <strong>Fecha de fin:</strong> {evento.ocupacion.fechaFin}
                  </Card.Text>
                  <Card.Text>
                    <strong>Lugar:</strong>{' '}
                    {evento.ocupacion.nombreEspacioFisico}
                  </Card.Text>
                  <Card.Text>
                    <strong>Dirección:</strong>{' '}
                    {evento.ocupacion.direccionEspacioFisico}
                  </Card.Text>
                </>
              )}

              <button
                className="btn btn-danger"
                onClick={handleCancel}
                disabled={evento.cancelado}
              >
                {evento.cancelado ? 'Cancelado' : 'Cancelar'}
              </button>
            </Card.Body>
          </Card>
        </Col>

        {/* Lista de reservas */}
        {reservas.length === 0 && (
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-primary fw-bold">
                  No hay reservas
                </Card.Title>
                <Card.Text>No hay reservas para este evento.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}

        {reservas.length > 0 && (
          <Col md={6}>
            <Card
              style={{ maxHeight: 420, overflowY: 'auto' }}
              className="shadow-none bg-transparent border-0"
            >
              <ReservasCard reservas={reservas} gestor />
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default EventoDetailPage;
