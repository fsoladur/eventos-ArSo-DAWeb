package api.rest.mapper;

import dominio.EspacioFisico;
import api.rest.DTO.EspacioFisicoDTO;

public class EspacioFisicoMapper {
	
	// EspacioFisico -> EspacioFisicoDTO
	public static EspacioFisicoDTO transformToEspacioFisicoDTO(EspacioFisico espacioFisico) {
		return new EspacioFisicoDTO(espacioFisico.getId(), espacioFisico.getNombre(), espacioFisico.getCapacidad(),
				espacioFisico.getDireccion(), espacioFisico.getEstado());
	}
	
}
