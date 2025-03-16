package eventos;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import eventos.dominio.EspacioFisico;
import eventos.dominio.enumerados.EstadoEspacioFisico;
import eventos.repositorios.espacios.RepositorioEspaciosJpa;

@Component
public class Prueba implements CommandLineRunner {

  @Autowired private RepositorioEspaciosJpa repositorioEspaciosJpa;

  @Override
  public void run(String... args) {
    /*EspacioFisico espacio = new EspacioFisico();
    espacio.setNombre("Espacio 1");
    espacio.setCapacidad(100);
    espacio.setEstado(EstadoEspacioFisico.ACTIVO);
    espacio.setDireccion("Avenida de la Constitución, 1");
    UUID id = UUID.randomUUID();
    espacio.setId(id);
    System.out.println("Espacio fisico añadido: " + id);

    repositorioEspaciosJpa.save(espacio);

    System.out.println("Todos");
    repositorioEspaciosJpa.findAll().forEach(e -> System.out.println(e.getId()));*/

  }
}
