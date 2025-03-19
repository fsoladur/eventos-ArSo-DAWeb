package reservas.infraestructura.repositorios.reservas;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;
import reservas.dominio.Reserva;

import java.util.UUID;

@NoRepositoryBean
public interface RepositorioReservas extends CrudRepository<Reserva, UUID>, PagingAndSortingRepository<Reserva, UUID> {
    Page<Reserva> findAllByEventoId(UUID eventoId, Pageable pageable);
}
