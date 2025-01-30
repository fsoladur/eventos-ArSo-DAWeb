package repositorio;

import dominio.Evento;

public class RepositorioEventosJPA extends RepositorioJPA<Evento> {

  @Override
  public Class<Evento> getClase() {
    return Evento.class;
  }
}
