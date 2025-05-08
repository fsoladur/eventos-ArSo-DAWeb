const getEvento = async id => {
    try {
        const response = await fetch(`http://localhost:8090/eventos/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Error al obtener el evento');
        }
        return await response.json();
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
}

const getEventos = async () => {
    try {
        const response = await fetch('http://localhost:8090/eventos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Error al obtener los eventos');
        }
        return await response.json();
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
}

const cancelarEvento = async (id) => {
    try {
        const response = await fetch(`http://localhost:8090/eventos/${id}/estado`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Error al cancelar el evento');
        }
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
}

export {getEvento, getEventos, cancelarEvento};

