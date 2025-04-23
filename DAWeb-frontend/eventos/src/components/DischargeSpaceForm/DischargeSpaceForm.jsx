import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DischargeButton from '../DischargeButton/DischargeButton';
import { useAuth } from '../../context/AuthContext';

const DischargeSpaceForm = ({ onHandleSubmit }) => {
  const { user } = useAuth();
  const [validated, setValidated] = useState(false);

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
      capacidad: form.capacidad.value,
      direccionPostal: form.direccion.value,
      latitud: form.latitud.value,
      longitud: form.longitud.value
    };

    onHandleSubmit(dto);
    closeModalCallback();
  };

  return (
    <DischargeButton buttonLabel="Dar de alta evento">
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
            <Form.Group as={Col} md="6" controlId="validationDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dirección"
                name="direccion"
                required
              />
              <Form.Control.Feedback type="invalid">
                La dirección es obligatoria.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationLatitud">
              <Form.Label>Latitud</Form.Label>
              <Form.Control
                type="text"
                pattern="^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$"
                placeholder="Latitud (ej: 40.416775)"
                name="latitud"
                required
              />
              <Form.Control.Feedback type="invalid">
                Ingresa una latitud válida entre -90 y 90.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationLongitud">
              <Form.Label>Longitud</Form.Label>
              <Form.Control
                type="text"
                pattern="^-?((1[0-7]|[1-9])?\d(\.\d+)?|180(\.0+)?)$"
                placeholder="Longitud (ej: -3.703790)"
                name="longitud"
                required
              />
              <Form.Control.Feedback type="invalid">
                Ingresa una longitud válida entre -180 y 180.
              </Form.Control.Feedback>
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

DischargeSpaceForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired
};

export default DischargeSpaceForm;
