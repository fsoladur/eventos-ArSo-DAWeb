import { Form } from 'react-bootstrap';
import DischargeSpaceForm from '../DischargeButton/Variants/DischargeSpaceForm';
import { ToastContainer } from 'react-toastify';
import { handleSubmitEspacios } from './Handlers';



const SpaceSearchBar = ({ onSearch, addEspacio }) => (
  <div className="d-flex  mb-3">
  <Form className="w-100 me-3" >
    <Form.Control
      type="text"
      placeholder="Buscar espacio por nombre o dirección"
      onChange={(e) => onSearch(e.target.value)}
    />
  </Form>
  <DischargeSpaceForm onHandleSubmit={(dto) => handleSubmitEspacios(dto, addEspacio)} />
  <ToastContainer />  
  </div>
);

export default SpaceSearchBar;
