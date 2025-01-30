package repositorio;

import dominio.EspacioFisico;
import dominio.Evento;
import dominio.Ocupacion;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import org.eclipse.persistence.config.HintValues;
import org.eclipse.persistence.config.QueryHints;
import repositorio.excepciones.EntidadNoEncontrada;
import repositorio.excepciones.RepositorioException;
import utils.EntityManagerHelper;

public class RepositorioEventosAdHocJPA extends RepositorioEventosJPA
    implements RepositorioEventosAdhoc {

  @Override
  public List<Evento> getEventosDelMes(YearMonth mesAnio)
      throws RepositorioException, EntidadNoEncontrada {

    try {
      EntityManager em = EntityManagerHelper.getEntityManager();

      int mes = mesAnio.getMonthValue();
      int anio = mesAnio.getYear();

      String queryString =
          "SELECT e "
              + "FROM Evento e "
              + "WHERE e.ocupacion IS NOT NULL AND e.cancelado = FALSE "
              + "AND FUNCTION('YEAR', e.ocupacion.fechaInicio) = :anio "
              + "AND FUNCTION('MONTH', e.ocupacion.fechaInicio) = :mes";

      Query query = em.createQuery(queryString);
      query.setHint(QueryHints.REFRESH, HintValues.TRUE);
      query.setParameter("mes", mes);
      query.setParameter("anio", anio);

      return query.getResultList();
    } catch (Exception e) {
      throw new RepositorioException("Error al recuperar los eventos del mes ");
    } finally {
      EntityManagerHelper.closeEntityManager();
    }
  }

  @Override
  public Optional<Ocupacion> getOcupacionActivaByEspacioFisico(String idEspacio)
      throws RepositorioException, EntidadNoEncontrada {

    try {
      EntityManager em = EntityManagerHelper.getEntityManager();

      String queryString =
          "SELECT e FROM Evento e "
              + "WHERE e.ocupacion.espacioFisico.id = :idEspacio "
              + "AND e.ocupacion.fechaFin > :fechaActual";

      Query query = em.createQuery(queryString);
      query.setHint(QueryHints.REFRESH, HintValues.TRUE);
      query.setParameter("idEspacio", idEspacio);
      query.setParameter("fechaActual", LocalDateTime.now());

      List<Evento> resultados = query.getResultList();

      return resultados.isEmpty()
          ? Optional.empty()
          : Optional.ofNullable(resultados.get(0).getOcupacion());

    } catch (Exception e) {
      throw new RepositorioException("Error al recuperar los eventos y sus ocupaciones");
    } finally {
      EntityManagerHelper.closeEntityManager();
    }
  }
}
