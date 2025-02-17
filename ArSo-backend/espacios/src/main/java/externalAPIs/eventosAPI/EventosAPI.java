package externalAPIs.eventosAPI;
import java.time.LocalDateTime;
import java.util.*;

import externalAPIs.eventosAPI.dto.EventoDTO;
import externalAPIs.eventosAPI.dto.ModificarEventoDTO;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;


public interface EventosAPI {
	
	
	@GET("/api/eventos")
	Call<List<EventoDTO>> getEventosDelMes(@Query("month") int month, @Query("year") int year);
	
	@GET("/api/eventos/{id}")
	Call<EventoDTO> recuperarEvento(@Path("id") String id);
	
	@POST("/api/eventos/{id}")
	Call<Void> crearEvento(@Path("id") String id, @Body EventoDTO evento);
	
	@PATCH("/api/eventos/{id}")
	Call<Void> modificarEvento(@Path("id") String id, @Body ModificarEventoDTO evento);
	
	@PUT("/api/eventos/{id}/ocupacion")
	Call<Void> cancelarEvento(@Path("id") String id);
	
	




}
