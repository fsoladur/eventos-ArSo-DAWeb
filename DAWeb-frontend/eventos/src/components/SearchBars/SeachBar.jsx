import { Form } from 'react-bootstrap';

const SpaceSearchBar = ({ onSearch }) => (
  <Form className="mb-3">
    <Form.Control
      type="text"
      placeholder="Buscar espacio por nombre o ubicación..."
      onChange={(e) => onSearch(e.target.value)}
    />
  </Form>
);

export default SpaceSearchBar;
