package api.rest.dto;



public class ModificarEventoDTO {
	
	private String id;
	private String descripcion;
	private String fechaInicio;
	private String fechaFin;
	private int plazas;
	private String idEspacioFisico;
	
	public ModificarEventoDTO(String id, String descripcion, String organizador, String categoria, String fechaInicio,
			String fechaFin, int plazas, String idEspacioFisico) {
		this.id = id;
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
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	
	
}
