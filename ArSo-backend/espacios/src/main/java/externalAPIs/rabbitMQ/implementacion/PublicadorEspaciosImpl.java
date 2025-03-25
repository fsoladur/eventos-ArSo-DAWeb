package externalAPIs.rabbitMQ.implementacion;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import dominio.EspacioFisico;
import externalAPIs.rabbitMQ.PublicadorEspacios;
import externalAPIs.rabbitMQ.config.RabbitConfig;
import externalAPIs.rabbitMQ.dto.out.EventoRabbit;
import externalAPIs.rabbitMQ.excepciones.RabbitMQException;
import externalAPIs.rabbitMQ.mapper.EspacioRabbitMapper;

import java.nio.charset.StandardCharsets;

import static externalAPIs.rabbitMQ.config.RabbitConfig.*;

public class PublicadorEspaciosImpl implements PublicadorEspacios {

  private final ObjectMapper objectMapper;

  public PublicadorEspaciosImpl() {
    this.objectMapper = new ObjectMapper();
    this.objectMapper.registerModule(new JavaTimeModule());
    this.objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
  }

  private void sendMessage(EventoRabbit evento) throws RabbitMQException {
    try (Connection connection = RabbitConfig.crearFactoria().newConnection();
        Channel channel = connection.createChannel()) {

      String mensaje = objectMapper.writeValueAsString(evento);

      channel.basicPublish(
          EXCHANGE_NAME,
          ROUTING_KEY + evento.getTipoEvento().getNombre(),
          new AMQP.BasicProperties.Builder().contentType("application/json").build(),
          mensaje.getBytes(StandardCharsets.UTF_8));

    } catch (Exception e) {
      throw new RabbitMQException(
          "Error al publicar el evento de tipo " + evento.getTipoEvento(), e);
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
