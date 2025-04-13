package eventos.infraestructura.externalAPIs.reservas.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "api")
public class ApiConfig {
  private String reservas;

  public String getReservas() {
    return reservas;
  }

  public void setReservas(String reservas) {
    this.reservas = reservas;
  }
}
