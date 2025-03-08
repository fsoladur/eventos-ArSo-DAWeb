package servicios;

import java.util.Map;

import io.jsonwebtoken.Claims;

public interface ServicioAuth {
	
	String generarToken(Map<String, Object> claims);
	Claims validateToken(String token);

}
