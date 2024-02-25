import { isDesctioViewport } from "../utils/isDesktopViewport";

export class Navigation {
    constructor(page) {
        this.page = page;

        this.basketCounter = page.locator('[data-qa="header-basket-count"]');
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' });
        this.mobileBurgerButton = page.locator('[data-qa="burger-button"]');
    }

    async getBasketCount () {
        await this.basketCounter.waitFor();
        const text = await this.basketCounter.innerText();
        return parseInt(text, 10);
    }

    async goToCheckout () {
        if(!isDesctioViewport(this.page)){
            await this.mobileBurgerButton.waitFor();
            await this.mobileBurgerButton.click();
        }
        await this.checkoutLink.waitFor();
        await this.checkoutLink.click();
        await this.page.waitForURL("/basket");
    }

}