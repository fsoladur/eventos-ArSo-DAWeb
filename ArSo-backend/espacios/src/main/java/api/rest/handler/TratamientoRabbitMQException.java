package api.rest.handler;

import externalAPIs.rabbitMQ.excepciones.RabbitMQException;
import repositorio.excepciones.EntidadNoEncontrada;

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
