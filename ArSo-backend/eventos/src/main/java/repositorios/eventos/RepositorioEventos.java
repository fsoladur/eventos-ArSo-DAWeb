package repositorios.eventos;

import dominio.Evento;
import dominio.Ocupacion;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@NoRepositoryBean
public interface RepositorioEventos extends CrudRepository<Evento, UUID> {
  public List<Evento> findByOcupacionIsNotNullAndCanceladoFalseAndMesAndAnio(int mes, int anio);

  Optional<Ocupacion> findOcupacionActivaByEspacioFisico(UUID idEspacio);

  List<Evento> findEspaciosFisicosOcupados(
      List<UUID> ids, LocalDateTime fechaFin, LocalDateTime fechaInicio);
}
