package arso.auth;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import arso.auth.dto.AutorizationResponseDto;
import arso.servicios.ServicioAuth;
import arso.servicios.dominio.Usuario;

@Component
public class SecuritySuccessHandler implements AuthenticationSuccessHandler{
	
	private ServicioAuth servicioAuth;
	
	public static final int JWT_TIEMPO_VALIDEZ = 3600;
	
    private final ObjectMapper objectMapper = new ObjectMapper();
	
	public SecuritySuccessHandler(ServicioAuth servicioAuth) {
		this.servicioAuth = servicioAuth;
	}
	
	@Override
    public void onAuthenticationSuccess(HttpServletRequest request,
            HttpServletResponse response, Authentication authentication) throws IOException {

        DefaultOAuth2User user = (DefaultOAuth2User) authentication.getPrincipal();

        Map<String, Object> claims = fetchUserInfo(user);
        
        Usuario usuario = servicioAuth.getUsuario(user.getAttributes().get("login").toString());

        if (claims != null) {
            // Generamos el token JWT
            String token = servicioAuth.generarToken(claims);
            
            // Construimos el DTO de respuesta
            AutorizationResponseDto responseDto = new AutorizationResponseDto(
                    usuario.getId(),
                    usuario.getUsername(),
                    usuario.getRoles(),
                    token);
            
            response.addCookie(servicioAuth.generarCookie(token));
            
            response.setContentType("application/json");
            objectMapper.writeValue(response.getWriter(), responseDto);
        }
    }

    private Map<String, Object> fetchUserInfo(DefaultOAuth2User user) {

    	String username = user.getAttributes().get("login").toString();
    	Usuario usuario = servicioAuth.comprobarCredenciales(username, "github");

        HashMap<String, Object> claims = new HashMap<String, Object>();
        claims.put("id", usuario.getId().toString());
        claims.put("sub", usuario.getUsername());
        claims.put("roles", usuario.getRoles());

        return claims;
    }
    
}
    

