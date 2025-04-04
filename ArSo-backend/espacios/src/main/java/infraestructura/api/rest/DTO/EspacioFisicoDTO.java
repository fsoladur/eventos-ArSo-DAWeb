package infraestructura.api.rest.DTO;

import java.io.Serializable;
import java.util.UUID;

import dominio.enumerados.EstadoEspacioFisico;

@SuppressWarnings("serial")
public class EspacioFisicoDTO implements Serializable {
	
	private UUID id;
	private String nombre;
	private int capacidad;
	private String direccion;
	private EstadoEspacioFisico estado;
	
	
	public EspacioFisicoDTO() {}
	
	public EspacioFisicoDTO(UUID id, String nombre, int capacidad, String direccion, EstadoEspacioFisico estado) {
		this.id = id;
		this.nombre = nombre;
		this.capacidad = capacidad;
		this.direccion = direccion;
		this.estado = estado;
	}
	
	public UUID getId() {
		return id;
	}
	
	public String getNombre() {
		return nombre;
	}
	
	public int getCapacidad() {
		return capacidad;
	}
	
	public String getDireccion() {
		return direccion;
	}
	
	public EstadoEspacioFisico getEstado() {
		return estado;
	}
	
	public void setEstado(EstadoEspacioFisico estado) {
		this.estado = estado;
	}

}
