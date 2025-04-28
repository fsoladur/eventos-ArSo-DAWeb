import React, { useState, useMemo, useEffect } from 'react';
import UserEventCard from '../components/UserEventCard/UserEventCard';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Container, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserEventSearchBar from '../components/SearchBars/UserEventSearchBar';

const UsuarioPage = () => {
  const [eventosData, setEventosData] = useState({
    _embedded: { eventoDTOList: [] }
  });
  const [filtroActual, setFiltroActual] = useState('');

  const handleSubmit = async requestBody => {
    console.log('Request Body:', requestBody); // Verificar el contenido del requestBody
    try {
      const response = await fetch('http://localhost:8090/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      toast.success('Reserva creada con éxito', {
        position: 'top-right',
        autoClose: 3000
      });
    } catch (error) {
      console.error('Error al reservar:', error);
      toast.error(`Error: ${error.message}`, {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch(`http://localhost:8090/eventos`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
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
      }
    };

    fetchEventos();
  }, []);

  // Extraer eventos del estado una sola vez
  const eventos = useMemo(() => {
    return eventosData._embedded?.eventoDTOList || [];
  }, [eventosData]);

  // Filtrar eventos basados en el filtro actual
  const eventosFiltrados = useMemo(() => {
    if (!filtroActual.trim()) {
      return eventos;
    }

    return eventos.filter(evento =>
      evento.nombre?.toLowerCase().includes(filtroActual.toLowerCase())
    );
  }, [eventos, filtroActual]);

  // Manejar la búsqueda
  const handleFilter = event => {
    event.preventDefault();
    const term = event.target.elements.searchTerm.value || '';
    setFiltroActual(term);

    if (term.trim()) {
      toast.info(`Mostrando resultados para: "${term}"`, {
        position: 'top-right',
        autoClose: 2000
      });
    } else {
      setFiltroActual('');
    }
  };

  return (
    <>
      <Container className="my-5">
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
            <UserEventSearchBar
              onFilter={handleFilter}
              placeholder={'Buscar eventos por nombre'}
            />

            <Row className="g-4">
              {eventosFiltrados.length > 0 ? (
                eventosFiltrados.map(evento => (
                  <Col key={evento.id} xs={12} sm={6} md={4}>
                    <UserEventCard
                      cardTitle={evento.nombre}
                      cardText={evento.descripcion}
                      eventDate={evento.ocupacion?.fechaInicio}
                      eventLocation="Hay que modificar el dto para que devuelva la ubicacion"
                      eventId={evento.id}
                      onHandleSubmit={handleSubmit}
                    />
                  </Col>
                ))
              ) : (
                <div className="text-center mt-4 p-5 bg-light rounded">
                  <p>
                    No se encontraron eventos
                    {filtroActual ? ' con el filtro actual' : ''}.
                  </p>
                  {filtroActual && (
                    <p className="text-muted">
                      Intenta con otro término de búsqueda.
                    </p>
                  )}
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
