package repositorio;

import dominio.EspacioFisico;
import dominio.Evento;
import dominio.Ocupacion;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import repositorio.excepciones.EntidadNoEncontrada;
import repositorio.excepciones.RepositorioException;
import repositorio.factoria.FactoriaRepositorios;

public interface RepositorioEventosAdhoc extends RepositorioString<Evento> {

  default List<Evento> getEventosDelMes(YearMonth mes)
      throws RepositorioException, EntidadNoEncontrada {
    return getAll().stream()
        .filter(
            e ->
                e.getOcupacion() != null
                    && !e.isCancelado()
                    && YearMonth.from(e.getOcupacion().getFechaInicio()).equals(mes))
        .collect(Collectors.toList());
  }

  default Optional<Ocupacion> getOcupacionActivaByEspacioFisico(String idEspacio)
      throws RepositorioException, EntidadNoEncontrada {

    return getAll().stream()
        .filter(
            e ->
                e.getOcupacion().getEspacioFisico().getId().equals(idEspacio)
                    && e.getOcupacion().isActiva())
        .map(Evento::getOcupacion)
        .findFirst();
  }
}
