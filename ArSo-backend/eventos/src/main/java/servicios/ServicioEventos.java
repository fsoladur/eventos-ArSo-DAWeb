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

  /**
    * Da de alta un evento en el sistema.
   - ruta de acceso: "/eventos"
   - método: POST
   - parámetros: nombre, descripción, organizador, categoría, fechaInicio, fechaFin, plazas, idEspacioFisico
    - respuesta: 201 CREATED, body: idEvento o el evento completo + cabecera location con la URI del evento creado
   */
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

  /**
  - ruta de acceso: "/eventos/{idEvento}"
    - método: PATCH
    - parámetros: descripción, fechaInicio, fechaFin, plazas, idEspacioFisico
    - respuesta: 204 NO CONTENT
   */
  Evento modificarEvento(
      final String idEvento,
      final String descripcion,
      final LocalDateTime fechaInicio,
      final LocalDateTime fechaFin,
      final int plazas,
      final String idEspacioFisico)
      throws RepositorioException, EntidadNoEncontrada;

  /**
  - ruta de acceso: "/eventos/{idEvento}/ocupacion"
    - método: PUT
    - cuerpo: --
    - respuesta: 204 NO CONTENT
   */
  boolean cancelarEvento(final String idEvento) throws RepositorioException, EntidadNoEncontrada;

  /**
    - ruta de acceso: "/eventos?mes={mes}"
        - método: GET
        - respuesta: 200 OK, body: listado eventos
   */
  List<EventoResumenDTO> getEventosDelMes(YearMonth mes)
      throws RepositorioException, EntidadNoEncontrada;

  /**
    - ruta de acceso: "/eventos/{idEvento}"
        - método: GET
        - respuesta: 200 OK, body: evento
   */

  // es necesario este método faltaba antes
    Evento recuperarEvento(final String idEvento) throws RepositorioException, EntidadNoEncontrada;
}
