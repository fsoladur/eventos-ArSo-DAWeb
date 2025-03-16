package externalAPIs.eventosAPI;
import java.util.*;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;


public interface IEventosAPI {
	
	@GET("/api/eventos/espaciosLibres")
	Call<List<UUID>> getEspaciosSinEventosYCapacidadSuficiente
		(@Query("capacidad") int capacidad, @Query("fechaInicio") String fechaInicio, @Query("fechaFin") String fechaFin);
	
	@GET("/api/eventos/{id}/ocupacion")
	Call<Boolean> isOcupacionActiva(@Path("id") UUID id);
	
}
