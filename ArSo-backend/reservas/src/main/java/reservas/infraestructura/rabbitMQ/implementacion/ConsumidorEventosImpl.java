package reservas.infraestructura.rabbitMQ.implementacion;

import java.time.LocalDateTime;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.support.converter.MessageConverter;
import reservas.infraestructura.rabbitMQ.ConsumidorEventos;
import reservas.infraestructura.rabbitMQ.dto.EventoDto;
import reservas.infraestructura.rabbitMQ.eventos.PublicacionEvento;
import reservas.infraestructura.rabbitMQ.eventos.TipoEvento;

public class ConsumidorEventosImpl implements ConsumidorEventos {

  private final MessageConverter messageConverter;

  public ConsumidorEventosImpl(MessageConverter messageConverter) {
    this.messageConverter = messageConverter;
  }

  @Override
  public void consumir(Message message) throws Exception {
    PublicacionEvento publicacionEvento = (PublicacionEvento) messageConverter.fromMessage(message);

    TipoEvento tipo = publicacionEvento.getTipoEvento();
    String entidadId = publicacionEvento.getEntidadId();
    LocalDateTime fecha = publicacionEvento.getFechaCreacion();

    EventoDto evento = (EventoDto) publicacionEvento.getEntidad();
    /**
     * Aquí se debería implementar la lógica de negocio para consumir el evento
     */
  }
}
