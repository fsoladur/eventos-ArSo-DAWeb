package eventos.api.rest.dto;

import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "ModificarEventoDTO", description = "DTO para modificar un evento existente")
public class ModificarEventoDTO {
	
	@Schema(description = "Descripción del evento", example = "Nuevo concierto en la sala principal")
	private String descripcion;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
	@Schema(description = "Fecha de inicio del evento", example = "2025-06-01T20:00:00")
	private String fechaInicio;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
	@Schema(description = "Fecha de fin del evento", example = "2025-06-01T22:00:00")
	private String fechaFin;
	
    @Schema(description = "Número de plazas disponibles", example = "200")
	private int plazas;
	
    @Pattern(
        regexp = "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$",
        message = "El ID del espacio físico debe ser un UUID válido"
    )
    @Schema(description = "Identificador del espacio físico donde se realizará el evento", example = "550e8400-e29b-41d4-a716-446655440000")
	private String idEspacioFisico;
	
	public ModificarEventoDTO(String descripcion, String organizador, String categoria, String fechaInicio,
			String fechaFin, int plazas, String idEspacioFisico) {
		this.descripcion = descripcion;
		this.fechaInicio = fechaInicio;
		this.fechaFin = fechaFin;
		this.plazas = plazas;
		this.idEspacioFisico = idEspacioFisico;
	}
	
	public ModificarEventoDTO() {}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
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
