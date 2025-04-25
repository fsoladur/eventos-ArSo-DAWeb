import { useState } from 'react';

export function useUpdateEvento() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError]       = useState(null);

  const update = async ({ id, plazas, descripcion, fechaInicio, fechaFin, idEspacioFisico }) => {
    setIsSaving(true);
    setError(null);
    
    try {
      const res = await fetch(`http://localhost:8090/eventos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ plazas, descripcion, fechaInicio, fechaFin, idEspacioFisico })
      });
      if (!res.ok) throw new Error('No se pudo actualizar');

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return { update, isSaving, error };
}
