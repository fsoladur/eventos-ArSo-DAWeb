package repositorios.eventos;

import dominio.Evento;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import dominio.Ocupacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioEventosJpa extends RepositorioEventos, JpaRepository<Evento, String> {
  // getEventos del mes
  @Query(
      "SELECT e "
          + "FROM Evento e "
          + "WHERE e.ocupacion IS NOT NULL AND e.cancelado = FALSE "
          + "AND FUNCTION('YEAR', e.ocupacion.fechaInicio) = :anio "
          + "AND FUNCTION('MONTH', e.ocupacion.fechaInicio) = :mes")
  public List<Evento> findByOcupacionIsNotNullAndCanceladoFalseAndMesAndAnio(
      @Param("mes") int mes, @Param("anio") int anio);

  // findOcupacionActivaByEspacioFisico
  @Query(
      "SELECT e.ocupacion FROM Evento e "
          + "WHERE e.ocupacion.espacioFisico.id = :idEspacio "
          + "AND e.ocupacion.fechaFin > CURRENT_TIMESTAMP")
  Optional<Ocupacion> findOcupacionActivaByEspacioFisico(@Param("idEspacio") String idEspacio);

  @Query(
      "SELECT ev "
          + "FROM Evento ev "
          + "WHERE ev.ocupacion.espacioFisico.id IN :ids "
          + "AND ev.ocupacion.fechaInicio <= :fechaFin "
          + "AND ev.ocupacion.fechaFin >= :fechaInicio")
  List<Evento> findEspaciosFisicosOcupados(
      @Param("ids") List<String> ids,
      @Param("fechaFin") LocalDateTime fechaFin,
      @Param("fechaInicio") LocalDateTime fechaInicio);
}
