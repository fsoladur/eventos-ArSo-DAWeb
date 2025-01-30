package servicios.implementaciones;

import dominio.EspacioFisico;
import dominio.Evento;
import dominio.PuntoInteres;
import dominio.enumerados.EstadoEspacioFisico;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;
import repositorio.Repositorio;
import repositorio.RepositorioEspacioFisicoAdhoc;
import repositorio.RepositorioEventosAdhoc;
import repositorio.excepciones.EntidadNoEncontrada;
import repositorio.excepciones.RepositorioException;
import repositorio.factoria.FactoriaRepositorios;
import servicios.ServicioEspacios;
import servicios.DTO.EspacioFisicoDTO;

public class ServicioEspaciosImpl implements ServicioEspacios {

	private Repositorio<EspacioFisico, String> repositorioEspacioFisico = FactoriaRepositorios
			.getRepositorio(EspacioFisico.class);
	private RepositorioEspacioFisicoAdhoc repositorioEspacioFisicoAdhoc = FactoriaRepositorios
			.getRepositorio(EspacioFisico.class);
	private RepositorioEventosAdhoc repositorioEventosAdhoc = FactoriaRepositorios.getRepositorio(Evento.class);

	@Override
	public String darAltaEspacioFisico(String nombre, String propietario, int capacidad, String direccionPostal,
			double longitud, double latitud, String descripcion) throws RepositorioException, EntidadNoEncontrada {
		// TODO Auto-generated method stub
		// Comprobar que los parámetros no son nulos o vacíos
		if (nombre == null || nombre.isEmpty()) {
			throw new IllegalArgumentException("El nombre del espacio no puede ser nulo o vacío.");
		}

		if (propietario == null || propietario.isEmpty()) {
			throw new IllegalArgumentException("El propietario del espacio no puede ser nulo o vacío.");
		}

		if (capacidad <= 0) {
			throw new IllegalArgumentException("La capacidad del espacio debe ser mayor que 0.");
		}

		if (latitud < -90 || latitud > 90) {
			throw new IllegalArgumentException("La latitud debe estar entre -90 y 90 grados");
		}

		if (longitud < -180 || longitud > 180) {
			throw new IllegalArgumentException("La longitud debe estar entre -180 y 180 grados");
		}

		if (direccionPostal == null || direccionPostal.isEmpty()) {
			throw new IllegalArgumentException("La dirección del espacio no puede ser nula o vacía.");
		}

		if (descripcion == null || descripcion.isEmpty()) {
			throw new IllegalArgumentException("La descripción del espacio no puede ser nula o vacía.");
		}

		EspacioFisico espacioFisico = new EspacioFisico(nombre, propietario, capacidad, longitud, latitud,
				direccionPostal, descripcion);

		espacioFisico.setEstado(EstadoEspacioFisico.ACTIVO);

		return repositorioEspacioFisico.add(espacioFisico);
	}

	@Override
	public boolean asignarPuntosInteres(String idEspacio, Collection<PuntoInteres> puntosInteres)
			throws RepositorioException, EntidadNoEncontrada {

		if (idEspacio == null || idEspacio.isEmpty()) {
			throw new IllegalArgumentException("El id del espacio no puede ser nulo o vacío.");
		}

		if (puntosInteres == null || puntosInteres.isEmpty()) {
			throw new IllegalArgumentException("La colección de puntos de interés no puede ser nula o vacía.");
		}

		EspacioFisico espacioFisico = repositorioEspacioFisico.getById(idEspacio);

		espacioFisico.setPuntosInteres(new HashSet<>(puntosInteres));

		repositorioEspacioFisico.update(espacioFisico);

		return true;
	}

	@Override
	public EspacioFisicoDTO modificarEspacioFisico(String idEspacio, String nombre, String descripcion, int capacidad)
			throws RepositorioException, EntidadNoEncontrada {

		if (idEspacio == null || idEspacio.isEmpty()) {
			throw new IllegalArgumentException("El id del espacio no puede ser nulo o vacío.");
		}

		EspacioFisico espacioFisico = repositorioEspacioFisico.getById(idEspacio);

		if (nombre != null && !nombre.isEmpty()) {
			espacioFisico.setNombre(nombre);
		}

		if (descripcion != null && !descripcion.isEmpty()) {
			espacioFisico.setDescripcion(descripcion);
		}

		if (capacidad > 0) {
			espacioFisico.setCapacidad(capacidad);
		}

		repositorioEspacioFisico.update(espacioFisico);

		return transformToDTO(espacioFisico);
	}

	@Override
	public boolean darBajaEspacioFisico(String idEspacio) throws RepositorioException, EntidadNoEncontrada {

		if (idEspacio == null || idEspacio.isEmpty()) {
			throw new IllegalArgumentException("El id del espacio no puede ser nulo o vacío.");
		}

		boolean noHayOcupacion = false;

		if (repositorioEventosAdhoc.getOcupacionActivaByEspacioFisico(idEspacio).isEmpty()) {
			EspacioFisico espacioFisico = repositorioEspacioFisico.getById(idEspacio);
			espacioFisico.setEstado(EstadoEspacioFisico.CERRADO_TEMPORALMENTE);
			repositorioEspacioFisico.update(espacioFisico);
			noHayOcupacion = true;
		}

		return noHayOcupacion;
	}

	@Override
	public boolean activarEspacioFisico(String idEspacio) throws RepositorioException, EntidadNoEncontrada {
		if (idEspacio == null || idEspacio.isEmpty()) {
			throw new IllegalArgumentException("El id del espacio no puede ser nulo o vacío.");
		}

		EspacioFisico espacioFisico = repositorioEspacioFisico.getById(idEspacio);
		espacioFisico.setEstado(EstadoEspacioFisico.ACTIVO);
		repositorioEspacioFisico.update(espacioFisico);

		return true;
	}

	@Override
	public List<EspacioFisicoDTO> findEspaciosFisicosLibres(LocalDateTime fechaInicio, LocalDateTime fechaFin,
			int capacidadRequerida) throws RepositorioException, EntidadNoEncontrada {

		if (fechaInicio == null || fechaFin == null || fechaInicio.isAfter(fechaFin)) {
			throw new IllegalArgumentException(
					"Las fechas de inicio y fin no pueden ser nulas o la fecha de inicio no puede ser posterior a la de fin.");
		}
		if (capacidadRequerida <= 0) {
			throw new IllegalArgumentException("La capacidad requerida debe ser mayor que 0.");
		}

		List<EspacioFisico> listaEspacioFisicosLibres = repositorioEspacioFisicoAdhoc
				.getEspaciosFisicosDisponibles(fechaInicio, fechaFin, capacidadRequerida);

		return listaEspacioFisicosLibres.stream().map(this::transformToDTO).collect(Collectors.toList());
	}

	@Override
	public List<EspacioFisicoDTO> findEspaciosFisicosDePropietario(String propietario)
			throws RepositorioException, EntidadNoEncontrada {
		if (propietario == null || propietario.isEmpty()) {
			throw new IllegalArgumentException("El propietario no puede ser nulo o vacío.");
		}

		return repositorioEspacioFisicoAdhoc.getEspaciosFisicosByPropietario(propietario).stream()
				.map(this::transformToDTO).collect(Collectors.toList());
	}

	public EspacioFisicoDTO transformToDTO(EspacioFisico espacioFisico) {
		return new EspacioFisicoDTO(espacioFisico.getId(), espacioFisico.getNombre(), espacioFisico.getCapacidad(),
				espacioFisico.getDireccion(), espacioFisico.getEstado());
	}

}
