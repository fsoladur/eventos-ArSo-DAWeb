package eventos.infraestructura.api.rest.mapper;

import eventos.infraestructura.api.rest.dto.out.EventoDTO;
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
    dto.setConOcupacion((evento.getOcupacion() != null) && evento.getOcupacion().isActiva());
    return dto;
  }
}
