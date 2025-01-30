package servicios;

import dominio.EspacioFisico;
import dominio.PuntoInteres;
import repositorio.excepciones.EntidadNoEncontrada;
import repositorio.excepciones.RepositorioException;
import servicios.DTO.EspacioFisicoDTO;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

public interface ServicioEspacios {

	String darAltaEspacioFisico(final String nombre, final String propietario, final int capacidad,
			final String direccionPostal, final double longitud, final double latitud, final String descripcion)
			throws RepositorioException, EntidadNoEncontrada;

	boolean asignarPuntosInteres(final String idEspacio, Collection<PuntoInteres> puntosInteres)
			throws RepositorioException, EntidadNoEncontrada;

	EspacioFisicoDTO modificarEspacioFisico(final String idEspacio, final String nombre, final String descripcion,
			final int capacidad) throws RepositorioException, EntidadNoEncontrada;

	boolean darBajaEspacioFisico(final String idEspacio) throws RepositorioException, EntidadNoEncontrada;

	boolean activarEspacioFisico(final String idEspacio) throws RepositorioException, EntidadNoEncontrada;

	List<EspacioFisicoDTO> findEspaciosFisicosLibres(final LocalDateTime fechaInicio, final LocalDateTime fechaFin,
			final int capacidadRequerida) throws RepositorioException, EntidadNoEncontrada;
	
	List<EspacioFisicoDTO> findEspaciosFisicosDePropietario(final String propietario) throws RepositorioException, EntidadNoEncontrada;
}
