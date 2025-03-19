package reservas.infraestructura.rabbitMQ;

import org.springframework.amqp.core.Message;

public interface ConsumidorEventos {
  void consumir(Message message) throws Exception;
}
