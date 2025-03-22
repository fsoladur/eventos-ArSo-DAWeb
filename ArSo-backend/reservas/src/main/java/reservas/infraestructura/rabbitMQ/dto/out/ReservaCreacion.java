package reservas.infraestructura.rabbitMQ.dto.out;

public class ReservaCreacion extends EventoRabbit {
  private final String idUsuario;
  private final String plazasReservadas;
  private final String idEvento;

  public ReservaCreacion(
      String idReserva, String idUsuario, String plazasReservadas, String idEvento) {
    super(TipoEvento.RESERVA_CREADA, idReserva);
    this.idUsuario = idUsuario;
    this.plazasReservadas = plazasReservadas;
    this.idEvento = idEvento;
  }

  public ReservaCreacion(
      String idReserva, String idUsuario, int plazasReservadas, String idEvento) {
    this(idReserva, idUsuario, String.valueOf(plazasReservadas), idEvento);
  }

  public String getIdUsuario() {
    return idUsuario;
  }

  public String getPlazasReservadas() {
    return plazasReservadas;
  }

  public String getIdEvento() {
    return idEvento;
  }
}
