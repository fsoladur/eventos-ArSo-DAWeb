package infraestructura.api.rest.handler;

import infraestructura.externalAPIs.rabbitMQ.excepciones.RabbitMQException;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

public class TratamientoRabbitMQException implements ExceptionMapper<RabbitMQException> {
  @Override
  public Response toResponse(RabbitMQException exception) {
    return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
        .entity(exception.getMessage())
        .build();
  }
}
