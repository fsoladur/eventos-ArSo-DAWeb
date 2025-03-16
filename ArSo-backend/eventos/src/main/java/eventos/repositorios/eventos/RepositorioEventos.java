package eventos.repositorios.eventos;

import eventos.dominio.Evento;
import eventos.dominio.Ocupacion;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@NoRepositoryBean
public interface RepositorioEventos extends CrudRepository<Evento, UUID> {
  public Page<Evento> getEventosPorMesYAnio(int mes, int anio, Pageable pageable);

  Optional<Ocupacion> isOcupacionActiva(UUID idEspacio);

  List<UUID> findEspaciosFisicosOcupados(
      List<UUID> ids, LocalDateTime fechaFin, LocalDateTime fechaInicio);
}
