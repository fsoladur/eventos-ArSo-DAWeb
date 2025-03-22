package reservas.servicios.implementaciones;

import java.util.UUID;
import org.springframework.stereotype.Service;
import reservas.dominio.Evento;
import reservas.dominio.Reserva;
import reservas.infraestructura.repositorios.eventos.RepositorioEventos;
import reservas.infraestructura.repositorios.excepciones.EntidadNoEncontrada;
import reservas.servicios.ServicioDespachadorEventos;

@Service
public class ServicioDespachadorEventosImpl implements ServicioDespachadorEventos {
  private final RepositorioEventos repositorioEventos;

  public ServicioDespachadorEventosImpl(RepositorioEventos repositorioEventos) {
    this.repositorioEventos = repositorioEventos;
  }

  @Override
  public void despacharCreacionEvento(UUID idEvento, int plazasDisponibles, boolean cancelado)
      throws Exception {
    this.repositorioEventos.save(new Evento(idEvento, plazasDisponibles, cancelado));
  }

  @Override
  public void despacharCancelacionEvento(UUID idEvento) throws Exception {
    Evento evento = this.repositorioEventos.findById(idEvento).orElseThrow();
    evento.setCancelado(true);
    this.repositorioEventos.save(evento);
  }

  @Override
  public void despacharModificacionEvento(UUID idEvento, int plazasDisponibles) throws Exception {
    Evento evento =
        this.repositorioEventos
            .findById(idEvento)
            .orElseThrow(
                () -> new EntidadNoEncontrada("No se ha encontrado el evento en cuestión"));

    int plazasReservadas =
        evento.getReservas().stream().mapToInt(Reserva::getPlazasReservadas).sum();

    if (plazasDisponibles < plazasReservadas) {
      throw new IllegalArgumentException(
          "No se puede reducir el número de plazas disponibles por debajo del número de plazas ya reservadas.");
    }

    evento.setPlazasDisponibles(plazasDisponibles);
    this.repositorioEventos.save(evento);
  }
}
