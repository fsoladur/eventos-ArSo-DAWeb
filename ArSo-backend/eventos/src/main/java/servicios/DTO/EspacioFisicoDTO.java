package servicios.DTO;

import java.io.Serializable;

import javax.enterprise.context.SessionScoped;
import javax.inject.Named;

import dominio.enumerados.EstadoEspacioFisico;

@SuppressWarnings("serial")
public class EspacioFisicoDTO implements Serializable {
	
	private String id;
	private String nombre;
	private int capacidad;
	private String direccion;
	private EstadoEspacioFisico estado;
	
	public EspacioFisicoDTO() {}
	
	public EspacioFisicoDTO(String id, String nombre, int capacidad, String direccion, EstadoEspacioFisico estado) {
		this.id = id;
		this.nombre = nombre;
		this.capacidad = capacidad;
		this.direccion = direccion;
		this.estado = estado;
	}
	
	public String getId() {
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
