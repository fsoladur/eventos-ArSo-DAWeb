package infraestructura.externalAPIs.eventosAPI.implementacion;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

import java.util.List;
import java.util.UUID;

public interface RetrofitEventosAPI {
  @GET("/api/eventos/espaciosLibres")
  Call<List<UUID>> getEspaciosSinEventosYCapacidadSuficiente(
      @Query("capacidad") int capacidad,
      @Query("fechaInicio") String fechaInicio,
      @Query("fechaFin") String fechaFin);

  @GET("/api/eventos/{id}/ocupacion")
  Call<Boolean> isOcupacionActiva(@Path("id") UUID id);

  @GET("/eventos/ocupaciones/espacios/{idEspacio}/capacidad")
  Call<Boolean> validarNuevaCapacidadEspacio(
      @Path("idEspacio") UUID idEspacio, @Query("nuevaCapacidad") int nuevaCapacidad);
}
