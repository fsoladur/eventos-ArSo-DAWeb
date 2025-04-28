import { useState } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import { useEspaciosForm } from '../../hooks/Espacios/useEspaciosForm';

const SpaceCard = ({
  item,
  onExpand,
  onSave,
  isSaving,
  toggleActivo
}) => {

  const {
    formValues,
    isDirty,
    isActive,
    setActive,
    handleChange,
    handleSubmit
  } = useEspaciosForm(item, onSave);

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
              <Button variant={isActive ? "outline-danger" : "outline-success"} size="sm" disabled={isSaving} onClick={async () => {
                if(await toggleActivo(item.id, !isActive)) {
                  setActive(!isActive);
                }
              }}>
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