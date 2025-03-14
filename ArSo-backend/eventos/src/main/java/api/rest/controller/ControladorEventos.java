package api.rest.controller;

import api.rest.assembler.EventoDtoAssembler;
import api.rest.assembler.PagedReservaDtoAssembler;
import api.rest.dto.CrearEventoDto;
import api.rest.dto.EventoDTO;
import api.rest.dto.ModificarEventoDTO;
import api.rest.mapper.EventoMapper;
import api.rest.spec.EventosApi;
import dominio.Evento;
import dominio.enumerados.Categoria;
import repositorios.excepciones.EntidadNoEncontrada;

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

import servicios.ServicioEventos;

@RestController
@RequestMapping("/api")
public class ControladorEventos implements EventosApi {

	private final ServicioEventos servicioEventos;
	private final EventoDtoAssembler reservaDtoAssembler;
	private final PagedReservaDtoAssembler pagedResourcesAssembler;

	public ControladorEventos(ServicioEventos servicioReservas, EventoDtoAssembler reservaDtoAssembler,
			PagedReservaDtoAssembler pagedResourcesAssembler) {
		this.servicioEventos = servicioReservas;
		this.reservaDtoAssembler = reservaDtoAssembler;
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
	public ResponseEntity<Void> modificarEvento(@Valid @RequestBody ModificarEventoDTO modificarEventoDTO) throws Exception {
		
		LocalDateTime fechaInicioParse = null, fechaFinParse = null;
		UUID id = null, idEspacio = null;
		try {
			if(modificarEventoDTO.getFechaInicio() != null)
				fechaInicioParse = LocalDateTime.parse(modificarEventoDTO.getFechaInicio());
			if(modificarEventoDTO.getFechaFin() != null)
				fechaFinParse = LocalDateTime.parse(modificarEventoDTO.getFechaFin());
			if(modificarEventoDTO.getIdEspacioFisico() != null)
				idEspacio = UUID.fromString(modificarEventoDTO.getId());
			
			id = UUID.fromString(modificarEventoDTO.getId());
			
		} catch (Exception e) {
			if (fechaInicioParse == null || fechaFinParse == null)
				throw new IllegalArgumentException("Formato de fecha no válida");
			throw new IllegalArgumentException("Fórmato de id no válido");
		}
		
		this.servicioEventos.modificarEvento(id, modificarEventoDTO.getDescripcion(), fechaInicioParse, 
				fechaFinParse, modificarEventoDTO.getPlazas(), idEspacio);
		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/eventos/{id}")
	public ResponseEntity<Void> cancelarEvento(@PathVariable String idEvento) throws EntidadNoEncontrada
	{
		UUID id = null;
		try {
			id = UUID.fromString(idEvento);
		} catch (Exception e) {
			throw new IllegalArgumentException("Fórmato de id no válido");
		}

		this.servicioEventos.cancelarEvento(id);

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
		
		
		return this.pagedResourcesAssembler.toModel(this.servicioEventos.getEventosDelMes(yearMonth, pageable),reservaDtoAssembler);
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
