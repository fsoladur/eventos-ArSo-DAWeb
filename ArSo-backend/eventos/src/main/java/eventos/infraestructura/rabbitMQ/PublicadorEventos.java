package eventos.infraestructura.rabbitMQ;

import eventos.dominio.Evento;
import eventos.infraestructura.rabbitMQ.dto.out.EventoRabbit;

import java.util.Map;

public interface PublicadorEventos {
  void publicarEventoCreacion(Evento evento);
  void publicarEventoModificacion(Evento evento);
  void publicarEventoBorrado(String entidadId);
}
