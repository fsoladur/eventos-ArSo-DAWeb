package servicios;

import dominio.EspacioFisico;
import dominio.Evento;
import dominio.enumerados.Categoria;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import repositorio.excepciones.EntidadNoEncontrada;
import repositorio.excepciones.RepositorioException;
import servicios.DTO.EventoResumenDTO;

public interface ServicioEventos {

  /* TODO esto se deberá sustituir por una llamada al microservicio de espacios físicos
    el cual nos devolverá una versión reducida y necesaria de los datos del espacio físico
    para poder replicar los datos en este microservicio */ /* TODO esto se deberá sustituir por una llamada al microservicio de espacios físicos
     el cual nos devolverá una versión reducida y necesaria de los datos del espacio físico
     para poder replicar los datos en este microservicio */
  String darAltaEvento(
      final String nombre,
      final String descripcion,
      final String organizador,
      final Categoria categoria,
      final LocalDateTime fechaInicio,
      final LocalDateTime fechaFin,
      final int plazas,
      final String idEspacioFisico)
      throws RepositorioException, EntidadNoEncontrada;

  Evento modificarEvento(
      final String idEvento,
      final String descripcion,
      final LocalDateTime fechaInicio,
      final LocalDateTime fechaFin,
      final int plazas,
      final EspacioFisico espacioFisico)
      throws RepositorioException, EntidadNoEncontrada;

  boolean cancelarEvento(final String idEvento) throws RepositorioException, EntidadNoEncontrada;

  List<EventoResumenDTO> getEventosDelMes(YearMonth mes)
      throws RepositorioException, EntidadNoEncontrada;
}
