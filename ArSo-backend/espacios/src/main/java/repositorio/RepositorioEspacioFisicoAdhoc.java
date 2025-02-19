package repositorio;

import dominio.EspacioFisico;
import java.util.List;
import java.util.stream.Collectors;
import repositorio.excepciones.EntidadNoEncontrada;
import repositorio.excepciones.RepositorioException;


public interface RepositorioEspacioFisicoAdhoc extends RepositorioString<EspacioFisico> {

  List<EspacioFisico> getEspaciosFisicosPorCapacidadYEstado(long capacidadMinima)  
		  throws RepositorioException, EntidadNoEncontrada;
  
  
  default List<EspacioFisico> getEspaciosFisicosByPropietario(String propietario) throws RepositorioException{
		return getAll().stream().filter(espacio -> espacio.getPropietario().equals(propietario))
				.collect(Collectors.toList());
  }
}
