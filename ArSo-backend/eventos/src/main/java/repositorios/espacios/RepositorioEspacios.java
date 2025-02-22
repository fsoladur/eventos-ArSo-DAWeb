package repositorios.espacios;

import dominio.EspacioFisico;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.CrudRepositoryExtensionsKt;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface RepositorioEspacios extends CrudRepository<EspacioFisico, String> {}
