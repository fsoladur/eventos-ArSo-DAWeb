package reservas.infraestructura.api.rest.mapper;

import reservas.infraestructura.api.rest.dto.out.ReservaDto;
import reservas.dominio.Reserva;

public class ReservaMapper {

  public static ReservaDto toDTO(Reserva reserva) {
    return new ReservaDto(
        reserva.getId(),
        reserva.getIdUsuario(),
        reserva.getPlazasReservadas(),
        reserva.getEvento().getId());
  }
}
