package eventos.api.rest.dto;

import java.util.UUID;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name="CrearEventoDto", description = "DTO para la cración de un evento")
public class CrearEventoDto {
	
	@NotBlank(message = "El nombre no puede estar vacío")
	@Schema(description = "Nombre del evento", example = "Concierto de rock")
	private String nombre;
	
	@Schema(description = "Descripción del evento", example = "Concierto de rock en el parque")
	private String descripcion;
	
	@NotBlank(message = "El organizador no puede estar vacío")
	@Schema(description = "Organizador del evento", example = "Ayuntamiento de Madrid")
	private String organizador;
	
	@NotBlank(message = "La categoría no puede estar vacía")
	@Schema(description = "Categoría del evento", example = "Música")
	private String categoria;
	
	@NotNull
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
	@Schema(description = "Fecha de inicio del evento", example = "2021-06-01T20:00:00")
	private String fechaInicio;
	
	@NotNull
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
	@Schema(description = "Fecha de fin del evento", example = "2021-06-01T22:00:00")
	private String fechaFin;
	
	@NotNull(message = "El número de plazas es obligatorio")
    @Min(value = 1, message = "El número de plazas debe ser al menos 1")
    @Schema(description = "Número de plazas disponibles", example = "100")
	private int plazas;
    
    @NotNull(message = "El identificador del espacio físico es obligatorio")
    @Schema(description = "Identificador del espacio físico donde se realizará el evento", example = "123e4567-e89b-12d3-a456-426614174000")
	private UUID idEspacioFisico;

	public CrearEventoDto(String nombre, String descripcion, String organizador, String categoria, String fechaInicio,
			String fechaFin, int plazas, UUID idEspacioFisico) {
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.organizador = organizador;
		this.categoria = categoria;
		this.fechaInicio = fechaInicio;
		this.fechaFin = fechaFin;
		this.plazas = plazas;
		this.idEspacioFisico = idEspacioFisico;
	}

	public CrearEventoDto() {}

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

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public String getFechaInicio() {
		return fechaInicio;
	}

	public void setFechaInicio(String fechaInicio) {
		this.fechaInicio = fechaInicio;
	}

	public String getFechaFin() {
		return fechaFin;
	}

	public void setFechaFin(String fechaFin) {
		this.fechaFin = fechaFin;
	}

	public int getPlazas() {
		return plazas;
	}

	public void setPlazas(int plazas) {
		this.plazas = plazas;
	}

	public UUID getIdEspacioFisico() {
		return idEspacioFisico;
	}

	public void setIdEspacioFisico(UUID idEspacioFisico) {
		this.idEspacioFisico = idEspacioFisico;
	}

}
