import { Accordion, Card, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const SpaceCard = ({ item, onExpand, isExpanded }) => {
  const [itemOriginal, setItemOriginal] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Inicializar React Hook Form
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { isDirty, dirtyFields },
    reset 
  } = useForm({
    defaultValues: {
      nombre: item.resumen.nombre,
      capacidad: item.resumen.capacidad,
      descripcion: item.resumen.descripcion || '',
      direccion: item.resumen.direccion
    }
  });

  // Observar valores actuales del formulario
  const formValues = watch();
  
  // Guardar estado original al expandir por primera vez
  useEffect(() => {
    if (isExpanded && !itemOriginal) {
      setItemOriginal({...item});
    }
  }, [isExpanded, item, itemOriginal]);
  
  // Resetear formulario cuando cambia el item (por ejemplo, cuando se selecciona otro espacio)
  useEffect(() => {
    reset({
      nombre: item.resumen.nombre,
      capacidad: item.resumen.capacidad,
      descripcion: item.resumen.descripcion || '',
      direccion: item.resumen.direccion
    });
  }, [item, reset]);

  // Determinar si hay cambios comparando con el estado original
  const hayCambios = () => {
    if (!itemOriginal || !isDirty) return false;
    
    // Solo verificar campos que han sido modificados
    if (dirtyFields.nombre && formValues.nombre !== itemOriginal.resumen.nombre) return true;
    if (dirtyFields.capacidad && parseInt(formValues.capacidad) !== parseInt(itemOriginal.resumen.capacidad)) return true;
    if (dirtyFields.descripcion && formValues.descripcion !== (itemOriginal.resumen.descripcion || '')) return true;
    
    return false;
  };

  // Manejar el guardado (se llama automáticamente por handleSubmit)
  const onSubmit = async (data) => {
    if (!hayCambios()) return;

    const ERROR_ALERT = "Error al guardar los cambios. Por favor, inténtelo de nuevo.";
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:8090/espacios/${item.resumen.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          nombre: data.nombre,
          capacidad: parseInt(data.capacidad),
          descripcion: data.descripcion
        })
      });

      if (response.ok && response.status === 204) {
          // Crear un "updatedItem" basado en los datos enviados
          const updatedItem = {
            ...itemOriginal,
            resumen: {
              ...itemOriginal.resumen,
              nombre: data.nombre,
              capacidad: parseInt(data.capacidad),
              descripcion: data.descripcion
            }
          };
          
          setItemOriginal(updatedItem);

          reset({
            nombre: data.nombre,
            capacidad: data.capacidad,
            descripcion: data.descripcion || '',
            direccion: item.resumen.direccion
          });
      }else{
        setError(ERROR_ALERT);
      }
    } catch(e)
    {
      setError(ERROR_ALERT);
      console.log(e);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Accordion.Item eventKey={item.resumen.id.toString()}>
      <Card>
        <Accordion.Header onClick={onExpand}>
          <div className="d-flex flex-column flex-md-row gap-2">
            <div className="fw-bold me-md-2">{item.resumen.nombre}</div>
            <div className="d-flex flex-column flex-md-row">
              <div className="me-md-3">
                <span>{item.resumen.capacidad} plazas</span>
              </div>
              <div className="text-wrap text-break">
                <span>{item.resumen.direccion}</span>
              </div>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          {error && (
            <div className="alert alert-danger py-2 mb-3">{error}</div>
          )}
          
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text"
                {...register("nombre")}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Capacidad</Form.Label>
              <Form.Control 
                type="number"
                {...register("capacidad")}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                as="textarea"
                rows={2}
                {...register("descripcion")}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Dirección</Form.Label>
              <Form.Control 
                type="text"
                {...register("direccion")}
                disabled
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button 
                type="submit"
                variant="outline-primary" 
                size="sm" 
                disabled={!hayCambios() || isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : hayCambios() ? 'Guardar' : 'Sin cambios'}
              </Button>
              <Button 
                variant="outline-danger" 
                size="sm"
                disabled={isSubmitting}
              >
                Cerrar temporalmente
              </Button>
            </div>
          </Form>
        </Accordion.Body>
      </Card>
    </Accordion.Item>
  );
};

export default SpaceCard;
