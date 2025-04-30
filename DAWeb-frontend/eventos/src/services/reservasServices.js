export default async function darAltaReserva({ requestBody }) {
  const url = 'http://localhost:8090/reservas';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody),
    credentials: 'include'
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Error al dar de alta la reserva');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
}
