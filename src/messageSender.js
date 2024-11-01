import { logActivity } from './db.js';
import { messageText } from './config.js';

export async function sendMessage(page, contact) {
    try {
        // Abrir el perfil del contacto y esperar que esté listo
        await contact.click();
        await page.waitForSelector('button[aria-label="Mensaje"]');

        // Hacer clic en el botón de "Mensaje"
        const messageButton = await page.$('button[aria-label="Mensaje"]');
        await messageButton.click();
        await page.waitForSelector('div[role="textbox"]');

        // Preparar el mensaje personalizado
        const messageBox = await page.$('div[role="textbox"]');
        const personalizedMessage = messageText.replace("[Nombre]", "Reclutador"); 
        await messageBox.type(personalizedMessage);
        await messageBox.press('Enter');

        // Registrar actividad en la base de datos
        logActivity("Reclutador", page.url(), personalizedMessage, 'sent');
        console.log("Mensaje enviado y actividad registrada con éxito.");

    } catch (error) {
        console.log("Error al enviar mensaje:", error);
        logActivity("Reclutador", page.url(), messageText, 'failed');
    }
}