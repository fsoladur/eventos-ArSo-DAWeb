package api.rest.mapper;

import api.rest.dto.out.ReservaDto;
import dominio.Reserva;

public class ReservaMapper {

  public static ReservaDto toDTO(Reserva reserva) {
    return new ReservaDto(
        reserva.getId(),
        reserva.getIdUsuario(),
        reserva.getPlazasReservadas(),
        reserva.getEvento().getId());
  }
}
