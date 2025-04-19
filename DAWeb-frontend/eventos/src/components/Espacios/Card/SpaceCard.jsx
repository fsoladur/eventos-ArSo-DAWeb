import { Accordion, Card, Button, Form } from 'react-bootstrap';

const SpaceCard = ({ espacio, onExpand }) => (
  <Accordion.Item eventKey={espacio.resumen.id.toString()}>
    <Card>
      <Accordion.Header onClick={onExpand}>
        <strong>{espacio.resumen.nombre}</strong> — {espacio.resumen.capacidad} plazas — {espacio.resumen.direccion}
      </Accordion.Header>
      <Accordion.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" defaultValue={espacio.resumen.nombre} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Capacidad</Form.Label>
            <Form.Control type="number" defaultValue={espacio.resumen.capacidad} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Direccion</Form.Label>
            <Form.Control type="text" defaultValue={espacio.resumen.direccion} />
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-primary" size="sm">Guardar</Button>
            <Button variant="outline-danger" size="sm">Cerrar temporalmente</Button>
          </div>
        </Form>
      </Accordion.Body>
    </Card>
  </Accordion.Item>
);

export default SpaceCard;
