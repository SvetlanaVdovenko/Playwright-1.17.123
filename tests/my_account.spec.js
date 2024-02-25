
import { test } from '@playwright/test'
import { MyAccountPage } from '../page-objects/MyAccountPage.js';
import { getLoginToken } from '../api-calls/getLoginToken.js';
import { adminDetails } from '../data/UserDetails.js';

test.skip('My account using cookie injection', async ({ page }) => {
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password);
    const myAccount = new MyAccountPage(page);
    await myAccount.visit();
    await page.evaluate(([loginTokenInsideBrowser]) => {
        document.cookie = "token" + loginTokenInsideBrowser
    }, [loginToken]);
    await myAccount.visit();
    await myAccount.waitForPageHeading();
})