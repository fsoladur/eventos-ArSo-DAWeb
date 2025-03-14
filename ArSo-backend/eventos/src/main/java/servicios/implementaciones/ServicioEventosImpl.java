package servicios.implementaciones;

import dominio.EspacioFisico;
import dominio.Evento;
import dominio.enumerados.Categoria;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.*;

import dominio.enumerados.EstadoEspacioFisico;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import repositorios.espacios.RepositorioEspacios;
import repositorios.eventos.RepositorioEventos;
import repositorios.excepciones.EntidadNoEncontrada;
import api.rest.dto.EventoDTO;
import api.rest.dto.EventoDTO;
import servicios.ServicioEventos;

@Service
public class ServicioEventosImpl implements ServicioEventos {

	private final RepositorioEventos repositorioEventos;
	private final RepositorioEspacios repositorioEspacios;

	public ServicioEventosImpl(RepositorioEventos repositorioEventos, RepositorioEspacios repositorioEspacios) {
		this.repositorioEventos = repositorioEventos;
		this.repositorioEspacios = repositorioEspacios;
	}

	@Override
	public UUID darAltaEvento(String nombre, String descripcion, String organizador, Categoria categoria,
			LocalDateTime fechaInicio, LocalDateTime fechaFin, int plazas, UUID idEspacioFisico)
			throws EntidadNoEncontrada {

		if (nombre == null || nombre.isEmpty()) {
			throw new IllegalArgumentException("El nombre del evento no puede ser nulo o vacío.");
		}

		if (descripcion == null || descripcion.isEmpty()) {
			throw new IllegalArgumentException("La descripción del evento no puede ser nula o vacía.");
		}

		if (organizador == null || organizador.isEmpty()) {
			throw new IllegalArgumentException("El organizador del evento no puede ser nulo o vacío.");
		}

		if (categoria == null) {
			throw new IllegalArgumentException("La categoría del evento no puede ser nula.");
		}

		if (fechaInicio == null || fechaFin == null) {
			throw new IllegalArgumentException("Las fechas de inicio y fin del evento no pueden ser nulas.");
		}

		if (fechaInicio.isAfter(fechaFin)) {
			throw new IllegalArgumentException("La fecha de inicio no puede ser posterior a la fecha de fin.");
		}

		if (plazas <= 0) {
			throw new IllegalArgumentException("El número de plazas debe ser mayor a 0.");
		}

		if (idEspacioFisico == null) {
			throw new IllegalArgumentException("El id del espacio físico no puede ser nulo.");
		}

		EspacioFisico espacioFisico = repositorioEspacios.findById(idEspacioFisico)
				.orElseThrow(() -> new EntidadNoEncontrada("Espacio físico no encontrado"));

		// LA CAPACIDAD TAMBIÉN ES IMPORTANTE
		if (plazas > espacioFisico.getCapacidad()) {
			throw new IllegalArgumentException(
					"El número de plazas no puede ser mayor a la capacidad del espacio físico.");
		}

		// El estado del espacio físico es crucial
		if (espacioFisico.getEstado() != EstadoEspacioFisico.ACTIVO) {
			throw new IllegalArgumentException("El espacio físico no está activo.");
		}

		Evento evento = new Evento(nombre, descripcion, organizador, plazas, fechaInicio, fechaFin, espacioFisico,
				categoria);

		return repositorioEventos.save(evento).getId();
	}

	public Evento modificarEvento(UUID idEvento, String descripcion, LocalDateTime fechaInicio, LocalDateTime fechaFin,
			int plazas, UUID idEspacioFisico) throws EntidadNoEncontrada {
		if (idEvento == null) {
			throw new IllegalArgumentException("El id del evento no puede ser nulo o vacío.");
		}

		if (plazas < 0) {
			throw new IllegalArgumentException("El número de plazas no puede ser negativo.");
		}

		Evento eventoParaModificar = repositorioEventos.findById(idEvento)
				.orElseThrow(() -> new EntidadNoEncontrada("Evento no encontrado"));

		Optional<EspacioFisico> nuevoEspacioFisico = obtenerEspacioFisicoSiEsNecesario(idEspacioFisico);

		if (plazas > 0) {
			validarCapacidadEspacioFisico(plazas, eventoParaModificar.getEspacioFisico());
			eventoParaModificar.setPlazas(plazas);
		}

		nuevoEspacioFisico.ifPresent(espacioFisico -> {
			validarCapacidadEspacioFisico(plazas > 0 ? plazas : eventoParaModificar.getPlazas(), espacioFisico);
			eventoParaModificar.setEspacioFisico(espacioFisico);
		});

		if (descripcion != null && !descripcion.isEmpty()) {
			eventoParaModificar.setDescripcion(descripcion);
		}

		if (fechaInicio != null && fechaInicio.isAfter(LocalDateTime.now())
				&& eventoParaModificar.getFechaFin().isAfter(fechaInicio)) {
			eventoParaModificar.setFechaInicio(fechaInicio);
		}

		if (fechaFin != null && fechaFin.isAfter(LocalDateTime.now())
				&& fechaFin.isAfter(eventoParaModificar.getFechaInicio())) {
			eventoParaModificar.setFechaFin(fechaFin);
		}

		return eventoParaModificar;
	}

