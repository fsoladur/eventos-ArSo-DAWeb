package externalAPIs.eventosAPI.dto;

public class EventoDTO {
	private String nombre;
	private String descripcion;
	private String organizador;
	private String categoria;
	private String fechaInicio;
	private String fechaFin;
	private int plazas;
	private String idEspacioFisico;
	
	public EventoDTO(String nombre, String descripcion, String organizador, String categoria, String fechaInicio,
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
	
	public EventoDTO() {}
	
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
