package eventos.infraestructura.externalAPIs.reservas;

import java.io.IOException;
import java.util.UUID;

public interface ReservasAPI {
    boolean validarNuevasPlazasEvento(UUID idEvento,int plazas) throws IOException;
}
