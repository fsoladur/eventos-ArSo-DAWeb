package repositorios.eventos;

import dominio.Evento;
import dominio.Ocupacion;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface RepositorioEventos extends CrudRepository<Evento, String> {
  public List<Evento> findByOcupacionIsNotNullAndCanceladoFalseAndMesAndAnio(int mes, int anio);

  Optional<Ocupacion> findOcupacionActivaByEspacioFisico(String idEspacio);

  List<Evento> findEspaciosFisicosOcupados(
      List<String> ids, LocalDateTime fechaFin, LocalDateTime fechaInicio);
}
