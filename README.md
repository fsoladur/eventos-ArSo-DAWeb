# Sistema de Gestión de Eventos y Reservas - ArSo y DAWeb 2024-25

## Tabla de Contenidos

- [Sistema de Gestión de Eventos y Reservas - ArSo y DAWeb 2024-25](#sistema-de-gestión-de-eventos-y-reservas---arso-y-daweb-2024-25)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [👥 Integrantes del Proyecto](#-integrantes-del-proyecto)
  - [📋 Descripción del Proyecto](#-descripción-del-proyecto)
  - [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
    - [Backend (ArSo) - Microservicios](#backend-arso---microservicios)
    - [Frontend (DAWeb)](#frontend-daweb)
  - [🛠️ Stack Tecnológico](#️-stack-tecnológico)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Tecnologías por Microservicio](#tecnologías-por-microservicio)
  - [📁 Estructura del Proyecto](#-estructura-del-proyecto)
  - [🚀 Instrucciones de Despliegue](#-instrucciones-de-despliegue)
    - [Prerrequisitos](#prerrequisitos)
    - [Despliegue Completo con Docker](#despliegue-completo-con-docker)
      - [1. Backend (Microservicios)](#1-backend-microservicios)
      - [2. Frontend (Aplicaciones Web)](#2-frontend-aplicaciones-web)
    - [Acceso a la Aplicación](#acceso-a-la-aplicación)
    - [Usuarios de Prueba](#usuarios-de-prueba)
  - [🎯 Funcionalidades Implementadas](#-funcionalidades-implementadas)
    - [Para Gestores](#para-gestores)
    - [Para Usuarios](#para-usuarios)
    - [Características Técnicas](#características-técnicas)
  - [🧪 Desarrollo Local](#-desarrollo-local)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [🔧 Configuración Adicional](#-configuración-adicional)
    - [Variables de Entorno](#variables-de-entorno)
    - [Base de Datos](#base-de-datos)
  - [📝 Documentación Adicional](#-documentación-adicional)
  - [🤝 Contribución](#-contribución)
  - [📄 Licencia](#-licencia)

## 👥 Integrantes del Proyecto

- [**Fabián Sola Durán**](https://github.com/fsoladur)
- [**Antonio Pérez Serrano**](https://github.com/Zerep0)

## 📋 Descripción del Proyecto

Este proyecto integra las asignaturas de **Arquitectura del Software (ArSo)** y **Desarrollo de Aplicaciones Web (DAWeb)** para crear un sistema completo de gestión de eventos y reservas. La aplicación permite a usuarios gestionar espacios físicos, crear eventos y realizar reservas de manera eficiente a través de una arquitectura de microservicios moderna.

## 🏗️ Arquitectura del Sistema

### Backend (ArSo) - Microservicios

- **Espacios Service**: Gestión de espacios físicos (JAX-RS + JPA/EclipseLink + MySQL)
- **Eventos Service**: Gestión de eventos (Spring Boot + JPA/Hibernate + MySQL)
- **Reservas Service**: Gestión de reservas (Spring Boot + MongoDB)
- **Gateway Service**: API Gateway (Spring Cloud Netflix Zuul)
- **RabbitMQ**: Sistema de mensajería asíncrona entre microservicios

### Frontend (DAWeb)

- **Welcome Express**: Página de bienvenida (Node.js + Express + Handlebars)
- **Eventos React**: Aplicación principal SPA (React + Vite + Bootstrap)

## 🛠️ Stack Tecnológico

<div align="center">

![Java](https://img.shields.io/badge/Java-11+-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.7.0-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-3.11-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-20.10+-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

### Backend

- **Java** con Spring Boot y JAX-RS
- **Spring Security** para autenticación/autorización
- **Spring Cloud Netflix Zuul** como API Gateway
- **JPA/Hibernate** y **EclipseLink** para persistencia
- **MySQL** y **MongoDB** como bases de datos
- **RabbitMQ** para mensajería asíncrona
- **Docker** y **Docker Compose** para contenerización
- **Spring Boot HATEOAS** para APIs RESTful con soporte HATEOAS
- **Retrofit** para comunicación entre microservicios

### Frontend

- **React 19** con hooks y context API
- **Vite** como bundler y servidor de desarrollo
- **React Bootstrap** para componentes UI
- **React Router** para navegación SPA
- **Material UI (MUI)** para selectores de fecha
- **React Toastify** para notificaciones
- **CSS Grid** y **Flexbox** para layouts responsivos
- **Node.js + Express** para el servidor de bienvenida
- **Handlebars** como motor de plantillas
- **Sass/SCSS** para preprocesamiento CSS

### Tecnologías por Microservicio

| Microservicio       | Tecnologías                    | Base de Datos | Puerto |
| ------------------- | ------------------------------ | ------------- | ------ |
| **Gateway**         | Spring Cloud Netflix Zuul      | -             | 8090   |
| **Espacios**        | JAX-RS + JPA/EclipseLink       | MySQL         | 8080   |
| **Eventos**         | Spring Boot + JPA/Hibernate    | MySQL         | 8081   |
| **Reservas**        | Spring Boot + MongoDB          | MongoDB       | 8082   |
| **Frontend React**  | React + Vite + Bootstrap       | -             | 5173   |
| **Welcome Express** | Node.js + Express + Handlebars | -             | 3000   |

## 📁 Estructura del Proyecto

```
├── ArSo-backend/           # Microservicios backend
│   ├── espacios/          # Servicio de espacios físicos
│   ├── eventos/           # Servicio de eventos
│   ├── reservas/          # Servicio de reservas
│   ├── gateway/           # API Gateway
│   └── docker-compose.yml # Despliegue backend
├── DAWeb-frontend/        # Aplicaciones frontend
│   ├── eventos/           # SPA React principal
│   ├── welcome-express/   # Página de bienvenida
│   └── docker-compose.yml # Despliegue frontend
```

## 🚀 Instrucciones de Despliegue

### Prerrequisitos

- **Docker** y **Docker Compose** instalados
- **Java 11+** (para desarrollo local)
- **Node.js 18+** (para desarrollo local)
- **MySQL** y **MongoDB** (incluidos en Docker Compose)

### Despliegue Completo con Docker

#### 1. Backend (Microservicios)

```bash
cd ArSo-backend
docker-compose up -d
```

Esto levantará:

- MySQL (puerto 3306)
- MongoDB (puerto 27017)
- RabbitMQ (puerto 5672, interfaz web: 15672)
- Gateway (puerto 8090)
- Microservicio Espacios (puerto 8080)
- Microservicio Eventos (puerto 8081)
- Microservicio Reservas (puerto 8082)

#### 2. Frontend (Aplicaciones Web)

```bash
cd DAWeb-frontend
docker-compose up -d
```

Esto levantará:

- Welcome Express (puerto 3000)
- Eventos React SPA (puerto 5173)

### Acceso a la Aplicación

- **Página Principal**: http://localhost:3000
- **Aplicación Principal**: http://localhost:5173
- **API Gateway**: http://localhost:8090
- **RabbitMQ Management**: http://localhost:15672 (guest/guest)

### Usuarios de Prueba

- **Gestor**: `gestor` / `gestor`
- **Usuario**: `usuario` / `usuario`

## 🎯 Funcionalidades Implementadas

### Para Gestores

- ✅ Gestión completa de espacios físicos (CRUD)
- ✅ Gestión completa de eventos (CRUD)
- ✅ Cancelación de eventos con anulación automática de reservas
- ✅ Cierre temporal de espacios físicos
- ✅ Vista detallada de eventos con estadísticas de reservas

### Para Usuarios

- ✅ Visualización de eventos disponibles
- ✅ Filtrado avanzado por múltiples criterios
- ✅ Realización de reservas con validaciones
- ✅ Cancelación de reservas activas
- ✅ Consulta de reservas activas y historial
- ✅ Interfaz responsiva para móviles y tablets

### Características Técnicas

- ✅ Autenticación con usuario/contraseña y OAuth2 GitHub
- ✅ Comunicación asíncrona entre microservicios
- ✅ Validaciones tanto en frontend como backend
- ✅ Manejo de errores y notificaciones al usuario
- ✅ Paginación y búsqueda en tiempo real
- ✅ Diseño responsivo y accesible

## 🧪 Desarrollo Local

### Backend

```bash
cd ArSo-backend/espacios
mvn spring-boot:run

cd ArSo-backend/eventos
mvn spring-boot:run

cd ArSo-backend/reservas
mvn spring-boot:run

cd ArSo-backend/gateway
mvn spring-boot:run
```

### Frontend

```bash
cd DAWeb-frontend/welcome-express
npm install && npm start

cd DAWeb-frontend/eventos
npm install && npm run dev
```

## 🔧 Configuración Adicional

### Variables de Entorno

- `PORT`: Puerto de las aplicaciones
- `DB_HOST`: Host de la base de datos
- `RABBITMQ_URL`: URL del broker de mensajes

### Base de Datos

Las bases de datos se inicializan automáticamente con Docker Compose usando scripts SQL/MongoDB incluidos en el proyecto.

## 📝 Documentación Adicional

- **Casos de Uso**: Ver `DAWeb-frontend/CASOS-DE-USO.md`
- **Documentación Técnica**: Ver `DAWeb-frontend/doc.md`
- **Collection Postman**: Ver `ArSo-backend/ArSo-Postman.postman_collection.json`

## 🤝 Contribución

Este proyecto fue desarrollado como parte del trabajo integrado de las asignaturas ArSo y DAWeb del curso 2024-25.

## 📄 Licencia

Proyecto académico - Universidad de Murcia
