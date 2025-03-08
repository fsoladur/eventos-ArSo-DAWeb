package auth;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import servicios.ServicioAuth;
import servicios.factoria.FactoriaServicios;

@Path("auth")
public class ControladorAuth {
	
	private ServicioAuth servicioAuth;
	
	// curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "username=juan&password=clave" http://localhost:8080/api/auth/login
	@POST
	@Path("login")
	public Response login(
	@FormParam("username") String username, 
	@FormParam("password") String password) {
		
		servicioAuth = FactoriaServicios.getServicio(ServicioAuth.class);
		
		Map<String, Object> claims = verificarCredenciales(username,password);
		if (claims != null) {
			String token = servicioAuth.generarToken(claims);
			return Response.ok(token).build();
		} else {
			return Response.status(Response.Status.UNAUTHORIZED)
					.entity("Credenciales inválidas")
					.build();
		}
	}
	
	private Map<String, Object> verificarCredenciales(String username, String password) {
		
		HashMap<String, Object> claims = new HashMap<>();
		claims.put("sub", username);
		claims.put("roles", "PROPIETARIO_ESPACIOS");
		
		return claims;
	}

	

}
