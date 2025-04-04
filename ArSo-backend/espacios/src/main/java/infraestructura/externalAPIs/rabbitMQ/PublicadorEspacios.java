package infraestructura.externalAPIs.rabbitMQ;

import dominio.EspacioFisico;
import infraestructura.externalAPIs.rabbitMQ.excepciones.RabbitMQException;

public interface PublicadorEspacios {
	void publicarEspacioCreacion(EspacioFisico evento) throws RabbitMQException;
	void publicarEspacioModificacion(EspacioFisico evento) throws RabbitMQException;
	void publicarEspacioBorrado(String entidadId) throws RabbitMQException;
	void publicarEspacioActivado(String entidadId) throws RabbitMQException;
}
