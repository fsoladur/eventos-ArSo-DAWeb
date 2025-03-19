package reservas.infraestructura.api.rest.dto.out;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

@Schema(description = "DTO de una reserva dentro del microservicio.")
public class ReservaDto {

  @Schema(
      description = "Identificador único de la reserva.",
      example = "123e4567-e89b-12d3-a456-426614174000") 
  private final UUID id;

  @Schema(
      description = "Identificador del usuario que realizó la reserva.",
      example = "987e6543-b21a-34c7-d890-56781234abcd")
  private final UUID idUsuario;

  @Schema(description = "Número de plazas reservadas por el usuario.", example = "3")
  private final int plazasReservadas;

  @Schema(
      description = "Identificador del evento al que pertenece la reserva.",
      example = "456f7890-c12d-45e6-b678-123456abcdef")
  private final UUID idEvento;

  public ReservaDto(UUID id, UUID idUsuario, int plazasReservadas, UUID idEvento) {
    this.id = id;
    this.idUsuario = idUsuario;
    this.plazasReservadas = plazasReservadas;
    this.idEvento = idEvento;
  }

  public UUID getId() {
    return id;
  }

  public UUID getIdUsuario() {
    return idUsuario;
  }

  public int getPlazasReservadas() {
    return plazasReservadas;
  }

  public UUID getIdEvento() {
    return idEvento;
  }
}
