package arso.servicios.implementaciones;

import arso.servicios.ServicioAuth;
import arso.dominio.Usuario;
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

  private static final String SECRETO = "SECRET_KEY";
  private static final long TIEMPO = 3600;
  private Map<String, Usuario> usuarios;

  public ServicioAuthImpl() {
    // Crear usuarios estáticos
    crearUsuarios();
  }

  @Override
  public String generarToken(Map<String, Object> claims) {

    Date caducidad = Date.from(Instant.now().plusSeconds(TIEMPO));

    return Jwts.builder()
        .setClaims(claims)
        .signWith(SignatureAlgorithm.HS256, SECRETO)
        .setExpiration(caducidad)
        .compact();
  }

  @Override
  public Claims validateToken(String token) {
    Claims claims = Jwts.parser().setSigningKey(SECRETO).parseClaimsJws(token).getBody();
    return claims;
  }

  @Override
  public Usuario getUsuario(String username) {
    return usuarios.get(username);
  }

  @Override
  public Usuario comprobarCredenciales(String username, String password) {
    Usuario usuario = usuarios.get(username);
    if (usuario != null && usuario.getPassword().equals(password)) {
      return usuario;
    }
    usuarios.put(
        username,
        new Usuario(username, password, "USUARIO", "GESTOR_EVENTOS", "PROPIETARIO_ESPACIOS"));
    return usuarios.get(username);
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
    Usuario u1 = new Usuario("gestor", "gestor", "GESTOR_EVENTOS");
    usuarios.put(u1.getUsername(), u1);

    // usuario con rol USUARIO
    Usuario u2 = new Usuario("usuario", "usuario", "USUARIO");
    usuarios.put(u2.getUsername(), u2);

    // usuario con rol PROPIETARIO_ESPACIOS
    Usuario u3 = new Usuario("propietario", "propietario", "PROPIETARIO_ESPACIOS");
    usuarios.put(u3.getUsername(), u3);
  }
}
