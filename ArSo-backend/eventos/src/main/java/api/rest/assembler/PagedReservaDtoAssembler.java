package api.rest.assembler;

import org.springframework.data.web.HateoasPageableHandlerMethodArgumentResolver;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponents;

import api.rest.dto.EventoDTO;

@Component
public class PagedReservaDtoAssembler extends PagedResourcesAssembler<EventoDTO> {
    public PagedReservaDtoAssembler(HateoasPageableHandlerMethodArgumentResolver resolver, UriComponents baseUri) {
        super(resolver, baseUri);
    }
}
