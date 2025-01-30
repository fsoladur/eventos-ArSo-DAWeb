package servicios.implementaciones;

import dominio.EspacioFisico;
import dominio.Evento;
import dominio.enumerados.Categoria;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import dominio.enumerados.EstadoEspacioFisico;
import repositorio.Repositorio;
import repositorio.RepositorioEventosAdhoc;
import repositorio.excepciones.EntidadNoEncontrada;
import repositorio.excepciones.RepositorioException;
import repositorio.factoria.FactoriaRepositorios;
import servicios.DTO.EventoResumenDTO;
import servicios.ServicioEventos;

public class ServicioEventosImpl implements ServicioEventos {

  private final Repositorio<Evento, String> repositorioEventos =
      FactoriaRepositorios.getRepositorio(Evento.class);
  private final RepositorioEventosAdhoc repositorioEventosAdhoc =
      FactoriaRepositorios.getRepositorio(Evento.class);
/*  private final Repositorio<EspacioFisico, String> repositorioEspacios =
      FactoriaRepositorios.getRepositorio(EspacioFisico.class);

      Tendrá que ser sustituido por una llamada al microservicio de espacios físicos
      */

  @Override
  public String darAltaEvento(
      String nombre,
      String descripcion,
      String organizador,
      Categoria categoria,
      LocalDateTime fechaInicio,
      LocalDateTime fechaFin,
      int plazas,
      String idEspacioFisico)
      throws RepositorioException, EntidadNoEncontrada {

    if (nombre == null || nombre.isEmpty()) {
      throw new IllegalArgumentException("El nombre del evento no puede ser nulo o vacío.");
    }

    if (descripcion == null || descripcion.isEmpty()) {
      throw new IllegalArgumentException("La descripción del evento no puede ser nula o vacía.");
    }

    if (organizador == null || organizador.isEmpty()) {
      throw new IllegalArgumentException("El organizador del evento no puede ser nulo o vacío.");
    }

    if (categoria == null) {
      throw new IllegalArgumentException("La categoría del evento no puede ser nula.");
    }

    if (fechaInicio == null || fechaFin == null) {
      throw new IllegalArgumentException(
          "Las fechas de inicio y fin del evento no pueden ser nulas.");
    }

    if (fechaInicio.isAfter(fechaFin)) {
      throw new IllegalArgumentException(
          "La fecha de inicio no puede ser posterior a la fecha de fin.");
    }

    if (plazas <= 0) {
      throw new IllegalArgumentException("El número de plazas debe ser mayor a 0.");
    }

    if (idEspacioFisico == null || idEspacioFisico.isEmpty()) {
      throw new IllegalArgumentException("El id del espacio físico no puede ser nulo.");
    }

    /* TODO esto se deberá sustituir por una llamada al microservicio de espacios físicos
     el cual nos devolverá una versión reducida y necesaria de los datos del espacio físico
     para poder replicar los datos en este microservicio */

    EspacioFisico espacioFisico = repositorioEspacios.getById(idEspacioFisico);

    // LA CAPACIDAD TAMBIÉN ES IMPORTANTE
    if (plazas > espacioFisico.getCapacidad()) {
      throw new IllegalArgumentException(
          "El número de plazas no puede ser mayor a la capacidad del espacio físico.");
    }

    // El estado del espacio físico es crucial
    if(espacioFisico.getEstado() != EstadoEspacioFisico.ACTIVO){
      throw new IllegalArgumentException("El espacio físico no está activo.");
    }

    Evento evento = new Evento(nombre, descripcion, organizador, plazas, fechaInicio, fechaFin, espacioFisico, categoria);

    return repositorioEventos.add(evento);
  }

