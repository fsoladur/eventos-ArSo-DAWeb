package reservas.repositorios.reservas;

import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import reservas.dominio.Reserva;

@Repository
public interface RepositorioReservasMongodb
    extends RepositorioReservas, MongoRepository<Reserva, UUID> {

  @Query("{ 'evento.$id': ?0 }")
  Page<Reserva> findAllByEventoId(UUID eventoId, Pageable pageable);

  /*
  @Query("{ 'evento.$id': :#{#eventoId} }")
  Page<Reserva> findByEventoId(@Param("eventoId") UUID eventoId, Pageable pageable);
  */

}
