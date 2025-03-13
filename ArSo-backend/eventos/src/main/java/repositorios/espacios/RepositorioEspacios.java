package repositorios.espacios;

import dominio.EspacioFisico;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.CrudRepositoryExtensionsKt;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.UUID;

@NoRepositoryBean
public interface RepositorioEspacios extends CrudRepository<EspacioFisico, UUID> {}
