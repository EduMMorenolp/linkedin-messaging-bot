
import { linkedinEmail, linkedinPassword } from './config.js';

export async function loginToLinkedIn(page) {
    await page.goto('https://www.linkedin.com/login');
    await page.type('#username', linkedinEmail);
    await page.type('#password', linkedinPassword);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    console.log("Inicio de sesión exitoso en LinkedIn.");
}