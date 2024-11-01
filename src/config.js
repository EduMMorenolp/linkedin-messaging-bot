import 'dotenv/config';

export const linkedinEmail = process.env.LINKEDIN_EMAIL;
export const linkedinPassword = process.env.LINKEDIN_PASSWORD;
export const messageText = "Hola [Nombre], me gustaría compartirte mi CV para una oportunidad en tu empresa.";

// Agrega la variable searchQuery
export const searchQuery = "recruiter"; // Puedes cambiarlo según lo que necesites

// Cargar configuración de la base de datos desde .env
export const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};