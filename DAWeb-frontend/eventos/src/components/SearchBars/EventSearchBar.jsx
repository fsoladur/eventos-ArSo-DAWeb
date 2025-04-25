import { Form } from 'react-bootstrap';
import DischargeEventForm from '../DischargeButton/Variants/DischargeEventForm';
import { toast, ToastContainer } from 'react-toastify';

/*const handleSubmit = async (dto, addEspacio) => {
  try {
    const fetchAddEspacios = await fetch('http://localhost:8090/espacios', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto)
    });

    if (!fetchAddEspacios.ok) {
      throw new Error('Error al crear el espacio');
    }
    const id = await fetchAddEspacios.json();
    
    const fetchObtenerEspacio = await fetch(`http://localhost:8090/espacios/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!fetchObtenerEspacio.ok) {
      throw new Error('Error al obtener el espacio creado');
    }
    const espacio = await fetchObtenerEspacio.json();
    addEspacio(espacio); 
    toast.success('Espacio creado correctamente.');

  } catch (error) {
    toast.error(error.message);
  }
};*/

const SpaceSearchBar = ({ onSearch, addEvento }) => (
  <div className="d-flex  mb-3">
  <Form className="w-100 me-3" >
    <Form.Control
      type="text"
      placeholder="Buscar evento por: Nombre, organizador o género"
      onChange={(e) => onSearch(e.target.value)}
    />
  </Form>
  <DischargeEventForm onHandleSubmit={(dto) => handleSubmit(dto, addEvento)} />
  <ToastContainer />  
  </div>
);

export default SpaceSearchBar;
