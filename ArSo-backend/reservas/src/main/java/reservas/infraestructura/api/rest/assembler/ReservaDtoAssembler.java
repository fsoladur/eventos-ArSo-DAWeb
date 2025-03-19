package reservas.infraestructura.api.rest.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;
import reservas.infraestructura.api.rest.controller.ControladorReservas;
import reservas.infraestructura.api.rest.dto.out.ReservaDto;

@Component
public class ReservaDtoAssembler
    implements RepresentationModelAssembler<ReservaDto, EntityModel<ReservaDto>> {
  @Override
  public EntityModel<ReservaDto> toModel(ReservaDto reservaDto) {
    try {
      return EntityModel.of(
          reservaDto,
          linkTo(methodOn(ControladorReservas.class).getReserva(reservaDto.getId())).withSelfRel());

    } catch (Exception e) {
      return EntityModel.of(reservaDto);
    }
  }
}
