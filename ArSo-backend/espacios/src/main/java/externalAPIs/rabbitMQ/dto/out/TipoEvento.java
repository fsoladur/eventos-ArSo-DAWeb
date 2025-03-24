package externalAPIs.rabbitMQ.dto.out;

public enum TipoEvento {
  EVENTO_CREADO("espacio-creado"),
  EVENTO_MODIFICADO("espacio-modificado"),
  EVENTO_CANCELADO("espacio-cancelado"),
  EVENTO_ACTIVADO("espacio-activado");

  private final String nombre;

  TipoEvento(String nombre) {
    this.nombre = nombre;
  }

  public String getNombre() {
    return nombre;
  }

  @Override
  public String toString() {
    return nombre;
  }
}
