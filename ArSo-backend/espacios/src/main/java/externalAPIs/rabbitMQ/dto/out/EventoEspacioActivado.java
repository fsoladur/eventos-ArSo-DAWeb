package externalAPIs.rabbitMQ.dto.out;

public class EventoEspacioActivado extends EventoRabbit {

	public EventoEspacioActivado() {
		super(TipoEvento.EVENTO_ACTIVADO, null);
	}

	public EventoEspacioActivado(String EntidadId) {
		super(TipoEvento.EVENTO_ACTIVADO, EntidadId);
	}
}
