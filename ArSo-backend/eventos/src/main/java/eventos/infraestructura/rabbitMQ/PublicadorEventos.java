package eventos.infraestructura.rabbitMQ;

import eventos.infraestructura.rabbitMQ.eventos.PublicacionEvento;

public interface PublicadorEventos {
  void publicar(String entidadId, String tipoEvento, Object entity) throws Exception;
}
