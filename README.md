# LinkedIn Messaging Bot

Este proyecto es un bot automatizado que permite enviar mensajes en LinkedIn a reclutadores o contactos específicos con el objetivo de compartir tu CV o mensaje de presentación. Utiliza **Puppeteer** para la navegación automatizada en LinkedIn y **MySQL** para registrar la actividad de mensajes enviados.

## Estructura del Proyecto

```plaintext
linkedin-messaging-bot/
├── src/
│   ├── auth.js             // Módulo de autenticación en LinkedIn
│   ├── searchContacts.js   // Módulo de búsqueda de reclutadores
│   ├── messageSender.js    // Módulo para enviar mensajes y registrar actividad
│   ├── db.js               // Módulo de conexión a la base de datos MySQL
│   └── config.js           // Configuración de credenciales y otros parámetros
├── index.js                // Archivo principal para ejecutar el flujo completo
├── package.json            // Dependencias y scripts
├── .env                    // Variables de entorno (credenciales de LinkedIn)
└── README.md               // Documentación del proyecto
```

## Requisitos

- Node.js
- MySQL
- Cuenta en LinkedIn

## Instalación

Clona este repositorio y navega al directorio del proyecto:

```bash
git clone https://github.com/tu-usuario/linkedin-messaging-bot.git
cd linkedin-messaging-bot
```
Instala las dependencias:
```bash
npm install
```
Crea un archivo .env en la raíz del proyecto y agrega tus credenciales de LinkedIn:
```bash
LINKEDIN_EMAIL=tu_correo@example.com
LINKEDIN_PASSWORD=tu_contraseña
```
Configura la base de datos MySQL:

- Crea una base de datos en MySQL.
- Usa el siguiente comando SQL para crear la tabla activity_log:
```bash
CREATE TABLE activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_name VARCHAR(100),
    contact_profile_link VARCHAR(255),
    message_text TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('sent', 'failed') DEFAULT 'sent'
);
```
Configura la conexión a MySQL en src/config.js:
```bash
export const dbConfig = {
    host: 'localhost',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'nombre_base_datos'
};
```