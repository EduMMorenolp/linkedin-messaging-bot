import { searchQuery } from '../config.js';

export async function searchContacts(page) {
    await page.goto(`https://www.linkedin.com/search/results/people/?keywords=${searchQuery}`);
    await page.waitForSelector('.reusable-search__result-container');

    // Devuelve una lista de contactos que se encuentran en los resultados de búsqueda
    const contacts = await page.$$('.reusable-search__result-container');
    console.log(`Se encontraron ${contacts.length} contactos para enviar mensajes.`);
    return contacts;
}