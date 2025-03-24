package externalAPIs.rabbitMQ.mapper;

import dominio.EspacioFisico;
import externalAPIs.rabbitMQ.dto.out.EventoBorrado;
import externalAPIs.rabbitMQ.dto.out.EventoCreacion;
import externalAPIs.rabbitMQ.dto.out.EventoEspacioActivado;
import externalAPIs.rabbitMQ.dto.out.EventoModificacion;
import externalAPIs.rabbitMQ.dto.out.EventoRabbit;

public class EventoRabbitMapper {

	public static EventoRabbit toEventoCreacion(EspacioFisico espacio) {
		return new EventoCreacion(espacio.getId().toString(), espacio.getNombre(), espacio.getPropietario(),
				espacio.getCapacidad(), espacio.getDireccion(), espacio.getLongitud(), espacio.getLatitud(),
				espacio.getDescripcion());
	}

	public static EventoRabbit toEventoModificacion(EspacioFisico evento) {
		return new EventoModificacion(evento.getId().toString(), evento.getNombre(), evento.getDescripcion(),
				evento.getCapacidad());
	}

	public static EventoRabbit toEventoBorrado(String entidadId) {
		return new EventoBorrado(entidadId);
	}

	public static EventoRabbit toEventoActivo(String entidadId) {
		return new EventoEspacioActivado(entidadId);
	}

}
