import React, { useState, useMemo, useEffect, useRef } from 'react';
import UserEventCard from '../components/UserEventCard/UserEventCard';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserEventSearchBar from '../components/SearchBars/UserEventSearchBar';
import { useEventos } from '../hooks/Eventos/useEventos';
import PaginationBar from '../components/Pagination/PaginationBar';
import { usePagination } from '../hooks/usePagination';
import {
  darAltaReserva,
  getReservasUsuario,
  cancelarReserva
} from '../services/reservasServices';
import ReservasCard from '../components/Cards/ReservaCard';
import { useAuth } from '../context/useAuth';
import AdvancedEventFilter from '../components/AdvancedEventFilter/AdvancedEventFilter';

const UsuarioPage = () => {
  const { user } = useAuth();
  const [filtroActual, setFiltroActual] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const { eventos, loading, error } = useEventos();

  console.log('Eventos:', eventos);

  // Estado para filtros avanzados
  const [filtrosAvanzados, setFiltrosAvanzados] = useState({
    nombre: '',
    descripcion: '',
    organizador: '',
    categoria: '',
    numPlazas: 0,
    fechaInicio: null,
    fechaFin: null,
    direccion: ''
  });

  // Estados para las reservas
  const [reservas, setReservas] = useState([]);
  const [loadingReservas, setLoadingReservas] = useState(false);
  const [errorReservas, setErrorReservas] = useState(null);
  const [subTabActiva, setSubTabActiva] = useState('activas');

  // Estado para el filtro
  const [open, setOpen] = useState(false);

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
    return reservas.filter(
      reserva =>
        !reserva.cancelado && new Date(reserva.fechaInicioEvento) > new Date()
    );
  }, [reservas]);

  const handleCancelarReserva = async idReserva => {
    try {
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

  // Funciones para manejar filtros avanzados
  const handleFiltrosAvanzadosChange = nuevosFiltros => {
    setFiltrosAvanzados(nuevosFiltros);
    setPaginaActual(1); // Resetear paginación al cambiar filtros
  };

  const resetFiltrosAvanzados = () => {
    setFiltrosAvanzados({
      nombre: '',
      descripcion: '',
      organizador: '',
      categoria: '',
      numPlazas: 0,
      fechaInicio: null,
      fechaFin: null,
      direccion: ''
    });
    setPaginaActual(1);
  };

  // Lógica de filtrado combinando filtro básico y avanzado
  const eventosFiltrados = useMemo(() => {
    let resultados = eventos;

    resultados = resultados.filter(evento => {
      const fechaActual = new Date();
      const fechaFin = new Date(evento.ocupacion?.fechaFin);
      return fechaFin >= fechaActual && !evento.cancelado;
    });

    // Aplicar filtro básico de búsqueda por nombre
    if (filtroActual.trim()) {
      resultados = resultados.filter(evento =>
        evento.nombre?.toLowerCase().includes(filtroActual.toLowerCase())
      );
    }

    // Aplicar filtros avanzados
    if (filtrosAvanzados.nombre) {
      resultados = resultados.filter(evento =>
        evento.ocupacion?.nombreEspacioFisico
          .toLowerCase()
          .includes(filtrosAvanzados.nombre.toLowerCase())
      );
    }

    if (filtrosAvanzados.descripcion) {
      resultados = resultados.filter(evento =>
        evento.descripcion
          ?.toLowerCase()
          .includes(filtrosAvanzados.descripcion.toLowerCase())
      );
    }

    if (filtrosAvanzados.organizador) {
      resultados = resultados.filter(evento =>
        evento.organizador
          ?.toLowerCase()
          .includes(filtrosAvanzados.organizador.toLowerCase())
      );
    }

    if (filtrosAvanzados.categoria) {
      resultados = resultados.filter(
        evento => evento.categoria === filtrosAvanzados.categoria
      );
    }

    if (filtrosAvanzados.numPlazas > 0) {
      resultados = resultados.filter(evento => {
        return evento.numPlazas >= filtrosAvanzados.numPlazas;
      });
    }

    // Asegurarse de que los filtros de fecha incluyen hora correctamente
    if (filtrosAvanzados.fechaInicio) {
      const fechaInicio = new Date(filtrosAvanzados.fechaInicio);
      resultados = resultados.filter(evento => {
        const fechaEvento = new Date(evento.ocupacion?.fechaInicio);
        return fechaEvento >= fechaInicio;
      });
    }

    if (filtrosAvanzados.fechaFin) {
      const fechaFin = new Date(filtrosAvanzados.fechaFin);
      resultados = resultados.filter(evento => {
        const fechaEvento = new Date(evento.ocupacion?.fechaInicio);
        return fechaEvento <= fechaFin;
      });
    }

    if (filtrosAvanzados.direccion) {
      resultados = resultados.filter(evento =>
        evento.ocupacion?.direccionEspacioFisico
          ?.toLowerCase()
          .includes(filtrosAvanzados.direccion.toLowerCase())
      );
    }

    return resultados;
  }, [eventos, filtroActual, filtrosAvanzados]);

  // Luego aplicar paginación al resultado filtrado
  const { paginatedItems: eventosPaginados, totalPages } = usePagination(
    eventosFiltrados,
    paginaActual,
    6
  );

  useEffect(() => {
    setPaginaActual(1);
  }, [filtroActual, filtrosAvanzados]);

  // Añadir useRef para obtener referencia al componente de filtros
  const filterRef = useRef(null);

  // Crear un estado local para el término de búsqueda que no se aplicará automáticamente
  const [searchInputValue, setSearchInputValue] = useState('');

  return (
    <>
      <Container className="my-5">
        <h2 className="text-center fw-bold mb-4" style={{ color: '#2c3e50' }}>
          Encuentra y haz reservas de eventos a tu medida
        </h2>

        <Tabs
          defaultActiveKey="eventos"
          id="usuario-tabs"
          className="mb-4 shadow-sm border rounded fw-bold"
          fill
          variant="pills"
          justify
        >
          <Tab eventKey="eventos" title="Eventos">
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-grow-1 me-2">
                  <UserEventSearchBar
                    searchTerm={searchInputValue}
                    onSearchTermChange={setSearchInputValue}
                    placeholder="Buscar eventos por nombre"
                  />
                </div>

                <Button
                  size="sm"
                  variant={open ? 'outline-secondary' : 'outline-primary'}
                  onClick={() => setOpen(!open)}
                  className="me-2"
                >
                  {open ? 'Ocultar filtros' : 'Mostrar filtros'}
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    // Obtener los filtros del componente hijo
                    if (filterRef.current) {
                      const currentFilters = filterRef.current.getFilters();
                      setFiltrosAvanzados(currentFilters);
                    }

                    // Actualizar el filtro de búsqueda
                    setFiltroActual(searchInputValue);

                    // Resetear paginación y mostrar notificación
                    setPaginaActual(1);

                    if (searchInputValue.trim()) {
                      toast.info(
                        `Mostrando resultados para: "${searchInputValue}"`,
                        {
                          position: 'top-right',
                          autoClose: 2000
                        }
                      );
                    }
                  }}
                >
                  Buscar
                </Button>
              </div>

              <AdvancedEventFilter
                ref={filterRef}
                open={open}
                setOpen={setOpen}
                filters={filtrosAvanzados}
                onChange={handleFiltrosAvanzadosChange}
                onReset={resetFiltrosAvanzados}
              />
            </div>

            {(() => {
              if (loading) {
                return (
                  <div className="text-center my-5">
                    <Spinner animation="border">
                      <span className="visually-hidden">Cargando...</span>
                    </Spinner>
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
                  <Row sm={1} md={2} lg={4} className="g-4">
                    {eventosPaginados.length > 0 ? (
                      eventosPaginados.map(evento => (
                        <Col key={evento.id} xs={12} sm={6} md={4}>
                          <UserEventCard
                            cardTitle={evento.nombre}
                            cardText={evento.descripcion}
                            eventStartDate={evento.ocupacion.fechaInicio}
                            eventEndDate={evento.ocupacion.fechaFin}
                            eventOrganizer={evento.organizador}
                            eventLocation={
                              evento.ocupacion.direccionEspacioFisico
                            }
                            eventSpaceName={
                              evento.ocupacion.nombreEspacioFisico
                            }
                            eventPhoto={evento.fotoEvento}
                            eventCategory={evento.categoria}
                            eventId={evento.id}
                            eventTotalSeats={evento.numPlazas}
                            onHandleSubmit={handleSubmit}
                            className="h-100"
                          />
                        </Col>
                      ))
                    ) : (
                      <div className="text-center mt-4 p-5 bg-light rounded w-100">
                        <p>
                          No se encontraron eventos
                          {filtroActual ||
                          Object.values(filtrosAvanzados).some(
                            v => v !== '' && v !== 0 && v !== null
                          )
                            ? ' con los filtros actuales'
                            : ''}
                          .
                        </p>
                        {(filtroActual ||
                          Object.values(filtrosAvanzados).some(
                            v => v !== '' && v !== 0 && v !== null
                          )) && (
                          <p className="text-muted">
                            Intenta con otros criterios de búsqueda o limpia los
                            filtros.
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
                onSelect={k => setSubTabActiva(k)}
                id="reservas-subtabs"
                className="mb-3 shadow-sm border rounded"
                variant="pills"
                justify
              >
                <Tab eventKey="activas" title="Mis reservas activas">
                  {(() => {
                    if (loadingReservas) {
                      return (
                        <div className="text-center my-4">
                          <Spinner animation="border">
                            <span className="visually-hidden">
                              Cargando reservas...
                            </span>
                          </Spinner>
                        </div>
                      );
                    }

                    if (errorReservas) {
                      return <Alert variant="danger">{errorReservas}</Alert>;
                    }

                    if (reservasActivas.length > 0) {
                      return (
                        <div className="card shadow-sm">
                          <div
                            style={{
                              maxHeight: '400px',
                              overflowY: 'auto',
                              padding: '0 5px'
                            }}
                          >
                            <ReservasCard
                              gestor={false}
                              reservas={reservasActivas}
                              btnCancelado={true}
                              onCancelado={handleCancelarReserva}
                            />
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div className="text-center my-4 p-3 bg-light rounded">
                        <p>No tienes reservas activas en este momento.</p>
                      </div>
                    );
                  })()}
                </Tab>

                <Tab eventKey="todas" title="Todas mis reservas">
                  {(() => {
                    if (loadingReservas) {
                      return (
                        <div className="text-center my-4">
                          <Spinner animation="border">
                            <span className="visually-hidden">
                              Cargando reservas...
                            </span>
                          </Spinner>
                        </div>
                      );
                    }

                    if (errorReservas) {
                      return <Alert variant="danger">{errorReservas}</Alert>;
                    }

                    if (reservas.length > 0) {
                      return (
                        <div className="card shadow-sm">
                          <div
                            style={{
                              maxHeight: '500px',
                              overflowY: 'auto',
                              padding: '0 5px'
                            }}
                          >
                            <ReservasCard reservas={reservas} />
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div className="text-center my-4 p-3 bg-light rounded">
                        <p>No has realizado ninguna reserva.</p>
                      </div>
                    );
                  })()}
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
