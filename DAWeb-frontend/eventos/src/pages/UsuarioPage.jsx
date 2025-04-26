import React, { useState, useMemo, useEffect } from 'react';
import UserEventCard from '../components/UserEventCard/UserEventCard';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const UsuarioPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventosData, setEventosData] = useState({
    _embedded: { eventoDTOList: [] }
  });
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigate();

  // Efecto para cargar eventos una sola vez al montar el componente
  useEffect(() => {
    const fetchEventos = async () => {
      if (loading) return;

      setLoading(true);
      try {
        const response = await fetch('http://localhost:8090/eventos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate('/login', { replace: true });
          }
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setEventosData(data);
      } catch (error) {
        console.error('Error al obtener eventos:', error);
        toast.error(`Error: ${error.message}`, {
          position: 'top-right',
          autoClose: 3000
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const eventos = useMemo(() => {
    return eventosData._embedded?.eventoDTOList || [];
  }, [eventosData]);

  // Eventos filtrados con useMemo para recalcular solo cuando cambian los datos o el término de búsqueda
  const eventosFiltrados = useMemo(() => {
    if (searchTerm.trim() === '') {
      return eventos;
    }

    return eventos.filter(evento =>
      evento.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [eventos, searchTerm]);

  return (
    <>
      <Container className="mt-5">
        <h2 className="text-center fw-bold mb-4" style={{ color: '#2c3e50' }}>
          Encuentra y haz reservas de eventos a tu medida
        </h2>

        <Tabs
          defaultActiveKey="eventos"
          id="usuario-tabs"
          className="justify-content-center mb-4"
          fill
          variant="pills"
        >
          <Tab eventKey="eventos" title="Eventos">
            <Form className="mb-2">
              <Form.Control
                type="text"
                placeholder="Buscar eventos por nombre..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </Form>

            <Row className="g-4">
              {eventosFiltrados.length > 0 ? (
                eventosFiltrados.map(evento => (
                  <Col key={evento.id} xs={12} sm={6} md={4}>
                    <UserEventCard
                      cardTitle={evento.nombre}
                      cardText={evento.descripcion}
                      eventDate={evento.ocupacion?.fechaInicio}
                      eventLocation="Hay que modificar el dto para que devuelva la ubicacion"
                    />
                  </Col>
                ))
              ) : (
                <div className="text-center mt-4">
                  <p>No se encontraron eventos.</p>
                </div>
              )}
            </Row>
          </Tab>

          <Tab eventKey="reservas" title="Mis Reservas">
            <div className="text-center mt-4">
              <p>PEREZ HAZMELOOOOO</p>
            </div>
          </Tab>
        </Tabs>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default UsuarioPage;
