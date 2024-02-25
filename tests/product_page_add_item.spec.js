import {test, expect} from "@playwright/test"

test.skip("Product Page Add to Basket", async ({page}) => {
    await page.goto("/");

    const addToBasketButton = page.locator('[data-qa="product-button"]').first();
    const basketCounter = page.locator('[data-qa="header-basket-count"]');
    
    await addToBasketButton.waitFor();
    await expect(addToBasketButton).toHaveText("Add to Basket");
    await expect(basketCounter).toHaveText('0');
    
    await addToBasketButton.click();

    await expect(basketCounter).toHaveText('1');
    await expect(addToBasketButton).toHaveText("Remove from Basket");
    
    const checkoutLink = page.getByRole('link', { name: 'Checkout' });
    await checkoutLink.waitFor();
    await checkoutLink.click();
    await page.waitForURL("/basket");

    //await page.pause();
})