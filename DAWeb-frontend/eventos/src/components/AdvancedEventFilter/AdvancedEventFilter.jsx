import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';

const categorias = ['CULTURAL', 'ENTRETENIMIENTO', 'DEPORTES', 'OTROS'];

const AdvancedEventFilter = ({ filters, onChange, onReset }) => {
  const [open, setOpen] = useState(false);
  const filterRef = useRef(null);

  // Cerrar el panel de filtros al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = event => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    onChange({
      ...filters,
      [name]: name === 'numPlazasMin' ? parseInt(value) || 0 : value
    });
  };

  return (
    <div className="d-flex position-relative" ref={filterRef}>
      {/* Botones de control */}
      <Button
        size="sm"
        variant="outline-secondary"
        onClick={() => setOpen(!open)}
        aria-controls="advanced-filters"
        aria-expanded={open}
        className="me-2"
      >
        Filtros
      </Button>
      <Button size="sm" variant="outline-danger" onClick={onReset}>
        Limpiar
      </Button>

      {/* Panel de filtros desplegable */}
      {open && (
        <div
          id="advanced-filters"
          className="position-absolute bg-white shadow-sm border rounded p-3 mt-1"
          style={{
            zIndex: 1050,
            top: '40px',
            right: '0',
            width: '90vw',
            maxWidth: '1000px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          <Form>
            <Row
              className="g-3"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))'
              }}
            >
              {/* Filtro por nombre */}
              <Col>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={filters.nombre}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              {/* Filtro por descripción */}
              <Col>
                <Form.Group controlId="descripcion">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    name="descripcion"
                    value={filters.descripcion}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              {/* Filtro por organizador */}
              <Col>
                <Form.Group controlId="organizador">
                  <Form.Label>Organizador</Form.Label>
                  <Form.Control
                    type="text"
                    name="organizador"
                    value={filters.organizador}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              {/* Filtro por categoría */}
              <Col>
                <Form.Group controlId="categoria">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select
                    name="categoria"
                    value={filters.categoria}
                    onChange={handleChange}
                  >
                    <option value="">Todas</option>
                    {categorias.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Filtro por plazas mínimas */}
              <Col>
                <Form.Group controlId="numPlazasMin">
                  <Form.Label>Plazas mínimas</Form.Label>
                  <Form.Control
                    type="number"
                    name="numPlazasMin"
                    min={0}
                    value={filters.numPlazasMin}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              {/* Filtro por fecha inicio */}
              <Col>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={es}
                >
                  <Form.Group controlId="fechaInicio">
                    <Form.Label>Fecha inicio</Form.Label>
                    <DatePicker
                      value={filters.fechaInicio}
                      onChange={date =>
                        onChange({ ...filters, fechaInicio: date })
                      }
                      slotProps={{
                        textField: { fullWidth: true, size: 'small' }
                      }}
                    />
                  </Form.Group>
                </LocalizationProvider>
              </Col>

              {/* Filtro por fecha fin */}
              <Col>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={es}
                >
                  <Form.Group controlId="fechaFin">
                    <Form.Label>Fecha fin</Form.Label>
                    <DatePicker
                      value={filters.fechaFin}
                      onChange={date =>
                        onChange({ ...filters, fechaFin: date })
                      }
                      slotProps={{
                        textField: { fullWidth: true, size: 'small' }
                      }}
                    />
                  </Form.Group>
                </LocalizationProvider>
              </Col>

              {/* Filtro por dirección */}
              <Col>
                <Form.Group controlId="direccion">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={filters.direccion}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AdvancedEventFilter;
