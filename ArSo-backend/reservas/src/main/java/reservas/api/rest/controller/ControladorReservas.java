package reservas.api.rest.controller;

import java.net.URI;
import java.util.UUID;
import javax.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import reservas.api.rest.assembler.PagedReservaDtoAssembler;
import reservas.api.rest.assembler.ReservaDtoAssembler;
import reservas.api.rest.dto.in.CrearReservaDto;
import reservas.api.rest.dto.out.ReservaDto;
import reservas.api.rest.mapper.ReservaMapper;
import reservas.api.rest.spec.ReservasApi;
import reservas.servicios.ServicioReservas;

@RestController
@RequestMapping("/api")
public class ControladorReservas implements ReservasApi {

  private final ServicioReservas servicioReservas;

  private final ReservaDtoAssembler reservaDtoAssembler;

  private final PagedReservaDtoAssembler pagedResourcesAssembler;

  public ControladorReservas(
      ServicioReservas servicioReservas,
      ReservaDtoAssembler reservaDtoAssembler,
      PagedReservaDtoAssembler pagedResourcesAssembler) {
    this.servicioReservas = servicioReservas;
    this.reservaDtoAssembler = reservaDtoAssembler;
    this.pagedResourcesAssembler = pagedResourcesAssembler;
  }

  @PostMapping("/reservas")
  public ResponseEntity<Void> crearReserva(@Valid @RequestBody CrearReservaDto crearReservaDto)
      throws Exception {
    UUID id =
        this.servicioReservas.reservar(
            UUID.fromString(crearReservaDto.getIdEvento()),
            UUID.fromString(crearReservaDto.getIdUsuario()),
            crearReservaDto.getPlazasReservadas());
    URI nuevaUri =
        ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();

    return ResponseEntity.created(nuevaUri).build();
  }

  @GetMapping("/reservas/{idReserva}")
  public EntityModel<ReservaDto> getReserva(@PathVariable UUID idReserva) throws Exception {
    return reservaDtoAssembler.toModel(ReservaMapper.toDTO(this.servicioReservas.get(idReserva)));
  }

  @GetMapping("/eventos/{idEvento}/reservas")
  public PagedModel<EntityModel<ReservaDto>> getReservas(
      @PathVariable UUID idEvento, Pageable pageable) throws Exception {
    return this.pagedResourcesAssembler.toModel(
        this.servicioReservas.getAll(idEvento, pageable).map(ReservaMapper::toDTO),
        reservaDtoAssembler);
  }
}
