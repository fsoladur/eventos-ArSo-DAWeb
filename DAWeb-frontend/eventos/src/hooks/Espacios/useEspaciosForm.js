import { useState } from 'react';

export function useEspaciosForm(item, onSave) {
    let initialValues = {
        nombre: item.nombre,
        capacidad: item.capacidad,
        descripcion: item.descripcion || ''
    };

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
        initialValues = { ...processedValues, }; // Actualizar valores iniciales
    };


    return {
        formValues,
        isDirty,
        isActive,
        handleChange,
        handleSubmit
    };
}
