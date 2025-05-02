import React, { useState, useMemo, useEffect } from 'react';
import UserEventCard from '../components/UserEventCard/UserEventCard';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserEventSearchBar from '../components/SearchBars/UserEventSearchBar';
import { useEventos } from '../hooks/Eventos/useEventos';
import PaginationBar from '../components/Pagination/PaginationBar';
import { usePagination } from '../hooks/usePagination';
import { darAltaReserva, getReservasUsuario, cancelarReserva } from '../services/ReservasServices';
import ReservasCard from '../components/Cards/ReservaCard';
import { useAuth } from '../context/useAuth';

const UsuarioPage = () => {
  const { user } = useAuth();
  const [filtroActual, setFiltroActual] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const { eventos, loading, error } = useEventos();
  
  // Estados para las reservas
  const [reservas, setReservas] = useState([]);
  const [loadingReservas, setLoadingReservas] = useState(false);
  const [errorReservas, setErrorReservas] = useState(null);
  const [subTabActiva, setSubTabActiva] = useState('activas');

  // Cargar las reservas cuando se accede al componente
  useEffect(() => {
    const cargarReservas = async () => {
      if (!user) return;
      
      setLoadingReservas(true);
      try {
        console.log('Cargando reservas para el usuario:', user.id);
        const reservasData = await getReservasUsuario(user.id);
        setReservas(reservasData);
      } catch (error) {
        console.error('Error al cargar reservas:', error);
        setErrorReservas('No se pudieron cargar tus reservas');
        toast.error('Error al cargar tus reservas');
      } finally {
        setLoadingReservas(false);
      }
    };
    
    cargarReservas();
  }, [user]);


  const reservasActivas = useMemo(() => {
    return reservas.filter(reserva => !reserva.cancelado && new Date(reserva.fechaInicioEvento) > new Date());
  }, [reservas]);

  const handleCancelarReserva = async (idReserva) => {
    try {
      // Aquí iría la llamada para cancelar la reserva
      await cancelarReserva(idReserva);
      toast.success('Reserva cancelada exitosamente');
      
      // Actualizar la lista de reservas
      const nuevasReservas = await getReservasUsuario(user.id);
      setReservas(nuevasReservas);
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      toast.error('No se pudo cancelar la reserva');
    }
  };

  const handleSubmit = async requestBody => {
    try {
      await darAltaReserva({ requestBody: requestBody });
      toast.success('Reserva creada con éxito', {
        position: 'top-right',
        autoClose: 3000
      });
      setReservas(await getReservasUsuario(user.id));
    } catch (error) {
      console.error('Error al reservar:', error);
      toast.error(
        `Error: ${error.message || 'No se pudo completar la reserva'}`,
        {
          position: 'top-right',
          autoClose: 3000
        }
      );
    }
  };

  useEffect(() => {
    if (!error) return;
    toast.error(`Error: ${error}`, {
      position: 'top-right',
      autoClose: 3000
    });
  }, [error]);

  const eventosFiltrados = useMemo(() => {
    if (!filtroActual.trim()) {
      return eventos;
    }

    return eventos.filter(evento =>
      evento.nombre?.toLowerCase().includes(filtroActual.toLowerCase())
    );
  }, [eventos, filtroActual]);

  const { paginatedItems: eventosPaginados, totalPages } = usePagination(
    eventosFiltrados,
    paginaActual,
    6
  );

  useEffect(() => {
    setPaginaActual(1);
  }, [filtroActual]);

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

            {(() => {
              if (loading) {
                return (
                  <div className="text-center my-5">
                    <output>
                      <Spinner animation="border">
                        <span className="visually-hidden">Cargando...</span>
                      </Spinner>
                    </output>
                  </div>
                );
              }

              if (error) {
                return (
                  <Alert variant="danger" className="my-3">
                    {error}
                  </Alert>
                );
              }

              return (
                <>
                  <Row className="g-4">
                    {eventosPaginados.length > 0 ? (
                      eventosPaginados
                        .filter(evento => !evento.cancelado)
                        .map(evento => (
                          <Col key={evento.id} xs={12} sm={6} md={4}>
                            <UserEventCard
                              cardTitle={evento.nombre}
                              cardText={evento.descripcion}
                              eventDate={evento.ocupacion.fechaInicio}
                              eventLocation={
                                evento.ocupacion.direccionEspacioFisico
                              }
                              eventSpaceName={
                                evento.ocupacion.nombreEspacioFisico
                              }
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

                  {eventosFiltrados.length > 0 && (
                    <div className="d-flex justify-content-center mt-4">
                      <PaginationBar
                        totalPaginas={totalPages}
                        paginaActual={paginaActual}
                        onPageChange={setPaginaActual}
                        initialMaxEllipsis={3}
                      />
                    </div>
                  )}
                </>
              );
            })()}
          </Tab>

          <Tab eventKey="reservas" title="Mis Reservas">
            <div className="mt-4">
              <Tabs
                activeKey={subTabActiva}
                onSelect={(k) => setSubTabActiva(k)}
                id="reservas-subtabs"
                className="mb-3"
                variant="pills"
                justify
              >
                <Tab eventKey="activas" title="Mis reservas activas">
                  {loadingReservas ? (
                    <div className="text-center my-4">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Cargando reservas...</span>
                      </Spinner>
                    </div>
                  ) : errorReservas ? (
                    <Alert variant="danger">{errorReservas}</Alert>
                  ) : reservasActivas.length > 0 ? (
                    <div className="card shadow-sm">
                      <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '0 5px' }}>
                        <ReservasCard 
                          reservas={reservasActivas} 
                          btnCancelado={true}
                          onCancelado={handleCancelarReserva} 
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center my-4 p-3 bg-light rounded">
                      <p>No tienes reservas activas en este momento.</p>
                    </div>
                  )}
                </Tab>

                <Tab eventKey="todas" title="Todas mis reservas">
                  {loadingReservas ? (
                    <div className="text-center my-4">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Cargando reservas...</span>
                      </Spinner>
                    </div>
                  ) : errorReservas ? (
                    <Alert variant="danger">{errorReservas}</Alert>
                  ) : reservas.length > 0 ? (
                    <div className="card shadow-sm">
                      <div style={{ maxHeight: '500px', overflowY: 'auto', padding: '0 5px' }}>
                        <ReservasCard reservas={reservas} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center my-4 p-3 bg-light rounded">
                      <p>No has realizado ninguna reserva.</p>
                    </div>
                  )}
                </Tab>
              </Tabs>
            </div>
          </Tab>
        </Tabs>
      </Container>
      
      <ToastContainer />
    </>
  );
};

export default UsuarioPage;
