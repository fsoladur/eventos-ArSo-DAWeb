package externalAPIs.rabbitMQ;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import externalAPIs.rabbitMQ.config.RabbitConfig;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class RabbitMQInitializer implements ServletContextListener {

  private static Connection connection;
  private static Channel channel;

  @Override
  public void contextInitialized(ServletContextEvent servletContextEvent) {
    try {
      connection = RabbitConfig.crearFactoria().newConnection();
      channel = connection.createChannel();
      RabbitConfig.queue(channel);
      RabbitConfig.bind(channel);
      RabbitConfig.exchange(channel);
    } catch (Exception e) {
      e.printStackTrace();
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
