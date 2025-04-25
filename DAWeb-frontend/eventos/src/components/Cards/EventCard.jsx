import { useState, useEffect } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import { getBadgeColor } from '../../utils/utils'; 
import { useEspacios } from '../../hooks/Espacios/useEspacios'; 
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";



const EventCard = ({
  item,
  onExpand,
  onSave,
  isSaving
}) => {
  // Estado inicial con los valores del espacio
  let initialValues = {
    plazas: item.numPlazas,
    descripcion: item.descripcion,
    fechaInicio: item?.ocupacion?.fechaInicio || null,
    fechaFin: item?.ocupacion?.fechaFin || null,
    idEspacioFisico: item?.ocupacion?.idEspacioFisico || ""
  };
  

  // Estados para almacenar valores del formulario y tracking de cambios
  const [formValues, setFormValues] = useState(initialValues);
  const [isDirty, setIsDirty] = useState(false);
  const [isCancelado, setCancelado] = useState(item.cancelado);
  const { espacios, espaciosLibres } = useEspacios(); 
  const [espaciosDisponibles, setEspaciosDisponibles] = useState([]);
  const [espaciosLibresCargados, setEspaciosLibresCargados] = useState(false);

  const cargarEspaciosLibres = async () => {
    if (espaciosLibresCargados) return; 
      try {
        const espacios = await espaciosLibres(
          formatDate(formValues.fechaInicio), 
          formatDate(formValues.fechaFin), 
          Number(formValues.plazas)
        );
        setEspaciosDisponibles(Array.isArray(espacios) ? espacios : []);
      } catch (error) {
        setEspaciosDisponibles([]);
      }
      setEspaciosLibresCargados(true);
  }

  useEffect(() => {
    setEspaciosLibresCargados(false);
  }, [formValues.fechaInicio, formValues.fechaFin, formValues.plazas]);

  // Manejador de cambios en inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => {
    const newValues = { ...prev, [name]: value };

    // Verificar si hay cambios
    const hasChanges = checkForChanges(newValues);
    setIsDirty(hasChanges);

    return newValues;
  });
  };

  const handleDateChange = (name, date) => {
    setFormValues((prev) => {
      const newValues = { ...prev, [name]: date};
  
      // Verificar si hay cambios
      const hasChanges = checkForChanges(newValues);
      setIsDirty(hasChanges);
  
      return newValues;
    });
  };

  const checkForChanges = (newValues) => {
    return (
      newValues.descripcion !== initialValues.descripcion ||
      Number(newValues.plazas) !== Number(initialValues.plazas) ||
      new Date(newValues.fechaInicio) !== new Date(initialValues.fechaInicio) ||
      new Date(newValues.fechaFin) !== new Date(initialValues.fechaFin) ||
      newValues.idEspacioFisico !== initialValues.idEspacioFisico
    );
  };

  const formatDate = (date) => {
    return new Date(date).toISOString().replace(/\.\d{3}Z$/, '');
  };

  // Manejador para envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Para capacidad, asegurarse de que sea número
    const processedValues = {
      ...formValues,
      plazas: Number(formValues.plazas),
      fechaInicio: formatDate(formValues.fechaInicio),
      fechaFin: formatDate(formValues.fechaFin)
    };
    
    onSave({ id: item.id, ...processedValues });

    setIsDirty(false); 
    initialValues = { ...processedValues}; // Actualizar valores iniciales
  };

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

            <Form.Group className="mb-2">
              <Form.Label>Espacio fisico</Form.Label>
              <Form.Select
                name="idEspacioFisico"
                value={formValues.idEspacioFisico || ""}
                onChange={handleInputChange}
                disabled={isCancelado}
                onFocus={() => {
                  cargarEspaciosLibres();
                }}
              >
                {itemEspacio && <option value={itemEspacio.id}>
                  {itemEspacio.nombre} - {itemEspacio.direccion}
                </option>}
                {itemEspacio && espaciosDisponibles
                  .filter((esp) => esp.id !== item.ocupacion.idEspacioFisico)
                  .map((espacio) => (
                    <option key={espacio.id} value={espacio.id}>
                      {espacio.nombre} - {espacio.direccion}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                type="submit"
                variant="outline-primary"
                size="sm"
                disabled={!isDirty || isSaving || isCancelado}
              >
                { isSaving ? 'Guardando…' : isDirty ? 'Guardar' : 'Sin cambios' }
              </Button>
              <Button variant="outline-success" size="sm">
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
