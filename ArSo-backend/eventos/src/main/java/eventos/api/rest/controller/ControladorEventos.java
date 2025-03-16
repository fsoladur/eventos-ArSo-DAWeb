package eventos.api.rest.controller;

import eventos.api.rest.assembler.EventoDtoAssembler;
import eventos.api.rest.assembler.PagedReservaDtoAssembler;
import eventos.api.rest.dto.in.CategoriaDTO;
import eventos.api.rest.dto.in.CrearEventoDto;
import eventos.api.rest.dto.out.EventoDTO;
import eventos.api.rest.dto.in.ModificarEventoDTO;
import eventos.api.rest.mapper.EventoMapper;
import eventos.api.rest.spec.EventosApi;
import eventos.dominio.Evento;
import eventos.dominio.enumerados.Categoria;
import eventos.repositorios.excepciones.EntidadNoEncontrada;

import java.net.URI;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.UUID;
import javax.swing.text.html.parser.Entity;
import javax.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import eventos.servicios.ServicioEventos;

@RestController
@RequestMapping("/api")
public class ControladorEventos implements EventosApi {

  private final ServicioEventos servicioEventos;
  private final EventoDtoAssembler eventoDtoAssembler;
  private final PagedReservaDtoAssembler pagedResourcesAssembler;

  public ControladorEventos(
      ServicioEventos servicioReservas,
      EventoDtoAssembler eventoDtoAssembler,
      PagedReservaDtoAssembler pagedResourcesAssembler) {
    this.servicioEventos = servicioReservas;
    this.eventoDtoAssembler = eventoDtoAssembler;
    this.pagedResourcesAssembler = pagedResourcesAssembler;
  }

  @PostMapping("/eventos")
  public ResponseEntity<Void> darAltaEvento(@Valid @RequestBody CrearEventoDto crearEventoDto)
      throws Exception {

    UUID id =
        this.servicioEventos.darAltaEvento(
            crearEventoDto.getNombre(),
            crearEventoDto.getDescripcion(),
            crearEventoDto.getOrganizador(),
            parseCategoria(crearEventoDto.getCategoria()),
            parseFecha(crearEventoDto.getFechaInicio()),
            parseFecha(crearEventoDto.getFechaFin()),
            crearEventoDto.getPlazas(),
            crearEventoDto.getIdEspacioFisico());

    URI nuevaUri =
        ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();

    return ResponseEntity.created(nuevaUri).build();
  }

  @PatchMapping("/eventos/{id}")
  public ResponseEntity<Void> modificarEvento(
      @PathVariable UUID id, @Valid @RequestBody ModificarEventoDTO modificarEventoDTO)
      throws Exception {

    LocalDateTime fechaInicio =
        (modificarEventoDTO.getFechaInicio() != null)
            ? this.parseFecha(modificarEventoDTO.getFechaInicio())
            : null;
    LocalDateTime fechaFin =
        (modificarEventoDTO.getFechaFin() != null)
            ? this.parseFecha(modificarEventoDTO.getFechaFin())
            : null;
    this.servicioEventos.modificarEvento(
        id,
        modificarEventoDTO.getDescripcion(),
        fechaInicio,
        fechaFin,
        modificarEventoDTO.getPlazas(),
        modificarEventoDTO.getIdEspacioFisico());

    return ResponseEntity.noContent().build();
  }

  @PutMapping("/eventos/{id}")
  public ResponseEntity<Void> cancelarEvento(@PathVariable UUID id) throws EntidadNoEncontrada {
    this.servicioEventos.cancelarEvento(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/eventos")
  public PagedModel<EntityModel<EventoDTO>> getEventosDelMes(
      @RequestParam String mes, @RequestParam String anio, Pageable pageable) throws Exception {

    return this.pagedResourcesAssembler.toModel(
        this.servicioEventos.getEventosDelMes(parseYearMonth(mes, anio), pageable),
        eventoDtoAssembler);
  }

  @GetMapping("/eventos/{id}")
  public EntityModel<EventoDTO> recuperarEvento(@PathVariable UUID id) throws EntidadNoEncontrada {
    return eventoDtoAssembler.toModel(EventoMapper.toDTO(this.servicioEventos.recuperarEvento(id)));
  }

  @GetMapping("/eventos/espaciosLibres")
  public ResponseEntity<List<UUID>> getEspaciosSinEventosYCapacidadSuficiente(
      @RequestParam int capacidad, @RequestParam String fechaInicio, @RequestParam String fechaFin)
      throws EntidadNoEncontrada {
    return ResponseEntity.ok(
        this.servicioEventos.getEspaciosSinEventosYCapacidadSuficiente(
            capacidad, parseFecha(fechaInicio), parseFecha(fechaFin)));
  }

  @GetMapping("/eventos/{id}/ocupacion")
  public ResponseEntity<Boolean> isOcupacionActiva(@PathVariable UUID id)
      throws EntidadNoEncontrada {
    return ResponseEntity.ok(this.servicioEventos.isOcupacionActiva(id));
  }

  private LocalDateTime parseFecha(String fecha) {
    try {
      return LocalDateTime.parse(fecha);
    } catch (DateTimeParseException e) {
      throw new IllegalArgumentException("Formato de fecha no válida: " + fecha, e);
    }
  }

  private YearMonth parseYearMonth(String mes, String anio) {
    try {
      return YearMonth.of(Integer.parseInt(anio), Integer.parseInt(mes));
    } catch (Exception e) {
      throw new IllegalArgumentException("Formato de mes/año no válido");
    }
  }

  private Categoria parseCategoria(CategoriaDTO categoria) {
    try {
      return Categoria.valueOf(categoria.name());
    } catch (Exception e) {
      throw new IllegalArgumentException("Categoría no válida");
    }
  }
}
