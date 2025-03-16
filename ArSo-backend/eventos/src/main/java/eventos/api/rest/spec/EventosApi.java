package eventos.api.rest.spec;

import eventos.api.rest.dto.CrearEventoDto;
import eventos.api.rest.dto.EventoDTO;
import eventos.api.rest.dto.ModificarEventoDTO;
import eventos.api.rest.handler.errorDto.ErrorDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import eventos.repositorios.excepciones.EntidadNoEncontrada;

import javax.validation.Valid;

import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public interface EventosApi {

	@Operation(operationId = "darAltaEvento", summary = "Registrar un nuevo evento", description = "Crea un nuevo evento con la información proporcionada.", tags = {
			"eventos" })
	@ApiResponses({ @ApiResponse(responseCode = "201", description = "Evento creado correctamente"),
			@ApiResponse(responseCode = "400", description = "Solicitud inválida. Puede deberse a formato incorrecto en fechas, ID de espacio o categoría.", content = @Content(schema = @Schema(implementation = ErrorDto.class))),
			@ApiResponse(responseCode = "500", description = "Error interno del servidor", content = @Content(schema = @Schema(implementation = ErrorDto.class))) })
	@PostMapping("/eventos")
	public ResponseEntity<Void> darAltaEvento(
			@Valid @RequestBody @Parameter(description = "Datos para crear el evento", required = true, content = @Content(schema = @Schema(implementation = CrearEventoDto.class))) CrearEventoDto crearEventoDto)
			throws Exception;

	@Operation(operationId = "modificarEvento", summary = "Modificar un evento existente", description = "Actualiza la información de un evento, permitiendo modificar su descripción, fechas, plazas o ubicación.", tags = {
			"eventos" })
	@ApiResponses({ @ApiResponse(responseCode = "204", description = "Evento modificado correctamente"),
			@ApiResponse(responseCode = "400", description = "Solicitud inválida. Formato incorrecto en fechas o identificador.", content = @Content(schema = @Schema(implementation = ErrorDto.class))),
			@ApiResponse(responseCode = "404", description = "El evento a modificar no existe.", content = @Content(schema = @Schema(implementation = ErrorDto.class))),
			@ApiResponse(responseCode = "500", description = "Error interno del servidor", content = @Content(schema = @Schema(implementation = ErrorDto.class))) })
	@PatchMapping("/eventos/{id}")
	public ResponseEntity<Void> modificarEvento(@Parameter(description = "Identificador del evento a modificar", required = true) @PathVariable String id,
			@Valid @RequestBody @Parameter(description = "Datos del evento a modificar", required = true, content = @Content(schema = @Schema(implementation = ModificarEventoDTO.class))) ModificarEventoDTO modificarEventoDTO)
			throws Exception;

	@Operation(operationId = "cancelarEvento", summary = "Cancelar un evento", description = "Permite cancelar un evento existente mediante su identificador.", tags = {
			"eventos" })
	@ApiResponses({ @ApiResponse(responseCode = "204", description = "Evento cancelado correctamente"),
			@ApiResponse(responseCode = "400", description = "Formato de identificador no válido.", content = @Content(schema = @Schema(implementation = ErrorDto.class))),
			@ApiResponse(responseCode = "404", description = "El evento a cancelar no existe.", content = @Content(schema = @Schema(implementation = ErrorDto.class))),
			@ApiResponse(responseCode = "500", description = "Error interno del servidor", content = @Content(schema = @Schema(implementation = ErrorDto.class))) })
	@PutMapping("/eventos/{id}")
	public ResponseEntity<Void> cancelarEvento(
			@Parameter(description = "Identificador del evento a cancelar", required = true) @PathVariable String idEvento)
			throws EntidadNoEncontrada;

	@Operation(operationId = "getEventosDelMes", summary = "Obtener eventos de un mes específico", description = "Devuelve la lista de eventos programados para un mes y año determinados.", tags = {
			"eventos" })
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "Lista de eventos recuperada correctamente", content = @Content(schema = @Schema(implementation = EventoDTO.class))),
			@ApiResponse(responseCode = "400", description = "Formato de mes/año no válido.", content = @Content(schema = @Schema(implementation = ErrorDto.class))),
			@ApiResponse(responseCode = "500", description = "Error interno del servidor", content = @Content(schema = @Schema(implementation = ErrorDto.class))) })
	@GetMapping("/eventos")
	public PagedModel<EntityModel<EventoDTO>> getEventosDelMes(
			@RequestParam @Parameter(description = "Número del mes en formato MM", required = true) String mes,

			@RequestParam @Parameter(description = "Año en formato YYYY", required = true) String anio,

			Pageable pageable) throws Exception;

	@Operation(operationId = "recuperarEvento", summary = "Recuperar detalles de un evento", description = "Devuelve los datos de un evento mediante su identificador único.", tags = {
			"eventos" })
	@ApiResponses({ @ApiResponse(responseCode = "200", description = "Detalles del evento recuperados correctamente", content = @Content(schema = @Schema(implementation = EventoDTO.class))),
			@ApiResponse(responseCode = "404", description = "El evento solicitado no existe.", content = @Content(schema = @Schema(implementation = ErrorDto.class))),
			@ApiResponse(responseCode = "500", description = "Error interno del servidor", content = @Content(schema = @Schema(implementation = ErrorDto.class))) })
	@GetMapping("/eventos/{id}")
	public ResponseEntity<EventoDTO> recuperarEvento(
			@Parameter(description = "Identificador del evento a recuperar", required = true) @PathVariable String id)
			throws EntidadNoEncontrada;
}
