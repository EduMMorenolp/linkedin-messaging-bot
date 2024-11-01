
import { clearScreenDown } from 'readline';
import { saveRecruiterNames } from '../db.js';

export async function collectRecruiterNames(page) {
    try {
        // Inicializa un conjunto para almacenar los nombres únicos
        const allRecruiterDataSet = new Set();

        // Usar un bucle para recorrer múltiples páginas
        while (true) {
            // Obtener los elementos de los reclutadores
            const recruiters = await page.$$('a.app-aware-link');

            for (const recruiter of recruiters) {
                // Extraer el nombre del reclutador
                const nameElement = await recruiter.$('span[dir="ltr"] > span[aria-hidden="true"]');

                if (nameElement) {
                    const name = await page.evaluate(element => element.innerText, nameElement);
                    const href = await page.evaluate(element => element.href, recruiter);
                    allRecruiterDataSet.add(`${name} - ${href}`);
                }
            }

            const recruiterNames = Array.from(allRecruiterDataSet);
            console.log('Nombres de reclutadores recolectados en esta página:', recruiterNames);

            // Guardar los nombres en la base de datos
            await saveRecruiterNames(recruiterNames);

            await page.evaluate(async () => {
                let lastHeight = 0;
                while (true) {
                    // Hacer scroll hacia abajo
                    window.scrollTo(0, document.body.scrollHeight);
                    
                    // Esperar un poco para que se cargue el contenido
                    await new Promise(resolve => setTimeout(resolve, 1000));
            
                    // Calcular la nueva altura de la página
                    const newHeight = document.body.scrollHeight;
            
                    // Si la altura no ha cambiado, significa que hemos llegado al final
                    if (newHeight === lastHeight) break;
                    lastHeight = newHeight;
                }
            });

            // Seleccionar el botón "Siguiente"
            const nextButton = await page.$('button.artdeco-button.artdeco-pagination__button--next[aria-label="Siguiente"]');

            if (nextButton) {
                console.log('Botón Siguiente encontrado');
                await nextButton.click();
            } else {
                console.log('Botón Siguiente no encontrado.');
                break
            }
        }

        console.log('Proceso de recolección completado.');

    } catch (error) {
        console.error('Error al recolectar nombres de reclutadores:', error.message);
    }
}