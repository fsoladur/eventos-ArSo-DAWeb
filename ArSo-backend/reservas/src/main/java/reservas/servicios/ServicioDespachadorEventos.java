package reservas.servicios;

import java.time.LocalDateTime;
import java.util.UUID;

public interface ServicioDespachadorEventos {
  void despacharCreacionEvento(UUID idEvento, int plazasDisponibles, boolean cancelado, LocalDateTime fechaInicio)
      throws Exception;

  void despacharCancelacionEvento(UUID idEvento) throws Exception;

  void despacharModificacionEvento(UUID idEvento, int plazasMaximasDisponibles, LocalDateTime fechaInicio)
      throws Exception;
}
