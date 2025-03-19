package eventos.infraestructura.rabbitMQ.implementacion;

import eventos.infraestructura.rabbitMQ.ConsumidorEventos;
import eventos.infraestructura.rabbitMQ.config.RabbitMQConfig;
import eventos.infraestructura.rabbitMQ.dto.EspacioFisicoDto;
import eventos.infraestructura.rabbitMQ.eventos.PublicacionEvento;
import eventos.infraestructura.rabbitMQ.eventos.TipoEvento;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ConsumidorEventosImpl implements ConsumidorEventos {

  private final MessageConverter messageConverter;

  public ConsumidorEventosImpl(MessageConverter messageConverter) {
    this.messageConverter = messageConverter;
  }

  @Override
  @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
  public void consumir(Message message) throws Exception {
    PublicacionEvento evento = (PublicacionEvento) messageConverter.fromMessage(message);

    TipoEvento tipoEvento = evento.getTipoEvento();
    String entidadId = evento.getEntidadId();
    LocalDateTime fechaHoraEvento = evento.getFechaCreacion();

    EspacioFisicoDto espacioFisicoDto = (EspacioFisicoDto) evento.getEntidad();

    /**
     * Aquí se debería implementar la lógica de negocio para consumir el evento.
     */
  }
}
