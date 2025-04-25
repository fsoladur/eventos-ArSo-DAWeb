import { useState } from 'react';
import { formatDate } from '../../utils/utils';

export function useEventForm(item, onSave) {
  // Estado inicial con los valores del espacio
  const initialValues = {
    plazas: item.numPlazas,
    descripcion: item.descripcion,
    fechaInicio: item?.ocupacion?.fechaInicio || null,
    fechaFin: item?.ocupacion?.fechaFin || null,
    idEspacioFisico: item?.ocupacion?.idEspacioFisico || ''
  };

  // Estados para almacenar valores del formulario y tracking de cambios
  const [formValues, setFormValues] = useState(initialValues);
  const [isDirty, setIsDirty] = useState(false);
  const [isCancelado] = useState(item.cancelado);

  // Manejador de cambios en inputs
  const handleInputChange = e => {
    const { name, value } = e.target;

    setFormValues(prev => {
      const newValues = { ...prev, [name]: value };
      // Verificar si hay cambios
      const hasChanges = checkForChanges(newValues);
      setIsDirty(hasChanges);
      return newValues;
    });
  };

  // Manejador para cambios en los DateTimePicker
  const handleDateChange = (name, date) => {
    setFormValues(prev => {
      const newValues = { ...prev, [name]: date };
      const hasChanges = checkForChanges(newValues);
      setIsDirty(hasChanges);
      return newValues;
    });
  };

  // Función para verificar si hay cambios en el formulario
  const checkForChanges = newValues => {
    const compareDates = (date1, date2) => {
      if (!date1 && !date2) return true;
      if (!date1 || !date2) return false;

      const d1 = date1 instanceof Date ? date1 : new Date(date1);
      const d2 = date2 instanceof Date ? date2 : new Date(date2);

      const isValidDate1 = !isNaN(d1.getTime());
      const isValidDate2 = !isNaN(d2.getTime());

      if (!isValidDate1 || !isValidDate2) return false;

      return d1.getTime() === d2.getTime();
    };

    return (
      newValues.descripcion !== initialValues.descripcion ||
      Number(newValues.plazas) !== Number(initialValues.plazas) ||
      !compareDates(newValues.fechaInicio, initialValues.fechaInicio) ||
      !compareDates(newValues.fechaFin, initialValues.fechaFin) ||
      newValues.idEspacioFisico !== initialValues.idEspacioFisico
    );
  };
  
  // Manejador para envío del formulario
  const handleSubmit = e => {
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
    Object.assign(initialValues, processedValues); // Actualizar valores iniciales
  };

  return {
    formValues,
    setFormValues,
    isDirty,
    isCancelado,
    handleInputChange,
    handleDateChange,
    handleSubmit
  };
}
