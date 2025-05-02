export async function darAltaReserva({ requestBody }) {
  const url = 'http://localhost:8090/reservas';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody),
    credentials: 'include'
  };
  console.log('Request Body:', requestBody); // Log the request body

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Error al dar de alta la reserva');
    }
  } catch (error) {
    throw error;
  }
}

export async function getReservas(idEvento) {
  const url = `http://localhost:8090/reservas/eventos/${idEvento}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Error al obtener las reservas del evento');
    }
    const data = await response.json();
    // respuesta accedienco a _embedded
    return data._embedded?.reservaDtoList || [];
  } catch (error) {
    throw error;
  }
}

export async function getReservasUsuario(idUsuario) {
  const url = `http://localhost:8090/reservas/usuarios/${idUsuario}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok && response.status !== 404) {
      throw new Error('Error al obtener las reservas del usuario');
    }
    const data = await response.json();
    return data._embedded?.reservaDtoList || [];
  } catch (error) {
    throw error;
  }
}

export async function cancelarReserva(idReserva) {
  const url = `http://localhost:8090/reservas/${idReserva}/cancelacion`;
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Error al cancelar la reserva');
    }
  } catch (error) {
    throw error;
  }
}

