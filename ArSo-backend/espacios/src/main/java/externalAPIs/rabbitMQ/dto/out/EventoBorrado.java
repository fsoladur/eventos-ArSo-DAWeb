package externalAPIs.rabbitMQ.dto.out;

public class EventoBorrado extends EventoRabbit {
  public EventoBorrado() {
    super(TipoEvento.EVENTO_CANCELADO, null);
  }

  public EventoBorrado(String EntidadId) {
    super(TipoEvento.EVENTO_CANCELADO, EntidadId);
  }
}
