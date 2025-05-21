import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Form, Row, Col, Collapse } from 'react-bootstrap';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';

const categorias = ['CULTURAL', 'ENTRETENIMIENTO', 'DEPORTES', 'OTROS'];

// Usamos forwardRef para poder acceder a este componente desde el padre
const AdvancedEventFilter = forwardRef(({ open, setOpen, filters, onChange, onReset }, ref) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  // Estado local para almacenar cambios temporales
  const [localFilters, setLocalFilters] = useState(filters);
  
  // Actualizamos el estado local cuando cambian los props
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Exponemos los filtros locales al componente padre
  useImperativeHandle(ref, () => ({
    getFilters: () => localFilters
  }));

  const handleChange = e => {
    const { name, value } = e.target;
    const newFilters = {
      ...localFilters,
      [name]: name === 'numPlazasMin' ? parseInt(value) || 0 : value
    };
    setLocalFilters(newFilters);
    // Ya no enviamos los cambios al padre inmediatamente
  };
  
  const handleDateChange = (name, value) => {
    const newFilters = {
      ...localFilters,
      [name]: value
    };
    setLocalFilters(newFilters);
    // Ya no enviamos los cambios al padre inmediatamente
  };

  return (
    <div className="w-100">
      <Collapse in={open}>
        <div className="bg-light border rounded p-3 mb-3">
          <Form>
            <Row className="g-3">
              {/* Primera fila: 4 campos */}
              <Col xs={12} md={6} lg={3}>
                <Form.Group controlId="nombre">
                  <Form.Label className="fw-bold">Espacio Físico</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={localFilters.nombre}
                    onChange={handleChange}
                    placeholder="Nombre del espacio"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={3}>
                <Form.Group controlId="descripcion">
                  <Form.Label className="fw-bold">Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    name="descripcion"
                    value={localFilters.descripcion}
                    onChange={handleChange}
                    placeholder="Palabras clave"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={3}>
                <Form.Group controlId="organizador">
                  <Form.Label className="fw-bold">Organizador</Form.Label>
                  <Form.Control
                    type="text"
                    name="organizador"
                    value={localFilters.organizador}
                    onChange={handleChange}
                    placeholder="Nombre del organizador"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={3}>
                <Form.Group controlId="categoria">
                  <Form.Label className="fw-bold">Categoría</Form.Label>
                  <Form.Select
                    name="categoria"
                    value={localFilters.categoria}
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

              {/* Segunda fila: 4 campos restantes */}
              <Col xs={12} md={6} lg={3}>
                <Form.Group controlId="numPlazasMin">
                  <Form.Label className="fw-bold">Plazas mínimas</Form.Label>
                  <Form.Control
                    type="number"
                    name="numPlazasMin"
                    min={0}
                    value={localFilters.numPlazasMin}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={3}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={es}
                >
                  <Form.Group controlId="fechaInicio">
                    <Form.Label className="fw-bold">Fecha inicio</Form.Label>
                    <DateTimePicker
                      value={localFilters.fechaInicio}
                      onChange={(date) => handleDateChange("fechaInicio", date)}
                      slotProps={{
                        textField: { fullWidth: true, size: 'small' }
                      }}
                      onOpen={() => setIsDatePickerOpen(true)}
                      onClose={() => setIsDatePickerOpen(false)}
                    />
                  </Form.Group>
                </LocalizationProvider>
              </Col>

              <Col xs={12} md={6} lg={3}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={es}
                >
                  <Form.Group controlId="fechaFin">
                    <Form.Label className="fw-bold">Fecha fin</Form.Label>
                    <DateTimePicker
                      value={localFilters.fechaFin}
                      onChange={(date) => handleDateChange("fechaFin", date)}
                      slotProps={{
                        textField: { fullWidth: true, size: 'small' }
                      }}
                      onOpen={() => setIsDatePickerOpen(true)}
                      onClose={() => setIsDatePickerOpen(false)}
                    />
                  </Form.Group>
                </LocalizationProvider>
              </Col>

              <Col xs={12} md={6} lg={3}>
                <Form.Group controlId="direccion">
                  <Form.Label className="fw-bold">Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={localFilters.direccion}
                    onChange={handleChange}
                    placeholder="Dirección del evento"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Botón Limpiar en la parte inferior */}
            <div className="d-flex justify-content-end mt-3">
              <button 
                type="button" 
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  onReset();
                  setLocalFilters({
                    nombre: '',
                    descripcion: '',
                    organizador: '',
                    categoria: '',
                    numPlazasMin: 0,
                    fechaInicio: null,
                    fechaFin: null,
                    direccion: ''
                  });
                }}
              >
                Limpiar
              </button>
            </div>
          </Form>
        </div>
      </Collapse>
    </div>
  );
});

export default AdvancedEventFilter;
