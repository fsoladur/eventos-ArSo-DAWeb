package reservas.infraestructura.rabbitMQ.dto;

import java.util.UUID;

public class EventoDto {
  private UUID id;

  private String nombre;

  private String descripcion;

  private String organizador;

  private int numPlazas;

  private boolean cancelado;

  private String categoria;

  private boolean conOcupacion;

  public EventoDto() {
  }

  public EventoDto(UUID id, String nombre, String descripcion, String organizador, int numPlazas, boolean cancelado, String categoria, boolean conOcupacion) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.organizador = organizador;
    this.numPlazas = numPlazas;
    this.cancelado = cancelado;
    this.categoria = categoria;
    this.conOcupacion = conOcupacion;
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getDescripcion() {
    return descripcion;
  }

  public void setDescripcion(String descripcion) {
    this.descripcion = descripcion;
  }

  public String getOrganizador() {
    return organizador;
  }

  public void setOrganizador(String organizador) {
    this.organizador = organizador;
  }

  public int getNumPlazas() {
    return numPlazas;
  }

  public void setNumPlazas(int numPlazas) {
    this.numPlazas = numPlazas;
  }

  public boolean isCancelado() {
    return cancelado;
  }

  public void setCancelado(boolean cancelado) {
    this.cancelado = cancelado;
  }

  public String getCategoria() {
    return categoria;
  }

  public void setCategoria(String categoria) {
    this.categoria = categoria;
  }

  public boolean isConOcupacion() {
    return conOcupacion;
  }

  public void setConOcupacion(boolean conOcupacion) {
    this.conOcupacion = conOcupacion;
  }
}
