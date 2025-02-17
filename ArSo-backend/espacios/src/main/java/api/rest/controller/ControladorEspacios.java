package api.rest.controller;

import java.net.URI;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.PATCH;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import api.rest.utils.Listado;
import api.rest.utils.Listado.ResumenExtendido;
import dominio.PuntoInteres;
import externalAPIs.eventosAPI.dto.ModificarEventoDTO;
import repositorio.excepciones.EntidadNoEncontrada;
import repositorio.excepciones.RepositorioException;
import servicios.ServicioEspacios;
import servicios.DTO.EspacioFisicoDTO;
import servicios.DTO.ModificarEspacioFisicoDTO;
import servicios.factoria.*;;

@Path("espacios")
public class ControladorEspacios {

	private ServicioEspacios servicio = FactoriaServicios.getServicio(ServicioEspacios.class);

	@Context
	private UriInfo uriInfo;
	
	// TODO: Preguntar a marcos si esto está bien
	@PUT
	@Path("/{id}/puntosinteres")
	public Response asignarPuntosInteres(@PathParam("idEspacio") String idEspacio,
			@FormParam("puntosInteres") Collection<PuntoInteres> puntosInteres)
			throws RepositorioException, EntidadNoEncontrada {

		servicio.asignarPuntosInteres(idEspacio, puntosInteres);

		return Response.status(Response.Status.NO_CONTENT).build();

	}

	@PATCH
	@Path("/{id}")
	public Response modificarEspacioFisico(@PathParam("idEspacio") String idEspacio, @FormParam("espacio") ModificarEspacioFisicoDTO espacio)
			throws RepositorioException, EntidadNoEncontrada {

		servicio.modificarEspacioFisico(idEspacio, 
				espacio.getNombre(), espacio.getDescripcion(), espacio.getCapacidad());

		return Response.status(Response.Status.NO_CONTENT).build();
	}

	@PUT
	@Path("/{id}/estado")
	public Response cambiarEstadoEspacioFisico(@PathParam("idEspacio") String idEspacio,
			@FormParam("estado") String estado) throws RepositorioException, EntidadNoEncontrada {

		if ("activo".equalsIgnoreCase(estado)) {
			servicio.activarEspacioFisico(idEspacio);
		} else if ("cerrado".equalsIgnoreCase(estado)) {
			servicio.darBajaEspacioFisico(idEspacio);
		} else {
			return Response.status(Response.Status.BAD_REQUEST).entity("Estado inválido. Use 'activo' o 'cerrado'.")
					.build();
		}

		return Response.status(Response.Status.NO_CONTENT).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/libres?fechaInicio={fechaInicio}&fechaFin={fechaFin}&capacidadRequerida={capacidadRequerida}")
	public Response findEspaciosFisicosLibres(String fechaInicio, String fechaFin, int capacidadRequerida)
			throws RepositorioException, EntidadNoEncontrada {
		
		LocalDateTime fechaInicioParse = null, fechaFinParse = null;
		try {
			fechaInicioParse = LocalDateTime.parse(fechaInicio);
			fechaFinParse = LocalDateTime.parse(fechaFin);
		} catch (DateTimeParseException e) {
			throw new IllegalArgumentException(e);
		}

		List<EspacioFisicoDTO> listaEspacioFisicosLibres = servicio.findEspaciosFisicosLibres(fechaInicioParse, fechaFinParse,
				capacidadRequerida);

		LinkedList<ResumenExtendido> extendido = new LinkedList<>();
		for (EspacioFisicoDTO espacioFisicoDTO : listaEspacioFisicosLibres) {
			ResumenExtendido resumenExtendido = new ResumenExtendido();
			resumenExtendido.setResumen(espacioFisicoDTO);

			// Construir la URL
			String id = espacioFisicoDTO.getId();
			URI nuevaURL = this.uriInfo.getAbsolutePathBuilder().path(id).build();
			resumenExtendido.setUrl(nuevaURL.toString());

			extendido.add(resumenExtendido);
		}

		Listado listado = new Listado();
		listado.setEspacios(extendido);
		return Response.ok(listado).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("?propietario={propietario}")
	public Response findEspaciosFisicosDePropietario(@PathParam("propietario") String propietario)
			throws RepositorioException, EntidadNoEncontrada {
		List<EspacioFisicoDTO> listaEspacioFisicosPropietario = servicio.findEspaciosFisicosDePropietario(propietario);

		LinkedList<ResumenExtendido> extendido = new LinkedList<>();
		for (EspacioFisicoDTO espacioFisicoDTO : listaEspacioFisicosPropietario) {
			ResumenExtendido resumenExtendido = new ResumenExtendido();
			resumenExtendido.setResumen(espacioFisicoDTO);

			// Construir la URL
			String id = espacioFisicoDTO.getId();
			URI nuevaURL = this.uriInfo.getAbsolutePathBuilder().path(id).build();
			resumenExtendido.setUrl(nuevaURL.toString());

			extendido.add(resumenExtendido);
		}

		Listado listado = new Listado();
		listado.setEspacios(extendido);
		return Response.ok(listado).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{id}")
	public Response recuperarEspacioFisico(@PathParam("idEspacio") final String idEspacio)
			throws RepositorioException, EntidadNoEncontrada {
		EspacioFisicoDTO espacioFisico = servicio.recuperarEspacioFisico(idEspacio);

		return Response.ok(espacioFisico).build();
	}
}