  @Override
  public Evento modificarEvento(
      String idEvento,
      String descripcion,
      LocalDateTime fechaInicio,
      LocalDateTime fechaFin,
      int plazas,
      EspacioFisico espacioFisico)
      throws RepositorioException, EntidadNoEncontrada {

    if (idEvento == null || idEvento.isEmpty()) {
      throw new IllegalArgumentException("El id del evento no puede ser nulo o estar vacío.");
    }

    if (fechaInicio != null && fechaInicio.isBefore(LocalDateTime.now())) {
      throw new IllegalArgumentException(
          "La fecha de inicio no puede ser anterior a la fecha actual.");
    }

    if (fechaFin != null && fechaFin.isBefore(LocalDateTime.now())) {
      throw new IllegalArgumentException(
          "La fecha de fin no puede ser anterior a la fecha actual.");
    }

    if (fechaInicio != null && fechaFin != null && fechaInicio.isAfter(fechaFin)) {
      throw new IllegalArgumentException(
          "La fecha de inicio no puede ser posterior a la fecha de fin.");
    }

    if (plazas <= 0) {
      throw new IllegalArgumentException("El número de plazas debe ser mayor a 0.");
    }

    if (espacioFisico != null && plazas > espacioFisico.getCapacidad()) {
      throw new IllegalArgumentException(
          "El número de plazas no puede ser mayor a la capacidad del espacio físico.");
    }

    if(espacioFisico.getEstado() != EstadoEspacioFisico.ACTIVO){
      throw new IllegalArgumentException("El espacio físico no está activo.");
    }

    Evento eventoModificado = repositorioEventos.getById(idEvento);

    if (descripcion != null) {
      eventoModificado.setDescripcion(descripcion);
    }
    if (fechaInicio != null && fechaInicio.isBefore(eventoModificado.getFechaFin())) {
      eventoModificado.setFechaInicio(fechaInicio);
    }
    if (fechaFin != null && fechaFin.isAfter(eventoModificado.getFechaInicio())) {
      eventoModificado.setFechaFin(fechaFin);
    }

    if (plazas > 0) {
      eventoModificado.setPlazas(plazas);
    }

    // TODO comprobar si el espacio físico existe en el microservicio de espacios físicos y su versión reducida en el microservicio de eventos, faltan dos comprobaciones
    if (espacioFisico != null) {
      eventoModificado.setEspacioFisico(espacioFisico);
    }

    repositorioEventos.update(eventoModificado);

    return eventoModificado;
  }

  @Override
  public boolean cancelarEvento(String idEvento) throws RepositorioException, EntidadNoEncontrada {
    if (idEvento == null || idEvento.isEmpty()) {
      throw new IllegalArgumentException("El id del evento no puede ser nulo.");
    }

    Evento evento = repositorioEventos.getById(idEvento);

    evento.setCancelado(true);
    evento.setOcupacion(null);

    repositorioEventos.update(evento);
    return true;
  }

  @Override
  public List<EventoResumenDTO> getEventosDelMes(YearMonth mes)
      throws RepositorioException, EntidadNoEncontrada {

    if (mes == null) {
      throw new IllegalArgumentException("El mes no puede ser nulo.");
    }

    if (mes.isBefore(YearMonth.now())) {
      throw new IllegalArgumentException("El mes no puede ser anterior al mes actual.");
    }

    List<EventoResumenDTO> eventosResumen = new ArrayList<>();

    List<Evento> eventosDelMes = repositorioEventosAdhoc.getEventosDelMes(mes);

    for (Evento evento : eventosDelMes) {
      String idEspacioFisico = evento.getEspacioFisico().getId();

      // TODO habrá que sustituirlo por una llamada a la API REST
      EspacioFisico espacioFisicoEvento = repositorioEspacios.getById(idEspacioFisico);

      List<String> puntosInteresEspacioFisico = new ArrayList<>();

      if (espacioFisicoEvento.getPuntosInteres() != null) {
        puntosInteresEspacioFisico =
            espacioFisicoEvento.getPuntosInteres().stream()
                .sorted((p1, p2) -> Double.compare(p1.getDistancia(), p2.getDistancia()))
                .map(PuntoInteres::getNombre)
                .collect(Collectors.toList());
      }

      eventosResumen.add(
          new EventoResumenDTO(
              evento.getNombre(),
              evento.getDescripcion(),
              evento.getFechaInicio(),
              evento.getCategoria(),
              espacioFisicoEvento.getNombre(),
              espacioFisicoEvento.getDireccion(),
              puntosInteresEspacioFisico));
    }

    return eventosResumen;
  }
}
