package eventos.servicios.implementaciones;

import eventos.dominio.EspacioFisico;
import eventos.dominio.Evento;
import eventos.dominio.enumerados.Categoria;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.*;

import eventos.dominio.enumerados.EstadoEspacioFisico;

import eventos.repositorios.eventos.RepositorioEventos;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import eventos.repositorios.espacios.RepositorioEspacios;
import eventos.repositorios.excepciones.EntidadNoEncontrada;
import eventos.api.rest.dto.out.EventoDTO;
import eventos.api.rest.mapper.EventoMapper;
import eventos.servicios.ServicioEventos;

@Service
public class ServicioEventosImpl implements ServicioEventos {

  private final RepositorioEventos repositorioEventos;
  private final RepositorioEspacios repositorioEspacios;

  public ServicioEventosImpl(
      RepositorioEventos repositorioEventos, RepositorioEspacios repositorioEspacios) {
    this.repositorioEventos = repositorioEventos;
    this.repositorioEspacios = repositorioEspacios;
  }

  @Override
  public UUID darAltaEvento(
      String nombre,
      String descripcion,
      String organizador,
      Categoria categoria,
      LocalDateTime fechaInicio,
      LocalDateTime fechaFin,
      int plazas,
      UUID idEspacioFisico)
      throws EntidadNoEncontrada {

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

    if (idEspacioFisico == null) {
      throw new IllegalArgumentException("El id del espacio físico no puede ser nulo.");
    }

    EspacioFisico espacioFisico =
        repositorioEspacios
            .findById(idEspacioFisico)
            .orElseThrow(() -> new EntidadNoEncontrada("Espacio físico no encontrado"));

    // LA CAPACIDAD TAMBIÉN ES IMPORTANTE
    if (plazas > espacioFisico.getCapacidad()) {
      throw new IllegalArgumentException(
          "El número de plazas no puede ser mayor a la capacidad del espacio físico.");
    }

    // El estado del espacio físico es crucial
    if (espacioFisico.getEstado() != EstadoEspacioFisico.ACTIVO) {
      throw new IllegalArgumentException("El espacio físico no está activo.");
    }

    Evento evento =
        new Evento(
            nombre,
            descripcion,
            organizador,
            plazas,
            fechaInicio,
            fechaFin,
            espacioFisico,
            categoria);

    return repositorioEventos.save(evento).getId();
  }

  public Evento modificarEvento(
      UUID idEvento,
      String descripcion,
      LocalDateTime fechaInicio,
      LocalDateTime fechaFin,
      int plazas,
      UUID idEspacioFisico)
      throws EntidadNoEncontrada {
    if (idEvento == null) {
      throw new IllegalArgumentException("El id del evento no puede ser nulo o vacío.");
    }

    if (plazas < 0) {
      throw new IllegalArgumentException("El número de plazas no puede ser negativo.");
    }

    Evento eventoParaModificar =
        repositorioEventos
            .findById(idEvento)
            .orElseThrow(() -> new EntidadNoEncontrada("Evento no encontrado"));

    if (descripcion != null && !descripcion.isEmpty()) {
      eventoParaModificar.setDescripcion(descripcion);
    }

    if (eventoParaModificar.getOcupacion() != null) {

      Optional<EspacioFisico> nuevoEspacioFisico =
          obtenerEspacioFisicoSiEsNecesario(idEspacioFisico);

      if (plazas > 0) {
        validarCapacidadEspacioFisico(plazas, eventoParaModificar.getEspacioFisico());
        eventoParaModificar.setPlazas(plazas);
      }

      nuevoEspacioFisico.ifPresent(
          espacioFisico -> {
            validarCapacidadEspacioFisico(
                plazas > 0 ? plazas : eventoParaModificar.getPlazas(), espacioFisico);
            eventoParaModificar.setEspacioFisico(espacioFisico);
          });

      if (fechaInicio != null
          && fechaInicio.isAfter(LocalDateTime.now())
          && eventoParaModificar.getFechaFin().isAfter(fechaInicio)) {
        eventoParaModificar.setFechaInicio(fechaInicio);
      }

      if (fechaFin != null
          && fechaFin.isAfter(LocalDateTime.now())
          && fechaFin.isAfter(eventoParaModificar.getFechaInicio())) {
        eventoParaModificar.setFechaFin(fechaFin);
      }

      repositorioEventos.save(eventoParaModificar);
    }

    return eventoParaModificar;
  }

