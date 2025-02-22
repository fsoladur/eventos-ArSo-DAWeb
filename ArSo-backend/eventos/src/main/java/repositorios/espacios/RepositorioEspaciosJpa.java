package repositorios.espacios;

import dominio.EspacioFisico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioEspaciosJpa extends RepositorioEspacios, JpaRepository<EspacioFisico, String> {}
