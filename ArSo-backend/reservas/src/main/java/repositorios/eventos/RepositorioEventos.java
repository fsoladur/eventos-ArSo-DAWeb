package repositorios.eventos;

import dominio.Evento;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.UUID;

@NoRepositoryBean
public interface RepositorioEventos extends CrudRepository<Evento, UUID> {}
