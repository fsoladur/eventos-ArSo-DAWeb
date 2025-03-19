package eventos.infraestructura.rabbitMQ.dto;

import eventos.dominio.enumerados.EstadoEspacioFisico;

import java.util.UUID;

public class EspacioFisicoDto {
    private UUID id;
    private String nombre;
    private int capacidad;
    private String direccion;
    private EstadoEspacioFisicoDto estado;

    public EspacioFisicoDto() {
    }

    public EspacioFisicoDto(UUID id, String nombre, int capacidad, String direccion, EstadoEspacioFisicoDto estado) {
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

    public EstadoEspacioFisicoDto getEstado() {
        return estado;
    }
}
