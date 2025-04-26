import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DischargeButton from '../DischargeButton';
import { useAuth } from '../../../context/useAuth';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const DischargeEventForm = ({ onHandleSubmit }) => {
  const { user } = useAuth();
  const [validated, setValidated] = useState(false);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const handleValidation = (event, closeModalCallback) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const dto = {
      nombre: form.nombre.value,
      propietario: user.username,
      descripcion: form.descripcion.value,
      organizador: form.organizador.value,
      capacidad: form.capacidad.value,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    };

    onHandleSubmit(dto);
    closeModalCallback();
  };

  return (
    <DischargeButton
      buttonLabel="Dar de alta evento"
      shortButtonLabel="Alta evento"
    >
      {closeModalCallback => (
        <Form
          noValidate
          validated={validated}
          onSubmit={e => handleValidation(e, closeModalCallback)}
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="nombre"
                required
              />
              <Form.Control.Feedback type="invalid">
                El nombre es obligatorio.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descripción"
                name="descripcion"
                required
              />
              <Form.Control.Feedback type="invalid">
                La descripción es obligatoria.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationOrganizador">
              <Form.Label>Organizador</Form.Label>
              <Form.Control
                type="text"
                placeholder="Organizador"
                name="organizador"
                required
              />
              <Form.Control.Feedback type="invalid">
                El organizador es obligatorio.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCapacidad">
              <Form.Label>Capacidad</Form.Label>
              <Form.Control
                type="number"
                min="1"
                placeholder="Capacidad"
                name="capacidad"
                required
              />
              <Form.Control.Feedback type="invalid">
                Ingresa un número válido mayor que 0.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Col md={6}>
                <Form.Group className="mb-2 d-flex flex-column">
                  <Form.Label>Fecha inicio</Form.Label>
                  <DateTimePicker
                    value={fechaInicio}
                    minDateTime={new Date()}
                    onChange={date => setFechaInicio(date)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-2 d-flex flex-column">
                  <Form.Label>Fecha fin</Form.Label>
                  <DateTimePicker
                    value={fechaFin}
                    minDateTime={fechaInicio}
                    onChange={date => setFechaFin(date)}
                  />
                </Form.Group>
              </Col>
            </LocalizationProvider>
          </Row>
          <Row className="mb-3">
            <Form.Group>
              <Form.Label>Categoria</Form.Label>
              <Form.Select name="categoria" required>
                <option value="">Selecciona una categoría</option>
                <option value="CULTURAL">CULTURAL</option>
                <option value="DEPORTES">DEPORTES</option>
                <option value="ENTRETENIMIENTO">ENTRETENIMIENTO</option>
                <option value="OTROS">OTROS</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row>
            <Col>
              <Button type="submit" className="w-100 text-white">
                Guardar
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </DischargeButton>
  );
};

DischargeEventForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired
};

export default DischargeEventForm;
