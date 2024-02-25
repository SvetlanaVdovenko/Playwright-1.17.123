import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";
import { isDesctioViewport } from "../utils/isDesktopViewport";


export class ProductsPage {

    constructor(page) {
        this.page = page;

        this.addBtn = page.locator('[data-qa="product-button"]');
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
        this.productTitle = page.locator('[data-qa="product-title"]');
    }

    async visit() {
        await this.page.goto("/");
    }
    async sortByCheapest() {
        await this.sortDropdown.waitFor();
        await this.productTitle.first().waitFor();
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts();
        await this.sortDropdown.selectOption("price-asc");
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts();
        expect(productTitlesBeforeSorting).not.toEqual(productTitlesAfterSorting);
    }
    async addProductToBasket(index) {
        const specificAddBth = this.addBtn.nth(index);
        await specificAddBth.waitFor();
        await expect(specificAddBth).toHaveText("Add to Basket");
        const navigation = new Navigation(this.page);
        let basketCountBeforeAdding;
        if (isDesctioViewport(this.page)) {
            basketCountBeforeAdding = await navigation.getBasketCount();
        }
        await specificAddBth.click();
        await expect(specificAddBth).toHaveText("Remove from Basket");
        if (isDesctioViewport(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount();

            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
        }


    }
}