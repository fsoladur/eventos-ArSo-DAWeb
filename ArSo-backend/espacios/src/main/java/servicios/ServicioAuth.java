package servicios;

import io.jsonwebtoken.Claims;
import java.util.Map;

public interface ServicioAuth {

  String generarToken(Map<String, Object> claims);

  Claims validateToken(String token);
}
