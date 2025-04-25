import { useState } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';

const SpaceCard = ({
  item,
  onExpand,
  onSave,
  isSaving
}) => {
  // Estado inicial con los valores del espacio
  let initialValues = {
    nombre: item.nombre,
    capacidad: item.capacidad,
    descripcion: item.descripcion || ''
  };

  // Estados para almacenar valores del formulario y tracking de cambios
  const [formValues, setFormValues] = useState(initialValues);
  const [isDirty, setIsDirty] = useState(false);
  const [isActive, setActive] = useState(item.estado === 'ACTIVO');


  // Manejador de cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Actualizar estado del formulario
    setFormValues(prev => {
      const newValues = { ...prev, [name]: value };
      
      // Verificar si algún valor es diferente del inicial
      const hasChanges = 
        newValues.nombre !== initialValues.nombre ||
        Number(newValues.capacidad) !== Number(initialValues.capacidad) ||
        newValues.descripcion !== initialValues.descripcion;
      
      setIsDirty(hasChanges);
      
      return newValues;
    });
  };

  // Manejador para envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Para capacidad, asegurarse de que sea número
    const processedValues = {
      ...formValues,
      capacidad: Number(formValues.capacidad)
    };
    
    onSave({ id: item.id, ...processedValues });

    setIsDirty(false); 
    initialValues = { ...processedValues,  }; // Actualizar valores iniciales
  };

  return (
    <Accordion.Item eventKey={item.id.toString()}>
      <Card>
        <Accordion.Header onClick={onExpand}>
          <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
            <p className="fw-bold me-md-2">{item.nombre} - <span className="text-muted">{item.direccion}</span></p> 


          </div>
        </Accordion.Header>

        <Accordion.Body>
          <Form className='fw-semibold' onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                name="nombre"
                value={formValues.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Capacidad</Form.Label>
              <Form.Control 
                type="number" 
                name="capacidad"
                value={formValues.capacidad}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2} 
                name="descripcion"
                value={formValues.descripcion}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                type="submit"
                variant="outline-primary"
                size="sm"
                disabled={!isDirty || isSaving}
              >
                { isSaving ? 'Guardando…' : isDirty ? 'Guardar' : 'Sin cambios' }
              </Button>
              <Button variant={isActive ? "outline-danger" : "outline-success"} size="sm" disabled={isSaving}>
                {isActive ? 'Cerrar temporalmente' : 'Activar'}
              </Button>
            </div>
          </Form>
        </Accordion.Body>
      </Card>
    </Accordion.Item>
  );
};

export default SpaceCard;