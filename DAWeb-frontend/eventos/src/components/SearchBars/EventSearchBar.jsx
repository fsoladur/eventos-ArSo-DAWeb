import { Form } from 'react-bootstrap';
import DischargeEventForm from '../DischargeButton/Variants/DischargeEventForm';
import { toast, ToastContainer } from 'react-toastify';

const handleSubmit = async (dto, addEvento) => {
  try {
    console.log('DTO:', dto);
    const fetchAddEventos = await fetch('http://localhost:8090/eventos', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto)
    });

    if (!fetchAddEventos.ok) {
      throw new Error('Error al crear el espacio');
    }

    const locationHeader = fetchAddEventos.headers.get('Location'); 
    const id = locationHeader.split('/').pop(); 
    
    const fetchObtenerEvento = await fetch(`http://localhost:8090/eventos/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!fetchObtenerEvento.ok) {
      throw new Error('Error al obtener el evento creado');
    }
    const evento = await fetchObtenerEvento.json();
    addEvento(evento);
    toast.success('Evento creado correctamente.');

  } catch (error) {
    toast.error(error.message);
  }
};

const EventSearchBar = ({ onSearch, addEvento }) => (
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

export default EventSearchBar;
