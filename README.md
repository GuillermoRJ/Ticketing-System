# Ticketing System API

Una API RESTful construida con **Node.js**, **Express** y **MongoDB** para la gestión integral de un sistema de tickets. Este backend permite administrar usuarios (con diferentes roles), tickets, categorías, carreras universitarias y visualizar KPIs del sistema.



## ✨ Funcionalidades Principales

- **Gestión de Tickets:** Creación, asignación, actualización de estados, filtrado y eliminación de tickets.
- **Gestión de Usuarios:** Registro, actualización, desactivación (soft delete) y roles predefinidos (`admin`, `dev`, `user`).
- **Seguridad y Autenticación:** - Middleware de autenticación mediante headers.
  - Control de acceso basado en roles (Admin/Dev/User).
- **KPIs y Métricas:** Endpoints dedicados para obtener agregaciones de tickets por estado, por usuario y por tipo.
- **Gestión de Catálogos:** CRUD para carreras (`careers`) y tipos/categorías de tickets (`types`).

## 🚀 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución de JavaScript.
- **Express.js** - Framework web para Node.js.
- **MongoDB & Mongoose** - Base de datos NoSQL y ODM para el modelado de datos.
- **Dotenv** - Gestión de variables de entorno.
- **Nodemon** - Herramienta de desarrollo para reinicio automático del servidor.

## ⚙️ Cómo ejecutar el proyecto

1. Instalar dependencias:
```bash
npm install
```

2. Crear archivo `.env` basado en `.env.example`:

3. Ejecutar en modo desarrollador
```bash
npm run dev
```
