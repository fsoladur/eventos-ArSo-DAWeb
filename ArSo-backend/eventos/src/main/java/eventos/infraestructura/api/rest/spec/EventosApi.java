package eventos.infraestructura.api.rest.spec;

import eventos.infraestructura.api.rest.dto.in.CrearEventoDto;
import eventos.infraestructura.api.rest.dto.out.EventoDTO;
import eventos.infraestructura.api.rest.dto.in.ModificarEventoDTO;
import eventos.infraestructura.api.rest.handler.errorDto.ErrorDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import eventos.infraestructura.repositorios.excepciones.EntidadNoEncontrada;

import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public interface EventosApi {

  @Operation(
      operationId = "darAltaEvento",
      summary = "Registrar un nuevo evento",
      description = "Crea un nuevo evento con la información proporcionada.",
      tags = {"eventos"})
  @ApiResponses({
    @ApiResponse(responseCode = "201", description = "Evento creado correctamente"),
    @ApiResponse(
        responseCode = "400",
        description =
            "Solicitud inválida. Puede deberse a formato incorrecto en fechas, ID de espacio o categoría.",
        content = @Content(schema = @Schema(implementation = ErrorDto.class))),
    @ApiResponse(
        responseCode = "500",
        description = "Error interno del servidor",
        content = @Content(schema = @Schema(implementation = ErrorDto.class)))
  })
  @PostMapping("/eventos")
  public ResponseEntity<Void> darAltaEvento(
      @Valid
          @RequestBody
          @Parameter(
              description = "Datos para crear el evento",
              required = true,
              content = @Content(schema = @Schema(implementation = CrearEventoDto.class)))
          CrearEventoDto crearEventoDto)
      throws Exception;

  @Operation(
      operationId = "modificarEvento",
      summary = "Modificar un evento existente",
      description =
          "Actualiza la información de un evento, permitiendo modificar su descripción, fechas, plazas o ubicación.",
      tags = {"eventos"})
  @ApiResponses({
    @ApiResponse(responseCode = "204", description = "Evento modificado correctamente"),
    @ApiResponse(
        responseCode = "400",
        description = "Solicitud inválida. Formato incorrecto en fechas o identificador.",
        content = @Content(schema = @Schema(implementation = ErrorDto.class))),
    @ApiResponse(
        responseCode = "404",
        description = "El evento a modificar no existe.",
        content = @Content(schema = @Schema(implementation = ErrorDto.class))),
    @ApiResponse(
        responseCode = "500",
        description = "Error interno del servidor",
        content = @Content(schema = @Schema(implementation = ErrorDto.class)))
  })
  @PatchMapping("/eventos/{id}")
  public ResponseEntity<Void> modificarEvento(
      @Parameter(description = "Identificador del evento a modificar", required = true)
          @PathVariable
          UUID id,
      @Valid
          @RequestBody
          @Parameter(
              description = "Datos del evento a modificar",
              required = true,
              content = @Content(schema = @Schema(implementation = ModificarEventoDTO.class)))
          ModificarEventoDTO modificarEventoDTO)
      throws Exception;

  @Operation(
      operationId = "cancelarEvento",
      summary = "Cancelar un evento",
      description = "Permite cancelar un evento existente mediante su identificador.",
      tags = {"eventos"})
  @ApiResponses({
    @ApiResponse(responseCode = "204", description = "Evento cancelado correctamente"),
    @ApiResponse(
        responseCode = "400",
        description = "Formato de identificador no válido.",
        content = @Content(schema = @Schema(implementation = ErrorDto.class))),
    @ApiResponse(
        responseCode = "404",
        description = "El evento a cancelar no existe.",
        content = @Content(schema = @Schema(implementation = ErrorDto.class))),
    @ApiResponse(
        responseCode = "500",
        description = "Error interno del servidor",
        content = @Content(schema = @Schema(implementation = ErrorDto.class)))
  })
  @PutMapping("/eventos/{id}")
  public ResponseEntity<Void> cancelarEvento(
      @Parameter(description = "Identificador del evento a cancelar", required = true) @PathVariable
          UUID idEvento)
      throws EntidadNoEncontrada;

  @Operation(
      operationId = "getEventosDelMes",
      summary = "Obtener eventos de un mes específico",
      description = "Devuelve la lista de eventos programados para un mes y año determinados.",
      tags = {"eventos"})
  @ApiResponses({
    @ApiResponse(
        responseCode = "200",
        description = "Lista de eventos recuperada correctamente",
        content = @Content(schema = @Schema(implementation = EventoDTO.class))),
    @ApiResponse(
        responseCode = "400",
        description = "Formato de mes/año no válido.",
        content = @Content(schema = @Schema(implementation = ErrorDto.class))),
    @ApiResponse(
        responseCode = "500",
        description = "Error interno del servidor",
        content = @Content(schema = @Schema(implementation = ErrorDto.class)))
  })
  @GetMapping("/eventos")
  public PagedModel<EntityModel<EventoDTO>> getEventosDelMes(
      @RequestParam @Parameter(description = "Número del mes en formato MM", required = true)
          String mes,
      @RequestParam @Parameter(description = "Año en formato YYYY", required = true) String anio,
      Pageable pageable)
      throws Exception;

  @Operation(
      operationId = "recuperarEvento",
      summary = "Recuperar detalles de un evento",
      description = "Devuelve los datos de un evento mediante su identificador único.",
      tags = {"eventos"})
  @ApiResponses({
    @ApiResponse(
        responseCode = "200",
        description = "Detalles del evento recuperados correctamente",
        content = @Content(schema = @Schema(implementation = EventoDTO.class))),
    @ApiResponse(
        responseCode = "404",
        description = "El evento solicitado no existe.",
        content = @Content(schema = @Schema(implementation = ErrorDto.class))),
    @ApiResponse(
        responseCode = "500",
        description = "Error interno del servidor",
        content = @Content(schema = @Schema(implementation = ErrorDto.class)))
  })
  @GetMapping("/eventos/{id}")
  public EntityModel<EventoDTO> recuperarEvento(
      @PathVariable
          @Parameter(
              description = "Identificador del evento a recuperar",
              required = true,
              example = "123e4567-e89b-12d3-a456-426614174000")
          UUID id)
      throws EntidadNoEncontrada;

  @Operation(
      operationId = "getEspaciosSinEventosYCapacidadSuficiente",
      summary = "Obtener espacios libres con capacidad suficiente",
      description =
          "Devuelve los UUID de los espacios físicos que están activos, tienen capacidad mayor o igual a la indicada y no tienen eventos programados que se solapen con el rango de fechas proporcionado.",
      tags = {"eventos"})
  @ApiResponses({
    @ApiResponse(
        responseCode = "200",
        description = "Lista de UUIDs de espacios libres recuperada correctamente"),
    @ApiResponse(
        responseCode = "400",
        description =
            "Solicitud inválida. Puede deberse a formato incorrecto en fechas o en el parámetro de capacidad.",
        content = @Content(schema = @Schema(implementation = ErrorDto.class))),
    @ApiResponse(
        responseCode = "404",
        description = "No se encontraron espacios que cumplan las condiciones.",
        content = @Content(schema = @Schema(implementation = ErrorDto.class))),
    @ApiResponse(
        responseCode = "500",
        description = "Error interno del servidor",
        content = @Content(schema = @Schema(implementation = ErrorDto.class)))
  })
  @GetMapping("/eventos/espaciosLibres")
  public ResponseEntity<List<UUID>> getEspaciosSinEventosYCapacidadSuficiente(
      @RequestParam @Parameter(description = "Capacidad mínima requerida", required = true)
          int capacidad,
      @RequestParam
          @Parameter(
              description = "Fecha y hora de inicio en formato ISO (YYYY-MM-DDTHH:MM:SS)",
              required = true,
              example = "2021-06-01T20:00:00")
          String fechaInicio,
      @RequestParam
          @Parameter(
              description = "Fecha y hora de fin en formato ISO (YYYY-MM-DDTHH:MM:SS)",
              required = true,
              example = "2021-06-01T22:00:00")
          String fechaFin)
      throws EntidadNoEncontrada;

  @Operation(
      operationId = "isOcupacionActiva",
      summary = "Verificar si existe una ocupación activa para un espacio físico indicado",
      description =
          "Devuelve un indicador booleano que especifica si existe una ocupación activa para el espacio físico indicado por su UUID.",
      tags = {"eventos"})
  @ApiResponses({
    @ApiResponse(
        responseCode = "200",
        description = "Indicador de ocupación activa recuperado correctamente"),
    @ApiResponse(
        responseCode = "400",
        description = "Formato de identificador no válido.",
        content = @Content(schema = @Schema(implementation = ErrorDto.class))),
    @ApiResponse(
        responseCode = "404",
        description = "No se encontró ocupación activa para el espacio.",
        content = @Content(schema = @Schema(implementation = ErrorDto.class))),
    @ApiResponse(
        responseCode = "500",
        description = "Error interno del servidor",
        content = @Content(schema = @Schema(implementation = ErrorDto.class)))
  })
  @GetMapping("/eventos/{id}/ocupacion")
  public ResponseEntity<Boolean> isOcupacionActiva(
      @PathVariable
          @Parameter(
              description = "Identificador del espacio físico",
              required = true,
              example = "123e4567-e89b-12d3-a456-426614174000")
          UUID id)
      throws EntidadNoEncontrada;

  @Operation(
      operationId = "validarNuevaCapacidadEspacio",
      summary = "Validar nueva capacidad para un espacio físico",
      description =
          "Verifica si la nueva capacidad de un espacio físico es válida, asegurando que no haya eventos programados con una capacidad mayor.",
      tags = {"eventos"})
  @ApiResponses({
    @ApiResponse(
        responseCode = "200",
        description = "Validación de nueva capacidad realizada correctamente",
        content = @Content(schema = @Schema(implementation = Boolean.class))),
    @ApiResponse(
        responseCode = "400",
        description = "Solicitud inválida",
        content = @Content(schema = @Schema(implementation = ErrorDto.class))),
    @ApiResponse(
        responseCode = "404",
        description = "No existe un espacio físico con el ID proporcionado.",
        content = @Content(schema = @Schema(implementation = ErrorDto.class))),
    @ApiResponse(
        responseCode = "500",
        description = "Error interno del servidor",
        content = @Content(schema = @Schema(implementation = ErrorDto.class)))
  })
  @GetMapping("/eventos/ocupaciones/espacios/{idEspacio}/capacidad")
  ResponseEntity<Boolean> validarNuevaCapacidadEspacio(
      @PathVariable
          @Parameter(
              description = "Identificador del espacio físico",
              required = true,
              example = "123e4567-e89b-12d3-a456-426614174000")
          UUID idEspacio,
      @RequestParam
          @Parameter(
              description = "Nueva capacidad propuesta para el espacio físico",
              required = true,
              example = "64")
          int nuevaCapacidad)
      throws EntidadNoEncontrada;
}
