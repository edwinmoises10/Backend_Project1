# 🚀 Entrega N° 1: Servidor Backend E-commerce

Este proyecto constituye la primera entrega del curso de Backend. Consiste en un servidor desarrollado con **Node.js** y **Express** que gestiona dos recursos principales: **Productos** y **Carritos**.

La persistencia de datos se maneja mediante **FileSystem** (archivos JSON), implementando la lógica a través de las clases `ProductManager` y `CartManager`.

## 📋 Requisitos del Proyecto

* **Puerto:** 8080
* **Persistencia:** Archivos locales (`products.json`, `carts.json`).
* **IDs:** Autogenerados (UUID/Numéricos) y únicos. No se permite duplicidad.

## 🛠️ Tecnologías Utilizadas

* **Runtime:** Node.js
* **Framework:** Express.js
* **Manejador de Archivos:** Native FileSystem (`fs`)
* **Librerías:** `uuid` (para generación de IDs).

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

