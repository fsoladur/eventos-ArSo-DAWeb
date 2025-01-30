package repositorio;

import dominio.EspacioFisico;
import dominio.enumerados.EstadoEspacioFisico;
import org.eclipse.persistence.config.HintValues;
import org.eclipse.persistence.config.QueryHints;
import repositorio.excepciones.EntidadNoEncontrada;
import repositorio.excepciones.RepositorioException;
import utils.EntityManagerHelper;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.time.LocalDateTime;
import java.util.List;

public class RepositorioEspacioFisicoAdhocJPA extends RepositorioEspaciosFisicosJPA implements RepositorioEspacioFisicoAdhoc{
  @Override
  public List<EspacioFisico> getEspaciosFisicosDisponibles(LocalDateTime fechaInicio, LocalDateTime fechaFin, long capacidadMinima) throws RepositorioException, EntidadNoEncontrada {
    EntityManager em =  EntityManagerHelper.getEntityManager();

    // TODO este método actualmente no es válido puesto que requiere comunicación entre los microservicios
    // y todavía no tenemos la interfaz REST para ello
    String queryString = "SELECT e " +
            " FROM EspacioFisico e " +
            "WHERE e.capacidad >= :capacidadMinima "+
            "AND e.estado = :estado " +
            "AND NOT EXISTS (" +
                  "SELECT ev " +
                  "FROM Evento ev " +
                  "WHERE ev.ocupacion.espacioFisico.id = e.id " +
                  "AND ev.ocupacion.fechaInicio <= :fechaFin " +
                  "AND ev.ocupacion.fechaFin >= :fechaInicio)";

    Query query = em.createQuery(queryString);
    query.setHint(QueryHints.REFRESH, HintValues.TRUE);
    query.setParameter("capacidadMinima", capacidadMinima);
    query.setParameter("estado", EstadoEspacioFisico.ACTIVO);
    query.setParameter("fechaInicio", fechaInicio);
    query.setParameter("fechaFin", fechaFin);

    return query.getResultList();
  }
  
  @Override
	public List<EspacioFisico> getEspaciosFisicosByPropietario(String propietario) throws RepositorioException {
		EntityManager em = EntityManagerHelper.getEntityManager();

		String queryString = "SELECT e " + " FROM EspacioFisico e " + "WHERE e.propietario = :propietario ";

		Query query = em.createQuery(queryString);
		query.setHint(QueryHints.REFRESH, HintValues.TRUE);
		query.setParameter("propietario", propietario);

		return query.getResultList();
	}
}
