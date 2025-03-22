package reservas.infraestructura.rabbitMQ.dto.out;

import java.time.LocalDateTime;

public abstract class EventoRabbit {
    private final TipoEvento tipoEvento;
    private final String fechaCreacion;
    private final String EntidadId;

    protected EventoRabbit(TipoEvento tipoEvento, String EntidadId) {
        this.tipoEvento = tipoEvento;
        this.fechaCreacion = LocalDateTime.now().toString();
        this.EntidadId = EntidadId;
    }

    public TipoEvento getTipoEvento() {
        return tipoEvento;
    }

    public String getFechaCreacion() {
        return fechaCreacion;
    }

    public String getEntidadId() {
        return EntidadId;
    }
}
