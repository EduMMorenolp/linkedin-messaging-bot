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

export async function saveRecruiterNames(recruiters) {
    const connection = await mysql.createConnection(dbConfig);
    try {
        await connection.connect();

        // Insertar cada reclutador en la tabla
        for (const recruiter of recruiters) {
            const [name, linkedin] = recruiter.split(' - ');

            const query = 'INSERT INTO reclutadores (nombre, linkedin) VALUES (?, ?)';
            await connection.execute(query, [name, linkedin]);
        }

        console.log('Reclutadores guardados en la base de datos.');
    } catch (error) {
        console.error('Error al guardar reclutadores:', error.message);
    } finally {
        await connection.end();
    }
}