package infraestructura.externalAPIs.rabbitMQ.excepciones;

@SuppressWarnings("serial")
public class RabbitMQException extends Exception {
	public RabbitMQException(String mensaje) {
		super(mensaje);
	}

	public RabbitMQException(String mensaje, Throwable causa) {
		super(mensaje, causa);
	}
}
