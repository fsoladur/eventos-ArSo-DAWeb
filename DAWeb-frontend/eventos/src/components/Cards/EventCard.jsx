import { useState, useEffect } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import { getBadgeColor } from '../../utils/utils'; 
import { useEspacios } from '../../hooks/Espacios/useEspacios'; 
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEventForm } from '../../hooks/Eventos/useEventForm';
import SpaceSelector from '../Eventos/SpaceSelector';
import { useNavigate } from 'react-router-dom';  

const EventCard = ({
  item,
  onExpand,
  onSave,
  isSaving
}) => {

  const { 
    formValues, 
    isDirty, 
    isCancelado, 
    handleInputChange, 
    handleDateChange, 
    handleSubmit 
  } = useEventForm(item, onSave);

  const navigate = useNavigate();

  const handleMasInfo = () => {
    navigate(`${item.id}`);
  }
  
  const { espacios } = useEspacios(); 

  let itemEspacio = item?.ocupacion 
    ? espacios.find(esp => esp.id === item.ocupacion.idEspacioFisico) : null;

  return (
    <Accordion.Item eventKey={item.id.toString()}>
      <Card>
        <Accordion.Header onClick={onExpand}>
          <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
            <div className="fw-bold me-md-2">{item.nombre} - <span className='text-muted'>{item.organizador}</span></div>
            <div className="text-wrap text-break">
                <span className={`badge bg-${getBadgeColor(item.categoria)}`}>
                    {item.categoria}
                </span>
            </div>
          </div>
        </Accordion.Header>

        <Accordion.Body>
          <Form className='fw-semibold' onSubmit={handleSubmit}>
          
            <div className="d-flex gap-2 flex-column flex-sm-row">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Form.Group className="mb-2 w-100 d-flex flex-column">
                <Form.Label>Fecha inicio</Form.Label>
                <DateTimePicker
                  value={formValues.fechaInicio ? new Date(formValues.fechaInicio) : null}
                  onChange={(date) => handleDateChange("fechaInicio", date)}
                  disabled={isCancelado}
                />
              </Form.Group>

              <Form.Group className="mb-2 w-100 d-flex flex-column">
                <Form.Label>Fecha fin</Form.Label>
                <DateTimePicker
                  value={formValues.fechaFin ? new Date(formValues.fechaFin) : null}
                  onChange={(date) => handleDateChange("fechaFin", date)}
                  disabled={isCancelado}
                />
              </Form.Group>
              </LocalizationProvider>
            </div>

            <Form.Group className="mb-2">
              <Form.Label>Nº Plazas</Form.Label>
              <Form.Control
                type="number"
                name="plazas"
                value={formValues.plazas}
                onChange={handleInputChange}
                disabled={isCancelado}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="descripcion"
                value={formValues.descripcion}
                onChange={handleInputChange}
                disabled={isCancelado}
              />
            </Form.Group>

            <SpaceSelector
              value={formValues.idEspacioFisico}
              onChange={handleInputChange}
              disabled={isCancelado}
              currentSpace={itemEspacio}
              fechaInicio={formValues.fechaInicio}
              fechaFin={formValues.fechaFin}
              plazas={formValues.plazas}
            />

            <div className="d-flex justify-content-end gap-2">
              <Button
                type="submit"
                variant="outline-primary"
                size="sm"
                disabled={!isDirty || isSaving || isCancelado}
              >
                { isSaving ? 'Guardando…' : isDirty ? 'Guardar' : 'Sin cambios' }
              </Button>
              <Button variant="outline-success" size="sm" onClick={handleMasInfo}>
                Más información
              </Button>
            </div>
          </Form>
        </Accordion.Body>
      </Card>
    </Accordion.Item>
  );
};

export default EventCard;
