package arso.api.rest.auth.config;

import arso.api.rest.auth.filter.JwtRequestFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private final JwtRequestFilter authenticationRequestFilter;
  private final SecuritySuccessHandler successHandler;

  public SecurityConfig(
      JwtRequestFilter authenticationRequestFilter, SecuritySuccessHandler successHandler) {
    this.authenticationRequestFilter = authenticationRequestFilter;
    this.successHandler = successHandler;
  }

  @Override
  public void configure(HttpSecurity httpSecurity) throws Exception {

    // configuración de seguridad
    httpSecurity
        .csrf()
        .disable()
        .httpBasic()
        .disable()
        .authorizeRequests()
        .antMatchers("/auth/**")
        .permitAll()
        .and()
        .oauth2Login()
        .successHandler(this.successHandler)
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    // Establece el filtro de autenticación en la cadena de filtros de seguridad
    httpSecurity.addFilterBefore(
        this.authenticationRequestFilter, UsernamePasswordAuthenticationFilter.class);
  }
}
