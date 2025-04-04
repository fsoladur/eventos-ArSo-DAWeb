package infraestructura.externalAPIs.rabbitMQ;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import infraestructura.externalAPIs.rabbitMQ.config.RabbitConfig;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class RabbitMQInitializer implements ServletContextListener {
  private static final int MAX_RETRIES = 5;
  private static Connection connection;
  private static Channel channel;

  @Override
  public void contextInitialized(ServletContextEvent servletContextEvent) {
    int retries = 0;
    boolean connected = false;

    while (retries < MAX_RETRIES && !connected) {
      try {
        connection = RabbitConfig.crearFactoria().newConnection();
        channel = connection.createChannel();
        RabbitConfig.exchange(channel);
        RabbitConfig.queue(channel);
        RabbitConfig.bind(channel);
        connected = true;
      } catch (Exception e) {
        retries++;
      }
    }
    if (!connected) {
      throw new RuntimeException(
          "No se pudo conectar a RabbitMQ después de " + MAX_RETRIES + " intentos");
    }
  }

  public static Channel getChannel() {
    return channel;
  }

  @Override
  public void contextDestroyed(ServletContextEvent servletContextEvent) {
    try {
      if (channel != null) {
        channel.close();
      }
      if (connection != null) {
        connection.close();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
