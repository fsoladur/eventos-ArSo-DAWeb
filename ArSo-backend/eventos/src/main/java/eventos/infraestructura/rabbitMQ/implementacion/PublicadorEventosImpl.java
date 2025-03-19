package eventos.infraestructura.rabbitMQ.implementacion;

import com.fasterxml.jackson.databind.ObjectMapper;
import eventos.dominio.Evento;
import eventos.infraestructura.api.rest.dto.out.EventoDTO;
import eventos.infraestructura.api.rest.mapper.EventoMapper;
import eventos.infraestructura.rabbitMQ.PublicadorEventos;
import eventos.infraestructura.rabbitMQ.config.RabbitMQConfig;
import eventos.infraestructura.rabbitMQ.eventos.PublicacionEvento;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class PublicadorEventosImpl implements PublicadorEventos {

  private final AmqpTemplate rabbitTemplate;
  private final TopicExchange topicExchange;

  public PublicadorEventosImpl(AmqpTemplate rabbitTemplate, TopicExchange topicExchange) {
    this.rabbitTemplate = rabbitTemplate;
    this.topicExchange = topicExchange;
  }

  @Override
  public void publicar(String entidadId, String tipoEvento, Object entity) throws Exception {
    try {
      PublicacionEvento publicacion =
          new PublicacionEvento(tipoEvento, entidadId, EventoMapper.toDTO((Evento) entity));
      String routingKey = RabbitMQConfig.ROUTING_KEY + tipoEvento;
      rabbitTemplate.convertAndSend(topicExchange.getName(), routingKey, publicacion);
    } catch (Exception e) {
      throw new RuntimeException("Error al publicar el evento", e);
    }
  }
}
