package externalAPIs.rabbitMQ.implementacion;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import dominio.EspacioFisico;
import externalAPIs.rabbitMQ.PublicadorEspacios;
import externalAPIs.rabbitMQ.dto.out.EventoRabbit;
import externalAPIs.rabbitMQ.excepciones.RabbitMQException;
import externalAPIs.rabbitMQ.mapper.EspacioRabbitMapper;
import externalAPIs.rabbitMQ.RabbitMQInitializer;

import java.nio.charset.StandardCharsets;
import java.util.Map;

import static externalAPIs.rabbitMQ.config.RabbitConfig.*;

public class PublicadorEspaciosImpl implements PublicadorEspacios {

  private final ObjectMapper objectMapper;

  public PublicadorEspaciosImpl() {
    this.objectMapper = new ObjectMapper();
    this.objectMapper.registerModule(new JavaTimeModule());
    this.objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
  }

  private void sendMessage(EventoRabbit evento) throws RabbitMQException {
    try {
      Channel channel = RabbitMQInitializer.getChannel();

      if (channel == null || !channel.isOpen()) {
        throw new RabbitMQException("El canal de Rabbit no se encuentra disponible");
      }

      byte[] mensaje = objectMapper.writeValueAsBytes(evento);

      channel.basicPublish(
          EXCHANGE_NAME,
          ROUTING_KEY + evento.getTipoEvento().getNombre(),
          new AMQP.BasicProperties.Builder()
              .contentType("application/json")
              .deliveryMode(2)
              .headers(Map.of("__TypeId__", evento.getTipoEvento().getNombre()))
              .build(),
          mensaje);

    } catch (Exception e) {
      throw new RabbitMQException(
          "Error al publicar el evento de tipo " + evento.getTipoEvento().getNombre(), e);
    }
  }

  @Override
  public void publicarEspacioCreacion(EspacioFisico espacio) throws RabbitMQException {
    sendMessage(EspacioRabbitMapper.toEspacioCreacion(espacio));
  }

  @Override
  public void publicarEspacioModificacion(EspacioFisico espacio) throws RabbitMQException {
    sendMessage(EspacioRabbitMapper.toEspacioModificacion(espacio));
  }

  @Override
  public void publicarEspacioBorrado(String entidadId) throws RabbitMQException {
    sendMessage(EspacioRabbitMapper.toEspacioCerrado(entidadId));
  }

  @Override
  public void publicarEspacioActivado(String entidadId) throws RabbitMQException {
    sendMessage(EspacioRabbitMapper.toEspacioActivo(entidadId));
  }
}