	private Optional<EspacioFisico> obtenerEspacioFisicoSiEsNecesario(UUID idEspacioFisico) throws EntidadNoEncontrada {
		if (idEspacioFisico == null) {
			return Optional.empty();
		}
		return Optional.of(repositorioEspacios.findById(idEspacioFisico)
				.orElseThrow(() -> new EntidadNoEncontrada("Espacio físico no encontrado")));
	}

	private void validarCapacidadEspacioFisico(int plazas, EspacioFisico espacioFisico) {
		if (espacioFisico != null && plazas > espacioFisico.getCapacidad()) {
			throw new IllegalArgumentException(
					"El número de plazas no puede ser mayor a la capacidad del espacio físico.");
		}
	}

	@Override
	public boolean cancelarEvento(UUID idEvento) throws EntidadNoEncontrada {
		if (idEvento == null) {
			throw new IllegalArgumentException("El id del evento no puede ser nulo.");
		}

		Evento evento = repositorioEventos.findById(idEvento)
				.orElseThrow(() -> new EntidadNoEncontrada("Evento no encontrado"));

		evento.setCancelado(true);
		evento.setOcupacion(null);

		repositorioEventos.save(evento);
		return true;
	}

	@Override
	public Page<EventoDTO> getEventosDelMes(YearMonth mes, Pageable pageable) throws EntidadNoEncontrada {

		if (mes == null) {
			throw new IllegalArgumentException("El mes no puede ser nulo.");
		}

		if (mes.isBefore(YearMonth.now())) {
			throw new IllegalArgumentException("El mes no puede ser anterior al mes actual.");
		}

		List<EventoDTO> eventosResumen = new ArrayList<>();

		Page<Evento> eventosDelMes = repositorioEventos.getEventosPorMesYAnio(mes.getMonthValue(), mes.getYear(),
				pageable);

		
		

		/*
		 * for (Evento evento : eventosDelMes) { String idEspacioFisico =
		 * evento.getEspacioFisico().getId();
		 * 
		 * // TODO habrá que sustituirlo por una llamada a la API REST EspacioFisico
		 * espacioFisicoEvento = null;
		 * 
		 * // TODO cómo devolvemos los puntos de interés? List<String>
		 * puntosInteresEspacioFisico = new ArrayList<>(); /* if
		 * (espacioFisicoEvento.getPuntosInteres() != null) { puntosInteresEspacioFisico
		 * = espacioFisicoEvento.getPuntosInteres().stream() .sorted((p1, p2) ->
		 * Double.compare(p1.getDistancia(), p2.getDistancia()))
		 * .map(PuntoInteres::getNombre) .collect(Collectors.toList()); }
		 * 
		 * 
		 * eventosResumen.add( new EventoResumenDTO( evento.getNombre(),
		 * evento.getDescripcion(), evento.getFechaInicio(), evento.getCategoria(),
		 * espacioFisicoEvento.getNombre(), espacioFisicoEvento.getDireccion(),
		 * puntosInteresEspacioFisico)); }
		 */

		return null;
	}

	@Override
	public Evento recuperarEvento(UUID idEvento) throws EntidadNoEncontrada {
		return repositorioEventos.findById(idEvento).orElseThrow(() -> new EntidadNoEncontrada("Evento no encontrado"));
	}

	@Override
	public List<UUID> recuperarEspaciosPorRangoFechaOcupados(final List<UUID> idsEspacios,
			final LocalDateTime fechaInicio, final LocalDateTime fechaFin) throws EntidadNoEncontrada {
		if (idsEspacios == null || idsEspacios.isEmpty()) {
			throw new IllegalArgumentException("La lista de ids de espacios no puede ser nula o vacía.");
		}

		if (fechaInicio == null || fechaFin == null) {
			throw new IllegalArgumentException("Las fechas de inicio y fin no pueden ser nulas.");
		}

		if (fechaInicio.isAfter(fechaFin)) {
			throw new IllegalArgumentException("La fecha de inicio no puede ser posterior a la fecha de fin.");
		}

		return repositorioEventos.findEspaciosFisicosOcupados(idsEspacios, fechaFin, fechaInicio);
	}

	@Override
	public boolean existeOcupacionActivaPorEspacioFisico(UUID idEspacioFisico) throws EntidadNoEncontrada {
		if (idEspacioFisico == null) {
			throw new IllegalArgumentException("El id del espacio físico no puede ser nulo o vacío.");
		}
		return repositorioEventos.findOcupacionActivaByEspacioFisico(idEspacioFisico).isPresent();
	}
}
