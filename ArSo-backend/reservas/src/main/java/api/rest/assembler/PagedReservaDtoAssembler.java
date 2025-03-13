package api.rest.assembler;

import api.rest.dto.out.ReservaDto;
import org.springframework.data.web.HateoasPageableHandlerMethodArgumentResolver;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponents;

@Component
public class PagedReservaDtoAssembler extends PagedResourcesAssembler<ReservaDto> {
    public PagedReservaDtoAssembler(HateoasPageableHandlerMethodArgumentResolver resolver, UriComponents baseUri) {
        super(resolver, baseUri);
    }
}
