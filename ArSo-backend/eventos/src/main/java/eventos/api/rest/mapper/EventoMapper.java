package eventos.api.rest.mapper;

import eventos.api.rest.dto.EventoDTO;
import eventos.dominio.Evento;

public class EventoMapper {
	
	public static EventoDTO toDTO(Evento evento) {
		EventoDTO dto = new EventoDTO();
		dto.setId(evento.getId());
		dto.setNombre(evento.getNombre());
		dto.setDescripcion(evento.getDescripcion());
		dto.setOrganizador(evento.getOrganizador());
		dto.setNumPlazas(evento.getPlazas());
		dto.setCategoria(evento.getCategoria().toString());
		if(evento.getOcupacion() != null)
			dto.setOcupado(evento.getOcupacion().isActiva());
		else dto.setOcupado(false);
		return dto;
	}
	

}
