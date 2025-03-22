package reservas.infraestructura.rabbitMQ.mapper;

import reservas.dominio.Reserva;
import reservas.infraestructura.rabbitMQ.dto.out.EventoRabbit;
import reservas.infraestructura.rabbitMQ.dto.out.ReservaCreacion;

public class ReservaRabbitMapper {
  public static EventoRabbit toReservaCreada(Reserva reserva) {
    return new ReservaCreacion(
        reserva.getId().toString(),
        reserva.getIdUsuario().toString(),
        reserva.getPlazasReservadas(),
        reserva.getEvento().getId().toString());
  }
}
