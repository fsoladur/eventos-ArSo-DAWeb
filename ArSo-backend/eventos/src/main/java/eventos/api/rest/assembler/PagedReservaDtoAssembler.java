package eventos.api.rest.assembler;

import org.springframework.data.web.HateoasPageableHandlerMethodArgumentResolver;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.stereotype.Component;

import eventos.api.rest.dto.EventoDTO;

@Component
public class PagedReservaDtoAssembler extends PagedResourcesAssembler<EventoDTO> {
    public PagedReservaDtoAssembler(HateoasPageableHandlerMethodArgumentResolver resolver) {
        super(resolver, null);
    }
}
