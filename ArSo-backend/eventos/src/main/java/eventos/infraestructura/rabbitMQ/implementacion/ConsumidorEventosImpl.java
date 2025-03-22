package eventos.infraestructura.rabbitMQ.implementacion;

import com.fasterxml.jackson.databind.ObjectMapper;
import eventos.infraestructura.rabbitMQ.config.RabbitMQConfig;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.stereotype.Component;

@Component
public class ConsumidorEventosImpl {

  public ConsumidorEventosImpl() {}

  @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
  public void consumir(Message message) throws Exception {

  }
}
