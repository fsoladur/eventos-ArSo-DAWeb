# Proyecto de Desarrollo de Aplicaciones Web

## Instrucciones de uso

Este documento contiene los casos de uso del proyecto de desarrollo de la asignatura de DaWeb. Para seguir un enfoque dinámico se recomienda a los usuarios poner un '✅' en los casos de uso que ya han sido implementados además de referenciar el archivo o archivos donde se encuentran implementados. De esta forma, el documento se convertirá en una guía de referencia para el desarrollo del proyecto.

## Requisitos tecnológicos

Características tecnológicas a cumplir:

- HTML, CSS y Bootstrap

- Uso de CSS Grid en alguna vista

- Diseño adaptado a móviles siguiendo un diseño RWD (Responsive Web Design) que aplique el uso de Media Queries

- Diseño web: Fuentes (Google Fonts), Paleta de colores(https://coolors.co/), Iconos (Font Awesome o YesIcon)

- Uso de Bootstrap basado en un grid layout y no solo componentes

- Uso de React para hacer nuestros propios componentes.

- JavaScript y llamadas asíncronas a la API RESTful (fetch y alguna con AJAX)

## Casos de uso - diseño

### Actores

Casos de uso genéricos:

- La aplicación deberá **permitir hacer un Login/Logout a los usuarios**

### Actor gestor (rol gestor)

Casos de uso:

- gestor podrá **dar de alta y modificar los espacios físicos**

- gestor podrá **dar de alta y modificar los Eventos**.

- gestor puede **cancelar un evento anulando todas las reservas hechas por los clientes si la fecha de inicio es posterior a la fecha actual**.

- gestor podrá **cerrar temporalmente un espacio físico si no tiene eventos activos**.

### Actor usuario (rol usuario)

Casos de uso:

- Los usuarios podrán **listar los eventos del sistema y consultar sus propiedades**.

- Los usuarios podrán **filtrar los eventos por sus propiedades y/o por las propiedades de sus espacios físicos**. Además, **se podrá filtrar por el número de plazas libres del evento**

- Un usuario **podrá realizar una reserva en un evento indicando el número de plazas a reservar, si el evento no está cancelado, la fecha actual sea anterior a la fecha de fin y quedan plazas libres**

- el usuario **podrá anular una reserva si la fecha de inicio del evento es posterior a la fecha en el momento de la anulación**.

- Cada usuario **debe poder consultar las reservas que tenga activas (la fecha actual es anterior a la fecha de inicio del evento)**

- Cada usuario debe **poder consultar la lista de reservas previas realizadas en el sistema (la fecha actual es posterior a la fecha de inicio del evento).**
