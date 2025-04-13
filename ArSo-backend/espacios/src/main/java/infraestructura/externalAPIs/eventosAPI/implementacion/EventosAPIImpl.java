package infraestructura.externalAPIs.eventosAPI.implementacion;

import infraestructura.externalAPIs.eventosAPI.EventosAPI;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public class EventosAPIImpl implements EventosAPI {
  private final RetrofitEventosAPI eventosAPI;

  public EventosAPIImpl() {
    Retrofit retrofit =
        new Retrofit.Builder()
            .baseUrl(System.getenv("EVENTOS_API"))
            .addConverterFactory(GsonConverterFactory.create())
            .build();
    eventosAPI = retrofit.create(RetrofitEventosAPI.class);
  }

  public List<UUID> getEspaciosSinEventosYCapacidadSuficiente(
      int capacidad, String fechaInicio, String fechaFin) throws IOException {
    Call<List<UUID>> call =
        eventosAPI.getEspaciosSinEventosYCapacidadSuficiente(capacidad, fechaInicio, fechaFin);
    Response<List<UUID>> response = call.execute();
    return response.isSuccessful() ? response.body() : List.of();
  }

  public boolean isOcupacionActiva(UUID id) throws IOException {
    Call<Boolean> call = eventosAPI.isOcupacionActiva(id);
    Response<Boolean> response = call.execute();
    return !response.isSuccessful() || Boolean.TRUE.equals(response.body());
  }

  @Override
  public boolean validarNuevaCapacidadEspacio(UUID idEspacio, int nuevaCapacidad)
      throws IOException {
    Call<Boolean> call = eventosAPI.validarNuevaCapacidadEspacio(idEspacio, nuevaCapacidad);
    Response<Boolean> response = call.execute();
    return response.isSuccessful() && Boolean.TRUE.equals(response.body());
  }
}
