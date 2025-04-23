import { useState } from 'react';

export function useUpdateEspacio() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError]       = useState(null);

  const update = async ({ id, nombre, capacidad, descripcion }) => {
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8090/espacios/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ nombre, capacidad, descripcion })
      });
      if (!res.ok) throw new Error('No se pudo actualizar');
      // opcional: return await res.json() si la API responde con datos
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
