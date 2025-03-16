package reservas.servicios.implementaciones;

import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reservas.dominio.Evento;
import reservas.dominio.Reserva;
import reservas.repositorios.eventos.RepositorioEventos;
import reservas.repositorios.excepciones.EntidadNoEncontrada;
import reservas.repositorios.reservas.RepositorioReservas;
import reservas.servicios.ServicioReservas;

@Service
public class ServicioReservasImpl implements ServicioReservas {

  private final RepositorioReservas repositorioReservas;
  private final RepositorioEventos repositorioEventos;

  public ServicioReservasImpl(
      RepositorioReservas repositorioReservas, RepositorioEventos repositorioEventos) {
    this.repositorioReservas = repositorioReservas;
    this.repositorioEventos = repositorioEventos;
  }

  @Override
  public UUID reservar(UUID idEvento, UUID idUsuario, int plazasReservadas)
      throws EntidadNoEncontrada {
    if (idEvento == null || idUsuario == null) {
      throw new IllegalArgumentException(
          "El id del evento y el id del usuario no pueden ser nulos ni estar vacios");
    }

    if (plazasReservadas <= 0) {
      throw new IllegalArgumentException("El número de plazas reservadas debe ser mayor que 0");
    }

    Evento evento =
        repositorioEventos
            .findById(idEvento)
            .orElseThrow(() -> new EntidadNoEncontrada("Evento no encontrado"));

    if (evento.getPlazasDisponibles() < plazasReservadas) {
      throw new IllegalArgumentException("No hay suficientes plazas disponibles");
    }

    Reserva reserva =
        this.repositorioReservas.save(new Reserva(idUsuario, plazasReservadas, evento));

    evento.setPlazasDisponibles(evento.getPlazasDisponibles() - plazasReservadas);
    evento.add(reserva);
    repositorioEventos.save(evento);

    return reserva.getId();
  }

  @Override
  public Reserva get(UUID idReserva) throws EntidadNoEncontrada {
    return repositorioReservas
        .findById(idReserva)
        .orElseThrow(() -> new EntidadNoEncontrada("Reserva no encontrada"));
  }

  @Override
  public Page<Reserva> getAll(UUID idEvento, Pageable pageable) throws EntidadNoEncontrada {
    if (!repositorioEventos.existsById(idEvento)) {
      throw new EntidadNoEncontrada("Evento no encontrado");
    }
    return repositorioReservas.findAllByEventoId(idEvento, pageable);
  }
}
