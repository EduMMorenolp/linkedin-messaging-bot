
import { saveRecruiterNames } from '../db.js';

export async function collectRecruiterNames(page) {
    try {
        // Obtener los elementos de los reclutadores
        const recruiters = await page.$$('a.app-aware-link'); 

        // Array para almacenar los nombres
        const recruiterDataSet = new Set();

        for (const recruiter of recruiters) {
            // Extraer el nombre del reclutador
            const nameElement = await recruiter.$('span[dir="ltr"] > span[aria-hidden="true"]');            

            if (nameElement) {
                const name = await page.evaluate(element => element.innerText, nameElement);
                const href = await page.evaluate(element => element.href, recruiter);
                recruiterDataSet.add(`${name} - ${href}`);
            }
        }

        const recruiterNames = Array.from(recruiterDataSet);

        console.log('Nombres de reclutadores recolectados:', recruiterNames);
        
        // Guardar los nombres en la base de datos
        await saveRecruiterNames(recruiterNames);

    } catch (error) {
        console.error('Error al recolectar nombres de reclutadores:', error.message);
    }
}