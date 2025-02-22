package servicios;

import dominio.Evento;
import dominio.enumerados.Categoria;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

import org.springframework.dao.DataAccessException;
import repositorios.excepciones.EntidadNoEncontrada;
import api.rest.dto.EventoResumenDTO;

import javax.persistence.EntityNotFoundException;

public interface ServicioEventos {

  /**
   * Da de alta un evento en el sistema. - ruta de acceso: "/eventos" - método: POST - parámetros:
   * nombre, descripción, organizador, categoría, fechaInicio, fechaFin, plazas, idEspacioFisico -
   * respuesta: 201 CREATED, body: idEvento o el evento completo + cabecera location con la URI del
   * evento creado
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
      throws EntidadNoEncontrada;

  /**
   * - ruta de acceso: "/eventos/{idEvento}" - método: PATCH - parámetros: descripción, fechaInicio,
   * fechaFin, plazas, idEspacioFisico - respuesta: 204 NO CONTENT
   */
  Evento modificarEvento(
      final String idEvento,
      final String descripcion,
      final LocalDateTime fechaInicio,
      final LocalDateTime fechaFin,
      final int plazas,
      final String idEspacioFisico)
      throws EntidadNoEncontrada;

  /**
   * - ruta de acceso: "/eventos/{idEvento}/ocupacion" - método: PUT - cuerpo: -- - respuesta: 204
   * NO CONTENT
   */
  boolean cancelarEvento(final String idEvento) throws EntidadNoEncontrada;

  /**
   * - ruta de acceso: "/eventos?mes={mes}" - método: GET - respuesta: 200 OK, body: listado eventos
   */
  List<EventoResumenDTO> getEventosDelMes(YearMonth mes) throws EntidadNoEncontrada;

  /** - ruta de acceso: "/eventos/{idEvento}" - método: GET - respuesta: 200 OK, body: evento */
  Evento recuperarEvento(final String idEvento) throws EntidadNoEncontrada;

  List<Evento> recuperarEventosPorEspaciosYFecha(
      final List<String> idsEspacios, final LocalDateTime fechaInicio, final LocalDateTime fechaFin)
      throws EntidadNoEncontrada;

  boolean existeOcupacionActivaPorEspacioFisico(final String idEspacioFisico)
      throws EntidadNoEncontrada;
}
