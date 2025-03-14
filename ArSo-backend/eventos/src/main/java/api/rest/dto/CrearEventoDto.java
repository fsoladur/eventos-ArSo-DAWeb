package api.rest.dto;

import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO para la cración de un evento")
public class CrearEventoDto {
	
	@Schema(description = "Nombre del evento", example = "Concierto de rock")
	private String nombre;
	
	@Schema(description = "Descripción del evento", example = "Concierto de rock en el parque")
	private String descripcion;
	
	@Schema(description = "Organizador del evento", example = "Ayuntamiento de Madrid")
	private String organizador;
	
	@Schema(description = "Categoría del evento", example = "Música")
	private String categoria;
	
	@Schema(description = "Fecha de inicio del evento", example = "2021-06-01T20:00:00")
	private String fechaInicio;
	
	@Schema(description = "Fecha de fin del evento", example = "2021-06-01T22:00:00")
	private String fechaFin;
	
    @Schema(description = "Número de plazas disponibles", example = "100")
	private int plazas;
    
    @Schema(description = "Identificador del espacio físico donde se realizará el evento", example = "123e4567-e89b-12d3-a456-426614174000")
	private String idEspacioFisico;

	public CrearEventoDto(String nombre, String descripcion, String organizador, String categoria, String fechaInicio,
			String fechaFin, int plazas, String idEspacioFisico) {
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

	public String getIdEspacioFisico() {
		return idEspacioFisico;
	}

	public void setIdEspacioFisico(String idEspacioFisico) {
		this.idEspacioFisico = idEspacioFisico;
	}

}
