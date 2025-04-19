package arso.servicios.implementaciones;

import arso.api.rest.auth.config.SecretConfig;
import arso.dominio.Usuario;
import arso.servicios.ServicioAuth;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.Cookie;
import org.springframework.stereotype.Service;

@Service
public class ServicioAuthImpl implements ServicioAuth {

  private final String secreto;
  private static final long TIEMPO = 3600;
  private Map<String, Usuario> usuarios;

  public ServicioAuthImpl(SecretConfig secretConfig) {
    // Crear usuarios estáticos
    crearUsuarios();
    secreto = secretConfig.getKey();
  }

  @Override
  public String generarToken(Map<String, Object> claims) {

    Date caducidad = Date.from(Instant.now().plusSeconds(TIEMPO));

    return Jwts.builder()
        .setClaims(claims)
        .signWith(SignatureAlgorithm.HS256, secreto)
        .setExpiration(caducidad)
        .compact();
  }

  @Override
  public Claims validateToken(String token) {
    Claims claims = Jwts.parser().setSigningKey(secreto).parseClaimsJws(token).getBody();
    return claims;
  }

  @Override
  public Usuario getUsuario(String username) {
    return usuarios.get(username);
  }

  @Override
  public Usuario comprobarCredenciales(String username, String password) {
      Usuario usuario = usuarios.get(username);
      return (usuario != null && usuario.getPassword().equals(password)) ? usuario : null;
  }

  public Cookie generarCookie(String token) {
    Cookie cookie = new Cookie("jwt", token);
    cookie.setMaxAge((int) TIEMPO);
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    return cookie;
  }

  private void crearUsuarios() {
    usuarios = new HashMap<String, Usuario>();
    // usuario con rol GESTOR_EVENTOS
    Usuario u1 = new Usuario("gestor", "gestor", "GESTOR_EVENTOS","PROPIETARIO_ESPACIOS");
    usuarios.put(u1.getUsername(), u1);

    // usuario con rol USUARIO
    Usuario u2 = new Usuario("usuario", "usuario", "USUARIO");
    usuarios.put(u2.getUsername(), u2);
  }
}
