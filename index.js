import puppeteer from 'puppeteer';
import { loginToLinkedIn } from './src/auth.js';
import { searchContacts } from './src/searchContacts.js';
import { sendMessage } from './src/messageSender.js';

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await loginToLinkedIn(page);

    const contacts = await searchContacts(page, 'recruiter');
    for (let contact of contacts) {
        await sendMessage(page, contact);
        await page.waitForTimeout(3000); // Pausa entre mensajes para evitar bloqueos
    }

    await browser.close();
})();