  private Optional<EspacioFisico> obtenerEspacioFisicoSiEsNecesario(UUID idEspacioFisico)
      throws EntidadNoEncontrada {
    if (idEspacioFisico == null) {
      return Optional.empty();
    }
    return Optional.of(
        repositorioEspacios
            .findById(idEspacioFisico)
            .orElseThrow(() -> new EntidadNoEncontrada("Espacio físico no encontrado")));
  }

  private void validarCapacidadEspacioFisico(int plazas, EspacioFisico espacioFisico) {
    if (espacioFisico != null && plazas > espacioFisico.getCapacidad()) {
      throw new IllegalArgumentException(
          "El número de plazas no puede ser mayor a la capacidad del espacio físico.");
    }
  }

  @Override
  public boolean cancelarEvento(UUID idEvento) throws EntidadNoEncontrada {
    if (idEvento == null) {
      throw new IllegalArgumentException("El id del evento no puede ser nulo.");
    }

    Evento evento =
        repositorioEventos
            .findById(idEvento)
            .orElseThrow(() -> new EntidadNoEncontrada("Evento no encontrado"));

    evento.setCancelado(true);
    evento.setOcupacion(null);

    repositorioEventos.save(evento);
    return true;
  }

  @Override
  public Page<EventoDTO> getEventosDelMes(YearMonth mes, Pageable pageable)
      throws EntidadNoEncontrada {

    if (mes == null) {
      throw new IllegalArgumentException("El mes no puede ser nulo.");
    }

    if (mes.isBefore(YearMonth.now())) {
      throw new IllegalArgumentException("El mes no puede ser anterior al mes actual.");
    }
    Page<Evento> eventosDelMes =
        repositorioEventos.getEventosPorMesYAnio(mes.getMonthValue(), mes.getYear(), pageable);

    if (eventosDelMes.isEmpty()) {
      throw new EntidadNoEncontrada("No se encontraron eventos para el mes especificado");
    }

    return eventosDelMes.map(
        evento -> {
          return EventoMapper.toDTO(evento);
        });
  }

  @Override
  public Evento recuperarEvento(UUID idEvento) throws EntidadNoEncontrada {
    return repositorioEventos
        .findById(idEvento)
        .orElseThrow(() -> new EntidadNoEncontrada("Evento no encontrado"));
  }

  @Override
  public List<UUID> getEspaciosSinEventosYCapacidadSuficiente(
      final int capacidad, final LocalDateTime fechaInicio, final LocalDateTime fechaFin)
      throws EntidadNoEncontrada {

    if (fechaInicio == null || fechaFin == null) {
      throw new IllegalArgumentException("Las fechas de inicio y fin no pueden ser nulas.");
    }

    if (fechaInicio.isAfter(fechaFin)) {
      throw new IllegalArgumentException(
          "La fecha de inicio no puede ser posterior a la fecha de fin.");
    }

    return repositorioEventos.getEspaciosSinEventosYCapacidadSuficiente(
        capacidad, fechaInicio, fechaFin);
  }

  @Override
  public boolean isOcupacionActiva(UUID idEspacioFisico) throws EntidadNoEncontrada {
    if (idEspacioFisico == null) {
      throw new IllegalArgumentException("El id del espacio físico no puede ser nulo o vacío.");
    }
    return repositorioEventos.isOcupacionActiva(idEspacioFisico);
  }
}
