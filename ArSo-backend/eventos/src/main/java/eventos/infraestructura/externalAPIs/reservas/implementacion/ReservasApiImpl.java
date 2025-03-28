package eventos.infraestructura.externalAPIs.reservas.implementacion;

import eventos.infraestructura.externalAPIs.reservas.ReservasAPI;
import eventos.infraestructura.externalAPIs.reservas.RetrofitReservasAPI;
import org.springframework.stereotype.Component;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

import java.io.IOException;
import java.util.UUID;

@Component
public class ReservasApiImpl implements ReservasAPI {

  private final RetrofitReservasAPI reservasAPI;

  public ReservasApiImpl() {
    Retrofit retrofit =
        new Retrofit.Builder()
            .baseUrl("http://localhost:8082")
            .addConverterFactory(JacksonConverterFactory.create())
            .build();
    reservasAPI = retrofit.create(RetrofitReservasAPI.class);
  }

  @Override
  public boolean validarNuevasPlazasEvento(UUID idEvento, int plazas) throws IOException {
    Call<Boolean> call = reservasAPI.validarNuevasPlazasEvento(idEvento, plazas);
    Response<Boolean> response = call.execute();
    return response.isSuccessful() && Boolean.TRUE.equals(response.body());
  }
}
