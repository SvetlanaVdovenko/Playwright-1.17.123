import { expect } from "@playwright/test";

export class Checkout {
    constructor(page) {
        this.page = page;

        this.basketCards = page.locator('[data-qa="basket-card"]');
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
        this.removeFromBasketBtn = page.locator('[data-qa="basket-card-remove-item"]');
        this.continueToCheckoutBtn = page.locator('[data-qa="continue-to-checkout"]');
    }

    async removeCheapestProduct() {
        await this.basketCards.first().waitFor();
        const itemsBeforeRemoval = await this.basketCards.count();
        await this.basketItemPrice.first().waitFor();
        const allPriceTexts = await this.basketItemPrice.allInnerTexts();
        const justNumbers = allPriceTexts.map((element) => {
            const withoutDolarSign = element.replace("$", "");
            return parseInt(withoutDolarSign, 10);
        })
        const smallestPrice = Math.min(...justNumbers);
        const smallestPriceIndex = justNumbers.indexOf(smallestPrice);
        const specificRemoveBtn = this.removeFromBasketBtn.nth(smallestPriceIndex);
        await specificRemoveBtn.waitFor();
        await specificRemoveBtn.click();
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval -1);
    }

    async continueToCheckout() {
        await this.continueToCheckoutBtn.waitFor();
        await this.continueToCheckoutBtn.click();
        await this.page.waitForURL(/\/login/);

    }
}