package reservas.infraestructura.rabbitMQ.implementacion;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.UUID;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import reservas.infraestructura.rabbitMQ.config.RabbitMQConfig;
import reservas.servicios.ServicioDespachadorEventos;

@Component
public class ConsumidorEventosImpl {

  private static final String BUS_EVENTOS = "bus.eventos.";
  private final ServicioDespachadorEventos servicioDespachadorEventos;
  private final ObjectMapper objectMapper;

  public ConsumidorEventosImpl(
      ServicioDespachadorEventos servicioDespachadorEventos, ObjectMapper objectMapper) {
    this.servicioDespachadorEventos = servicioDespachadorEventos;
    this.objectMapper = objectMapper;
  }

  @RabbitListener(
      queues = RabbitMQConfig.QUEUE_NAME,
      containerFactory = "manualDeserializationListenerContainerFactory")
  public void consumir(Message message) throws Exception {
    String routingKey = message.getMessageProperties().getReceivedRoutingKey();
    JsonNode jsonNode = objectMapper.readTree(message.getBody());

    UUID idEvento = UUID.fromString(jsonNode.get("entidadId").asText());
    JsonNode plazasNode = jsonNode.get("plazas");
    int plazas = plazasNode != null ? plazasNode.asInt() : 0;

    JsonNode canceladoNode = jsonNode.get("cancelado");
    boolean cancelado = canceladoNode != null && canceladoNode.asBoolean();

    switch (routingKey) {
      case BUS_EVENTOS + "evento-creado":
        servicioDespachadorEventos.despacharCreacionEvento(idEvento, plazas, cancelado);
        break;
      case BUS_EVENTOS + "evento-cancelado":
        servicioDespachadorEventos.despacharCancelacionEvento(idEvento);
        break;
      case BUS_EVENTOS + "evento-modificado":
        servicioDespachadorEventos.despacharModificacionEvento(idEvento, plazas);
        break;
      default:
        throw new IllegalStateException("Routing key no soportada: " + routingKey);
    }
  }
}
