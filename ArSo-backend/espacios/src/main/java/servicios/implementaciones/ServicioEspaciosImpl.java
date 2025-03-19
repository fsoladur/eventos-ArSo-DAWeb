package servicios.implementaciones;

import dominio.EspacioFisico;
import dominio.PuntoInteres;
import dominio.enumerados.EstadoEspacioFisico;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import api.rest.mapper.EspacioFisicoMapper;
import externalAPIs.eventosAPI.EventosAPI;
import externalAPIs.factoria.FactoriaServicioExterno;
import repositorio.RepositorioEspacioFisicoAdhoc;
import repositorio.excepciones.EntidadNoEncontrada;
import repositorio.excepciones.RepositorioException;
import repositorio.factoria.FactoriaRepositorios;
import servicios.ServicioEspacios;
import api.rest.DTO.EspacioFisicoDTO;

public class ServicioEspaciosImpl implements ServicioEspacios {

    private final RepositorioEspacioFisicoAdhoc repositorioEspacioFisico = FactoriaRepositorios
            .getRepositorio(EspacioFisico.class);

    private final EventosAPI eventosAPI = FactoriaServicioExterno.getServicioExterno(EventosAPI.class);

    @Override
    public UUID darAltaEspacioFisico(String nombre, String propietario, int capacidad, String direccionPostal,
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
    public boolean asignarPuntosInteres(UUID idEspacio, Collection<PuntoInteres> puntosInteres)
            throws RepositorioException, EntidadNoEncontrada {

        if (idEspacio == null) {
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
    public EspacioFisico modificarEspacioFisico(UUID idEspacio, String nombre, String descripcion, int capacidad)
            throws RepositorioException, EntidadNoEncontrada {

        if (idEspacio == null) {
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

        return espacioFisico;
    }

    @Override
    public boolean darBajaEspacioFisico(UUID idEspacio) throws RepositorioException, EntidadNoEncontrada {

        if (idEspacio == null) {
            throw new IllegalArgumentException("El id del espacio no puede ser nulo o vacío.");
        }

        boolean noHayOcupacion = false;

        try {
            if (!eventosAPI.isOcupacionActiva(idEspacio)) {
                EspacioFisico espacioFisico = repositorioEspacioFisico.getById(idEspacio);
                espacioFisico.setEstado(EstadoEspacioFisico.CERRADO_TEMPORALMENTE);
                repositorioEspacioFisico.update(espacioFisico);
                noHayOcupacion = true;
            }
        } catch (IOException | RepositorioException | EntidadNoEncontrada e) {
            e.printStackTrace();
        }

        return noHayOcupacion;
    }

    @Override
    public boolean activarEspacioFisico(UUID idEspacio) throws RepositorioException, EntidadNoEncontrada {
        if (idEspacio == null) {
            throw new IllegalArgumentException("El id del espacio no puede ser nulo o vacío.");
        }

        EspacioFisico espacioFisico = repositorioEspacioFisico.getById(idEspacio);
        espacioFisico.setEstado(EstadoEspacioFisico.ACTIVO);
        repositorioEspacioFisico.update(espacioFisico);

        return true;
    }

    @Override
    public List<EspacioFisico> findEspaciosFisicosLibres(LocalDateTime fechaInicio, LocalDateTime fechaFin,
                                                            int capacidadRequerida) throws RepositorioException, EntidadNoEncontrada, IOException {

        if (fechaInicio == null || fechaFin == null || fechaInicio.isAfter(fechaFin)) {
            throw new IllegalArgumentException(
                    "Las fechas de inicio y fin no pueden ser nulas o la fecha de inicio no puede ser posterior a la de fin.");
        }
        if (capacidadRequerida <= 0) {
            throw new IllegalArgumentException("La capacidad requerida debe ser mayor que 0.");
        }

        List<UUID> espaciosLibres = eventosAPI.getEspaciosSinEventosYCapacidadSuficiente(capacidadRequerida,
                fechaInicio.toString(), fechaFin.toString());

        List<EspacioFisico> espaciosFisicos = repositorioEspacioFisico.getEspaciosFisicosByIds(espaciosLibres);

        return espaciosFisicos;
    }


    @Override
    public List<EspacioFisico> findEspaciosFisicosDePropietario(String propietario)
            throws RepositorioException, EntidadNoEncontrada {
        if (propietario == null || propietario.isEmpty()) {
            throw new IllegalArgumentException("El propietario no puede ser nulo o vacío.");
        }

        return repositorioEspacioFisico.getEspaciosFisicosByPropietario(propietario);
    }

    @Override
    public EspacioFisico recuperarEspacioFisico(final UUID idEspacio)
            throws RepositorioException, EntidadNoEncontrada {
        if (idEspacio == null) {
            throw new IllegalArgumentException("El id del espacio no puede ser nulo o vacío.");
        }
        EspacioFisico espacioFisico = repositorioEspacioFisico.getById(idEspacio);

        return espacioFisico;
    }

}
