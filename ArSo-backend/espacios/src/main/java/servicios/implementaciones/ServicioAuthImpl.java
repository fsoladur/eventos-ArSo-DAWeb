package servicios.implementaciones;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import servicios.ServicioAuth;

public class ServicioAuthImpl implements ServicioAuth {

  private static final String SECRETO = "SECRET_KEY";
  private static final long TIEMPO = 3600;

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
}
