package eventos.infraestructura.rabbitMQ.eventos;

import java.time.LocalDateTime;

public class PublicacionEvento {

  private TipoEvento tipoEvento;
  private String entidadId;
  private LocalDateTime fechaCreacion;
  private Object entidad;

  public PublicacionEvento() {}

  public PublicacionEvento(String tipoEvento, String entidadId, Object datosEvento) {
    this.tipoEvento = TipoEvento.valueOf(tipoEvento);
    this.entidadId = entidadId;
    this.fechaCreacion = LocalDateTime.now();
    this.entidad = datosEvento;
  }

  public TipoEvento getTipoEvento() {
    return tipoEvento;
  }

  public LocalDateTime getFechaCreacion() {
    return fechaCreacion;
  }

  public String getEntidadId() {
    return entidadId;
  }

  public Object getEntidad() {
    return entidad;
  }

  @Override
  public String toString() {
    return "PublicacionEvento{"
        + "tipoEvento="
        + tipoEvento
        + ", entidadId='"
        + entidadId
        + '\''
        + ", datosEvento="
        + entidad
        + '}';
  }
}
