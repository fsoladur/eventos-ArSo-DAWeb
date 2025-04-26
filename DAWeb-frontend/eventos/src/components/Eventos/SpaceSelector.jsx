import { useState, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useEspacios } from '../../hooks/Espacios/useEspacios';
import { formatDate } from '../../utils/utils';

export default function SpaceSelector({ 
  value,
  onChange,
  disabled = false,
  currentSpace = null,
  fechaInicio,
  fechaFin,
  plazas
}) {
  const { espaciosLibres } = useEspacios();
  const [espaciosDisponibles, setEspaciosDisponibles] = useState([]);
  const espaciosCargadosRef = useRef(false);
  
  // Resetear cuando cambien los parámetros
  useEffect(() => {
    espaciosCargadosRef.current = false;
  }, [fechaInicio, fechaFin, plazas]);

  const cargarEspaciosLibres = async () => {
    if (espaciosCargadosRef.current) return;
    
    try {
      espaciosCargadosRef.current = true;
      
      if (!fechaInicio || !fechaFin || !plazas) {
        setEspaciosDisponibles([]);
        return;
      }
      
      const espacios = await espaciosLibres(
        formatDate(fechaInicio),
        formatDate(fechaFin),
        Number(plazas)
      );
      
      setEspaciosDisponibles(Array.isArray(espacios) ? espacios : []);
    } catch (error) {
      console.error("Error al cargar espacios libres:", error);
      setEspaciosDisponibles([]);
      espaciosCargadosRef.current = false;
    }
  };

  return (
    <Form.Group className="mb-2">
      <Form.Label>Espacio físico</Form.Label>
      <Form.Select
        name="idEspacioFisico"
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        onFocus={cargarEspaciosLibres}
      >
        {currentSpace && (
          <option value={currentSpace.id}>
            {currentSpace.nombre} - {currentSpace.direccion}
          </option>
        )}
        {!currentSpace && (
          <option value="">Selecciona un espacio</option>
        )}
        {espaciosDisponibles
          .filter(esp => !currentSpace || esp.id !== currentSpace.id)
          .map(espacio => (
            <option key={espacio.id} value={espacio.id}>
              {espacio.nombre} - {espacio.direccion}
            </option>
          ))}
      </Form.Select>
    </Form.Group>
  );
}