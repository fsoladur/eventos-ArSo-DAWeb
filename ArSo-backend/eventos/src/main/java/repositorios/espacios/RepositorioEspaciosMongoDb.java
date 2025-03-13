package repositorios.espacios;

import dominio.EspacioFisico;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.UUID;

@NoRepositoryBean
public interface RepositorioEspaciosMongoDb
    extends MongoRepository<EspacioFisico, UUID>, RepositorioEspacios {}
