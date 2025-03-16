package externalAPIs.eventosAPI.implementacion;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import externalAPIs.eventosAPI.IEventosAPI;
import externalAPIs.factoria.RetrofitClient;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;


public class EventosAPI{
	
	private IEventosAPI eventosAPI;
	
	public EventosAPI() {
		Retrofit retrofit = RetrofitClient.getInstance();
		eventosAPI = retrofit.create(IEventosAPI.class);
	}
	
	public List<UUID> getEspaciosSinEventosYCapacidadSuficiente(int capacidad, String fechaInicio, String fechaFin) throws IOException {
        Call<List<UUID>> call = eventosAPI.getEspaciosSinEventosYCapacidadSuficiente(capacidad, fechaInicio, fechaFin);
        Response<List<UUID>> response = call.execute();
        if (response.isSuccessful()) {
            return response.body();
        } else {
            return List.of();
        }
    }

    public boolean isOcupacionActiva(UUID id) throws IOException{
        Call<Boolean> call = eventosAPI.isOcupacionActiva(id);
        Response<Boolean> response = call.execute();
        if (response.isSuccessful()) {
            return response.body();
        } else {
        	// TODO: Se deberia lanzar una excepcion?
            return true;
        }
    }
	

}
