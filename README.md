# Repositorio conjunto para ArSo y DAWeb curso 24-25

Los integrantes encargados de realizar este proyecto serán:

- Fabián Sola Durán
- Antonio Pérez Serrano

En este repositorio dividiremos el contenido del mismo en dos directorios uno para cada asignatura.

Tareas por realizar:

- Hacer un método en el api de eventos que cumpla la siguiente especificacion:

```java
"SELECT ev " +
"FROM Evento ev " +
"WHERE ev.ocupacion.espacioFisico.id = e.id " +
"AND ev.ocupacion.fechaInicio <= :fechaFin " +
"AND ev.ocupacion.fechaFin >= :fechaInicio)
```