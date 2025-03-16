package eventos.repositorios.eventos;

import eventos.dominio.Evento;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import eventos.dominio.Ocupacion;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioEventosJpa extends RepositorioEventos, JpaRepository<Evento, UUID> {
	// getEventos del mes
	@Query("SELECT e " + "FROM Evento e " + "WHERE e.ocupacion IS NOT NULL AND e.cancelado = FALSE "
			+ "AND FUNCTION('YEAR', e.ocupacion.fechaInicio) = :anio "
			+ "AND FUNCTION('MONTH', e.ocupacion.fechaInicio) = :mes")
	public Page<Evento> getEventosPorMesYAnio(@Param("mes") int mes,
			@Param("anio") int anio, Pageable pageable);

	// findOcupacionActivaByEspacioFisico
	@Query("SELECT e.ocupacion FROM Evento e " + "WHERE e.ocupacion.espacioFisico.id = :idEspacio "
			+ "AND e.ocupacion.fechaFin > CURRENT_TIMESTAMP")
	Optional<Ocupacion> isOcupacionActiva(@Param("idEspacio") UUID idEspacio);

	@Query(
      "SELECT ev.ocupacion.espacioFisico.id "
          + "FROM Evento ev "
          + "WHERE ev.ocupacion.espacioFisico.id IN (:ids) "
          + "AND ev.ocupacion.fechaInicio <= :fechaFin "
          + "AND ev.ocupacion.fechaFin >= :fechaInicio")
  List<UUID> findEspaciosFisicosOcupados(
	      List<UUID> ids, LocalDateTime fechaFin, LocalDateTime fechaInicio);
}
