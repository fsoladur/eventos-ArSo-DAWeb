import { Accordion, Card, Button, Form } from 'react-bootstrap';

const SpaceCard = ({ item, onExpand }) => (
  <Accordion.Item eventKey={item.resumen.id.toString()}>
    <Card>
      <Accordion.Header onClick={onExpand}>
        <strong>{item.resumen.nombre}</strong> — {item.resumen.capacidad} plazas — {item.resumen.direccion}
      </Accordion.Header>
      <Accordion.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" defaultValue={item.resumen.nombre} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Capacidad</Form.Label>
            <Form.Control type="number" defaultValue={item.resumen.capacidad} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Direccion</Form.Label>
            <Form.Control type="text" defaultValue={item.resumen.direccion} disabled/>
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
