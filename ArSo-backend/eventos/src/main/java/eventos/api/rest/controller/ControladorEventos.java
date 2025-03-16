package eventos.api.rest.controller;

import eventos.api.rest.assembler.EventoDtoAssembler;
import eventos.api.rest.assembler.PagedReservaDtoAssembler;
import eventos.api.rest.dto.CrearEventoDto;
import eventos.api.rest.dto.EventoDTO;
import eventos.api.rest.dto.ModificarEventoDTO;
import eventos.api.rest.mapper.EventoMapper;
import eventos.api.rest.spec.EventosApi;
import eventos.dominio.Evento;
import eventos.dominio.enumerados.Categoria;
import eventos.repositorios.espacios.RepositorioEspaciosJpa;
import eventos.repositorios.excepciones.EntidadNoEncontrada;

import java.net.URI;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.UUID;
import javax.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import eventos.servicios.ServicioEventos;

@RestController
@RequestMapping("/api")
public class ControladorEventos implements EventosApi {

	private final ServicioEventos servicioEventos;
	private final EventoDtoAssembler eventoDtoAssembler;
	private final PagedReservaDtoAssembler pagedResourcesAssembler;

	public ControladorEventos(ServicioEventos servicioReservas, EventoDtoAssembler eventoDtoAssembler,
			PagedReservaDtoAssembler pagedResourcesAssembler) {
		this.servicioEventos = servicioReservas;
		this.eventoDtoAssembler = eventoDtoAssembler;
		this.pagedResourcesAssembler = pagedResourcesAssembler;
	}

	@PostMapping("/eventos")
	public ResponseEntity<Void> darAltaEvento(@Valid @RequestBody CrearEventoDto crearEventoDto) throws Exception {
		
		LocalDateTime fechaInicioParse = null, fechaFinParse = null;
		UUID idEspacio = null;
		Categoria categoria;
		try {
			fechaInicioParse = LocalDateTime.parse(crearEventoDto.getFechaInicio());
			fechaFinParse = LocalDateTime.parse(crearEventoDto.getFechaFin());
			categoria = Categoria.valueOf(crearEventoDto.getCategoria());
			idEspacio = UUID.fromString(crearEventoDto.getIdEspacioFisico());
		} catch (Exception e) {
			if(fechaInicioParse == null || fechaFinParse == null)
                throw new IllegalArgumentException("Formato de fecha no válida");
			else if(idEspacio == null)
				throw new IllegalArgumentException("Fórmato de id no válido");
            else throw new IllegalArgumentException("Formato de categoria no válida");
		}
		
		UUID id = this.servicioEventos.darAltaEvento(crearEventoDto.getNombre(), crearEventoDto.getDescripcion(),
				crearEventoDto.getOrganizador(), categoria, fechaInicioParse,
				fechaFinParse, crearEventoDto.getPlazas(), idEspacio);

		URI nuevaUri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(id).toUri();

		return ResponseEntity.created(nuevaUri).build();
	}

	@PatchMapping("/eventos/{id}")
	public ResponseEntity<Void> modificarEvento(@PathVariable String id, 
            @Valid @RequestBody ModificarEventoDTO modificarEventoDTO) throws Exception {
		
		LocalDateTime fechaInicioParse = null, fechaFinParse = null;
		UUID idEvento = null, idEspacio = null;
		try {
			if(modificarEventoDTO.getFechaInicio() != null)
				fechaInicioParse = LocalDateTime.parse(modificarEventoDTO.getFechaInicio());
			if(modificarEventoDTO.getFechaFin() != null)
				fechaFinParse = LocalDateTime.parse(modificarEventoDTO.getFechaFin());
			if(modificarEventoDTO.getIdEspacioFisico() != null)
				idEspacio = UUID.fromString(modificarEventoDTO.getIdEspacioFisico());
			
			idEvento = UUID.fromString(id);
			
		} catch (Exception e) {
			if (fechaInicioParse == null || fechaFinParse == null)
				throw new IllegalArgumentException("Formato de fecha no válida");
			throw new IllegalArgumentException("Fórmato de id no válido");
		}
		
		this.servicioEventos.modificarEvento(idEvento, modificarEventoDTO.getDescripcion(), fechaInicioParse, 
				fechaFinParse, modificarEventoDTO.getPlazas(), idEspacio);
		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/eventos/{id}")
	public ResponseEntity<Void> cancelarEvento(@PathVariable String id) throws EntidadNoEncontrada
	{
		UUID idEvento = null;
		try {
			idEvento = UUID.fromString(id);
		} catch (Exception e) {
			throw new IllegalArgumentException("Fórmato de id no válido");
		}

		this.servicioEventos.cancelarEvento(idEvento);

		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/eventos")
	public PagedModel<EntityModel<EventoDTO>> getEventosDelMes(@RequestParam String mes, @RequestParam String anio, Pageable pageable) throws Exception {
		
		YearMonth yearMonth = null;
		try{
			yearMonth = YearMonth.of(Integer.parseInt(anio), Integer.parseInt(mes));
		}catch(Exception e){
            throw new IllegalArgumentException("Formato de mes/año no válido");
        }
		
		
		return this.pagedResourcesAssembler.toModel(this.servicioEventos.getEventosDelMes(yearMonth, pageable),eventoDtoAssembler);
	}
	
	@GetMapping("/eventos/{id}")
	public ResponseEntity<EventoDTO> recuperarEvento(@PathVariable String id) throws EntidadNoEncontrada {
		
		UUID idEvento = null;
		try {
			idEvento = UUID.fromString(id);
		} catch (Exception e) {
			throw new IllegalArgumentException("Fórmato de id no válido");
		}
		Evento evento = this.servicioEventos.recuperarEvento(idEvento);
		return ResponseEntity.ok(EventoMapper.toDTO(evento));
	}

}
