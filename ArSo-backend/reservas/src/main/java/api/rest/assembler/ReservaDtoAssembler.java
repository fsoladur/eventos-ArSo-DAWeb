package api.rest.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import api.rest.controller.ControladorReservas;
import api.rest.dto.out.ReservaDto;
import org.springframework.data.web.HateoasPageableHandlerMethodArgumentResolver;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

@Component
public class ReservaDtoAssembler extends HateoasPageableHandlerMethodArgumentResolver
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
