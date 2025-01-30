package servicios.DTO;

import dominio.enumerados.Categoria;
import java.time.LocalDateTime;
import java.util.List;

public class EventoResumenDTO {

  private final String nombre;
  private final String descripción;
  private final LocalDateTime fechaInicio;
  private final Categoria categoria;
  private final String nombreEspacioFisico;
  private final String direccionEspacioFisico;
  private final List<String> nombrePuntosInteresCercanos;

  public EventoResumenDTO(
      String nombre,
      String descripción,
      LocalDateTime fechaInicio,
      Categoria categoria,
      String nombreEspacioFisico,
      String direccionEspacioFisico,
      List<String> puntosInteresCercanosEvento) {
    this.nombre = nombre;
    this.descripción = descripción;
    this.fechaInicio = fechaInicio;
    this.categoria = categoria;
    this.nombreEspacioFisico = nombreEspacioFisico;
    this.direccionEspacioFisico = direccionEspacioFisico;
    this.nombrePuntosInteresCercanos = puntosInteresCercanosEvento;
  }

  // Getters
  public String getNombre() {
    return nombre;
  }

  public String getDescripción() {
    return descripción;
  }

  public Categoria getCategoria() {
    return categoria;
  }

  public String getNombreEspacioFisico() {
    return nombreEspacioFisico;
  }

  public String getDireccionEspacioFisico() {
    return direccionEspacioFisico;
  }

  public List<String> getPuntosInteresCercanosEvento() {
    return nombrePuntosInteresCercanos;
  }
}
