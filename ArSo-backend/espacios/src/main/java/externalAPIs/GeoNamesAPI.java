package externalAPIs;

import externalAPIs.exception.GeoNamesAPIFailException;
import dominio.PuntoInteres;
import java.util.List;

public interface GeoNamesAPI {

  List<PuntoInteres> findNearByPuntosInteres(final double latitud, final double longitud)
      throws GeoNamesAPIFailException;
}
