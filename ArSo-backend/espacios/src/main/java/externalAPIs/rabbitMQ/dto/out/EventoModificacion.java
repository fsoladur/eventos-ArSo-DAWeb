package externalAPIs.rabbitMQ.dto.out;

public class EventoModificacion extends EventoRabbit {
	private String nombre;
	private String descripcion;
	private int capacidad;

	public EventoModificacion() {
		super(TipoEvento.EVENTO_MODIFICADO, null);
	}

	public EventoModificacion(String entidadId, String nombre, String descripcion, int capacidad) {
		super(TipoEvento.EVENTO_MODIFICADO, entidadId);
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.capacidad = capacidad;
	}

	public String getNombre() {
		return nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}
	
	public int getCapacidad() {
		return capacidad;
	}

}
