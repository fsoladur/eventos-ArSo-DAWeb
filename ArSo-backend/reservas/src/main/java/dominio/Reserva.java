package dominio;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document(collection = "reservas")
public class Reserva {
    @Id
    private UUID id;
    private UUID idUsuario;
    private int plazasReservadas;
    @DBRef
    private Evento evento;

    public Reserva(UUID idUsuario, int plazasReservadas, Evento evento) {
        this.id = UUID.randomUUID();
        this.idUsuario = idUsuario;
        this.plazasReservadas = plazasReservadas;
        this.evento = evento;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(UUID idUsuario) {
        this.idUsuario = idUsuario;
    }

    public int getPlazasReservadas() {
        return plazasReservadas;
    }

    public void setPlazasReservadas(int plazasReservadas) {
        this.plazasReservadas = plazasReservadas;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }
}
