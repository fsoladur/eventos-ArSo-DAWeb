package repositorio;

import dominio.EspacioFisico;
import dominio.enumerados.EstadoEspacioFisico;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import repositorio.excepciones.EntidadNoEncontrada;
import repositorio.excepciones.RepositorioException;
import repositorio.factoria.FactoriaRepositorios;

public interface RepositorioEspacioFisicoAdhoc extends RepositorioString<EspacioFisico> {

  /*default List<EspacioFisico> getEspaciosFisicosDisponibles(
      LocalDateTime fechaInicio, LocalDateTime fechaFin, long capacidadMinima)
      throws RepositorioException, EntidadNoEncontrada {

    Repositorio<Evento, String> repositorioEvento =
        FactoriaRepositorios.getRepositorio(Evento.class);

    List<EspacioFisico> listaEspaciosActivosConCapacidadSuficiente =
        getAll().stream()
            .filter(espacio -> espacio.getCapacidad() >= capacidadMinima)
            .filter(espacio -> espacio.getEstado().equals(EstadoEspacioFisico.ACTIVO))
            .collect(Collectors.toList());

    return listaEspaciosActivosConCapacidadSuficiente.stream()
            .filter(espacio -> {
              try {
                return repositorioEvento.getAll().stream()
                        .allMatch(evento ->
                                           !evento.getOcupacion().getEspacioFisico().getId().equals(espacio.getId())
                                        || evento.getOcupacion().getFechaInicio().isAfter(fechaFin)
                                        || evento.getOcupacion().getFechaFin().isBefore(fechaInicio));
              } catch (RepositorioException e) {
                throw new RuntimeException(e);
              }
            })
            .collect(Collectors.toList());
    
    //TODO: obtener los espacios fisicos ocupados y filtrar
  }*/
  
  default List<EspacioFisico> getEspaciosFisicosByPropietario(String propietario) throws RepositorioException{
		return getAll().stream().filter(espacio -> espacio.getPropietario().equals(propietario))
				.collect(Collectors.toList());
  }
}
