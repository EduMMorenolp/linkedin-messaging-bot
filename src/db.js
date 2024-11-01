import mysql from 'mysql2';
import { dbConfig } from './config.js';

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) throw err;
    console.log("Conectado a la base de datos MySQL.");
});

export function logActivity(contactName, contactProfileLink, messageText, status) {
    const query = 'INSERT INTO activity_log (contact_name, contact_profile_link, message_text, status) VALUES (?, ?, ?, ?)';
    connection.query(query, [contactName, contactProfileLink, messageText, status], (err) => {
        if (err) console.error("Error al registrar actividad:", err);
    });
}