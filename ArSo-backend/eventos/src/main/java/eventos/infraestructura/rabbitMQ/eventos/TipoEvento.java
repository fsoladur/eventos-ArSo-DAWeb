package eventos.infraestructura.rabbitMQ.eventos;

public enum TipoEvento {
  ESPACIO_CREADO("espacio-creado"),
  ESPACIO_ACTUALIZADO("espacio-actualizado"),
  ESPACIO_ELIMINADO("espacio-eliminado"),
  EVENTO_CREADO("evento-creado"),
  EVENTO_ACTUALIZADO("evento-actualizado"),
  EVENTO_ELIMINADO("evento-eliminado");

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
