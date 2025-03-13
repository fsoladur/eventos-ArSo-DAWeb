package repositorios.eventos;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import dominio.Evento;

import java.util.UUID;

@Repository
public interface RepositorioEventosMongodb extends RepositorioEventos, MongoRepository<Evento, UUID> {}
