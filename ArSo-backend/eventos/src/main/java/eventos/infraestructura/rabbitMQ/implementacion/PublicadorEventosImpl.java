package eventos.infraestructura.rabbitMQ.implementacion;

import eventos.dominio.Evento;
import eventos.infraestructura.rabbitMQ.PublicadorEventos;
import eventos.infraestructura.rabbitMQ.config.RabbitMQConfig;
import eventos.infraestructura.rabbitMQ.dto.out.*;
import eventos.infraestructura.rabbitMQ.mapper.EventoRabbitMapper;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.stereotype.Component;

@Component
public class PublicadorEventosImpl implements PublicadorEventos {

  private final AmqpTemplate rabbitTemplate;
  private final TopicExchange topicExchange;

  public PublicadorEventosImpl(AmqpTemplate rabbitTemplate, TopicExchange topicExchange) {
    this.rabbitTemplate = rabbitTemplate;
    this.topicExchange = topicExchange;
  }

  @Override
  public void publicarEventoCreacion(Evento evento) {

    this.rabbitTemplate.convertAndSend(
        topicExchange.getName(),
        RabbitMQConfig.ROUTING_KEY + TipoEvento.EVENTO_CREADO.getNombre(),
        (EventoCreacion) EventoRabbitMapper.toEventoCreacion(evento));
  }

  @Override
  public void publicarEventoModificacion(Evento evento) {
    this.rabbitTemplate.convertAndSend(
        topicExchange.getName(),
        RabbitMQConfig.ROUTING_KEY + TipoEvento.EVENTO_MODIFICADO.getNombre(),
        (EventoModificacion) EventoRabbitMapper.toEventoModificacion(evento));
  }

  @Override
  public void publicarEventoBorrado(String entidadId) {
    this.rabbitTemplate.convertAndSend(
        topicExchange.getName(),
        RabbitMQConfig.ROUTING_KEY + TipoEvento.EVENTO_CANCELADO.getNombre(),
        (EventoBorrado) EventoRabbitMapper.toEventoBorrado(entidadId));
  }
}
