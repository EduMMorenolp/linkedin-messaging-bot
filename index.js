import puppeteer from 'puppeteer';
import { loginToLinkedIn } from './src/auth.js';
import { searchContacts } from './src/intruciones/searchContacts.js';
import { sendMessage } from './src/intruciones/messageSender.js';
import { collectRecruiterNames } from './src/intruciones/collectRecruiterNames.js';

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await loginToLinkedIn(page);

    const contacts = await searchContacts(page, 'recruiter');
    for (let contact of contacts) {
        // await sendMessage(page, contact);
    }

    await collectRecruiterNames(page);

    // await browser.close();
})();