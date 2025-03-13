package dominio;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Document(collection = "eventos")
public class Evento {
  @Id
  private UUID id;
  private int plazasDisponibles;
  private boolean cancelado;
  @DBRef
  private List<Reserva> reservas;

  public Evento(UUID id, int plazasDisponibles, boolean cancelado) {
    this.id = id;
    this.plazasDisponibles = plazasDisponibles;
    this.cancelado = cancelado;
    this.reservas = new ArrayList<>();
  }

  public boolean add(Reserva reserva) {
    if (reserva == null) {
      throw new IllegalArgumentException("La reserva no puede ser nula");
    }
    if (this.plazasDisponibles < reserva.getPlazasReservadas()) {
      throw new IllegalArgumentException("No hay plazas disponibles");
    }
    return this.reservas.add(reserva);
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public int getPlazasDisponibles() {
    return plazasDisponibles;
  }

  public void setPlazasDisponibles(int plazasDisponibles) {
    this.plazasDisponibles = plazasDisponibles;
  }

  public boolean isCancelado() {
    return cancelado;
  }

  public void setCancelado(boolean cancelado) {
    this.cancelado = cancelado;
  }

  public List<Reserva> getReservas() {
    return Collections.unmodifiableList(reservas);
  }

  public void setReservas(List<Reserva> reservas) {
    this.reservas = reservas;
  }
}
