package repositorios.eventos;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import dominio.Evento;

import java.util.List;
import java.util.UUID;

@NoRepositoryBean
public interface RepositorioEventosMongoDB
    extends RepositorioEventos, MongoRepository<Evento, UUID> {
  @Query(
      "{'ocupacion': {$exists: true}, "
          + "'cancelado': false, "
          + "$expr: {$and:["
          + "{$eq: [ { $year: '$ocupacion.fechaInicio'},?0]}, "
          + "{$eq: [ { $month: '$ocupacion.fechaInicio' },?1]}]}}")
  public List<Evento> findByOcupacionIsNotNullAndCanceladoFalseAndMesAndAnio(int mes, int anio);
}
