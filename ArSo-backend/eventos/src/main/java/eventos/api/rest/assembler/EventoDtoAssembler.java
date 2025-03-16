package eventos.api.rest.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import eventos.api.rest.controller.ControladorEventos;
import eventos.api.rest.dto.out.EventoDTO;

@Component
public class EventoDtoAssembler
    implements RepresentationModelAssembler<EventoDTO, EntityModel<EventoDTO>> {
  @Override
  public EntityModel<EventoDTO> toModel(EventoDTO eventoDTO) {
    try {
      return EntityModel.of(
          eventoDTO,
          linkTo(methodOn(ControladorEventos.class).recuperarEvento(eventoDTO.getId()))
              .withSelfRel());

    } catch (Exception e) {
      return EntityModel.of(eventoDTO);
    }
  }
}
