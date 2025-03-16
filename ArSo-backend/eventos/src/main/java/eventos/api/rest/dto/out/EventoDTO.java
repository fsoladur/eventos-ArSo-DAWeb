package eventos.api.rest.dto.out;

import java.util.UUID;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "EventoDto", description = "Evento de la aplicación")
public class EventoDTO {

  @Schema(
      description = "Identificador del evento",
      example = "123e4567-e89b-12d3-a456-426614174000",
      required = true)
  private UUID id;

  @Schema(description = "Nombre del evento", example = "Concierto de rock", required = true)
  private String nombre;

  @Schema(
      description = "Descripción del evento",
      example = "Concierto de rock en la sala de conciertos de la ciudad",
      required = true)
  private String descripcion;

  @Schema(
      description = "Organizador del evento",
      example = "Ayuntamiento de la ciudad",
      required = true)
  private String organizador;

  @Schema(description = "Número de plazas del evento", example = "100", required = true)
  private int numPlazas;

  @Schema(description = "Indica si el evento ha sido cancelado", example = "false", required = true)
  private boolean cancelado;

  @Schema(description = "Categoría del evento", example = "Concierto", required = true)
  private String categoria;

  @Schema(description = "Indica si el evento está ocupado", example = "false", required = true)
  private boolean conOcupacion;

  public EventoDTO() {}

  public EventoDTO(
      UUID id,
      String nombre,
      String descripcion,
      String organizador,
      int numPlazas,
      boolean cancelado,
      String categoria,
      boolean ocupado) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.organizador = organizador;
    this.numPlazas = numPlazas;
    this.cancelado = cancelado;
    this.categoria = categoria;
    this.conOcupacion = ocupado;
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
