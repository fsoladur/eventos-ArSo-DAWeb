package externalAPIs.rabbitMQ.implementacion;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import dominio.EspacioFisico;
import externalAPIs.rabbitMQ.PublicadorEspacios;
import externalAPIs.rabbitMQ.dto.out.EventoRabbit;
import externalAPIs.rabbitMQ.excepciones.RabbitMQException;
import externalAPIs.rabbitMQ.mapper.EventoRabbitMapper;

import static externalAPIs.rabbitMQ.config.RabbitConfig.*;

public class PublicadorEspaciosImpl implements PublicadorEspacios {

	public void sendMessage(EventoRabbit evento) throws Exception {
		try (Connection connection = crearFactory().newConnection(); 
				Channel channel = connection.createChannel()) {

			queue(channel);
			bind(channel);
			exchange(channel);

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.registerModule(new JavaTimeModule());
			objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

			String mensaje = objectMapper.writeValueAsString(evento);

			channel.basicPublish(EXCHANGE_NAME, ROUTING_KEY + evento.getTipoEvento().getNombre(),
				new AMQP.BasicProperties.Builder()
					.contentType("application/json")
					.build(),
					mensaje.getBytes());
		}

	}

	@Override
	public void publicarEspacioCreacion(EspacioFisico espacio) throws RabbitMQException {
		EventoRabbit eventoCreacion = EventoRabbitMapper.toEventoCreacion(espacio);
		try {
			sendMessage(eventoCreacion);
		} catch (Exception e) {
			throw new RabbitMQException("Error al publicar el evento de creación", e);
		}
	}

	@Override
	public void publicarEspacioModificacion(EspacioFisico espacio) throws RabbitMQException {
		EventoRabbit eventoModificacion = EventoRabbitMapper.toEventoModificacion(espacio);
		try {
			sendMessage(eventoModificacion);
		} catch (Exception e) {
			throw new RabbitMQException("Error al publicar el evento de modificación", e);
		}
	}

	@Override
	public void publicarEspacioBorrado(String entidadId) throws RabbitMQException {
		EventoRabbit eventoBorrado = EventoRabbitMapper.toEventoBorrado(entidadId);
		try {
			sendMessage(eventoBorrado);
		} catch (Exception e) {
			throw new RabbitMQException("Error al publicar el evento de borrado", e);
		}

	}

	@Override
	public void publicarEspacioActivado(String entidadId) throws RabbitMQException {
		EventoRabbit eventoActivado = EventoRabbitMapper.toEventoActivo(entidadId);
		try {
			sendMessage(eventoActivado);
		} catch (Exception e) {
		    throw new RabbitMQException("Error al publicar el evento de activación", e);
		}

	}

}
