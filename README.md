# Entrega Final: Backend eCommerce
## Desarrollo de Sistemas Escalables - Coderhouse

Este repositorio contiene la arquitectura completa de un backend para una plataforma de comercio electrónico. El sistema ha sido diseñado con un enfoque en la **integridad de datos**, **escalabilidad** y **comunicación en tiempo real**.

---

### 🛠️ Stack Tecnológico

| Tecnología | Descripción |
| :--- | :--- |
| **Node.js** | Entorno de ejecución asíncrono. |
| **Express v5** | Framework web para la gestión de middlewares y ruteo. |
| **MongoDB Atlas** | Persistencia de datos en la nube (NoSQL). |
| **Mongoose** | ODM para el modelado y validación de esquemas en MongoDB. |
| **Socket.io** | Protocolo para actualizaciones de productos en tiempo real. |
| **Handlebars** | Motor de plantillas para renderizado dinámico del lado del servidor. |
| **Zod** | Validación estricta de tipos y esquemas en tiempo de ejecución. |
| **Dotenv** | Gestión segura de variables de entorno (.env). |

---

### 🏗️ Arquitectura y Patrones de Diseño

El proyecto implementa una arquitectura desacoplada que garantiza el mantenimiento y la robustez del código:

* **Repository Pattern:** Se utiliza una capa de repositorio para abstraer la lógica de acceso a datos, permitiendo alternar entre FileSystem y MongoDB sin afectar la lógica de negocio.
* **Fail-Fast Validation:** Uso de **Zod** como middleware de validación de entrada, filtrando datos incorrectos antes de que lleguen a la base de datos.
* **Centralized Error Handling:** Sistema global de manejo de excepciones que intercepta errores técnicos (como claves duplicadas en Mongo) y los transforma en respuestas JSON "humanizadas".
* **WebSockets Integration:** Sincronización automática entre la API y la vista `/realtimeproducts` mediante eventos de Socket.io.

---

### 🚀 Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/edwinmoises10/Backend_Project1.git](https://github.com/edwinmoises10/Backend_Project1.git)

## ⚙️ Instalación y Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DE_TU_REPO>
    cd <NOMBRE_CARPETA>
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el servidor:**
    ```bash
    npm start
    # O para modo desarrollo con nodemon:
    npm run dev
    ```

---

## 📡 API Endpoints

### 📦 Productos (`/api/products`)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/` | Lista todos los productos de la base. Soporta `?limit` (opcional). |
| **GET** | `/:pid` | Trae solo el producto con el ID proporcionado. |
| **POST** | `/` | Agrega un nuevo producto (Valida campos obligatorios y código único). |
| **PUT** | `/:pid` | Actualiza un producto (El ID no se modifica). |
| **DELETE**| `/:pid` | Elimina el producto indicado. |

