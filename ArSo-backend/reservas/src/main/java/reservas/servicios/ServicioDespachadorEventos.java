package reservas.servicios;

import java.util.UUID;

public interface ServicioDespachadorEventos {
  void despacharCreacionEvento(UUID idEvento, int plazasDisponibles, boolean cancelado)
      throws Exception;

  void despacharCancelacionEvento(UUID idEvento) throws Exception;

  void despacharModificacionEvento(UUID idEvento, int plazasDisponibles)
      throws Exception;
}
