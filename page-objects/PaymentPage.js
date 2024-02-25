import { expect } from '@playwright/test';
import { parse } from 'uuid';

export class PaymentPage {
    constructor(page) {
        this.page = page;

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
            .locator('[data-qa="discount-code"]');
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]');
        this.submitDiscountBtn = page.locator('[data-qa="submit-discount-button"]');
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]');
        this.totalValue = page.locator('[data-qa="total-value"]');
        this.totalWithDiscount = page.locator('[data-qa="total-with-discount-value"]');
        this.creditCardOwner = page.locator('[data-qa="credit-card-owner"]');
        this.creditCardNumber = page.locator('[data-qa="credit-card-number"]');
        this.validUntil = page.locator('[data-qa="valid-until"]');
        this.creditCardCvv = page.locator('[data-qa="credit-card-cvc"]');
        this.payBtn = page.locator('[data-qa="pay-button"]');

    }

    async activateDiscount() {
        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();
        await this.discountCodeInput.waitFor();
        await this.discountCodeInput.fill(code);
        await expect(this.discountCodeInput).toHaveValue(code);
        await expect(this.discountActiveMessage).not.toBeVisible();
        await this.submitDiscountBtn.waitFor();
        await this.submitDiscountBtn.click();
        await this.discountActiveMessage.waitFor();
        expect(await this.discountActiveMessage.innerText()).toBe('Discount activated!');
        await this.totalValue.waitFor();
        await this.totalWithDiscount.waitFor();
        const totalWithoutDiscount = await this.totalValue.innerText();
        const totalWithDiscount = await this.totalWithDiscount.innerText();
        expect(parseFloat(totalWithoutDiscount)).toBeGreaterThan(parseFloat(totalWithDiscount));
    
    }
    async fillPaymentDetails(paymentDetails) {
        await this.creditCardOwner.waitFor();
        await this.creditCardOwner.fill(paymentDetails.creditCardOwner);
        await this.creditCardNumber.waitFor();
        await this.creditCardNumber.fill(paymentDetails.creditCardNumber);
        await this.validUntil.waitFor();
        await this.validUntil.fill(paymentDetails.validUntil);
        await this.creditCardCvv.waitFor();
        await this.creditCardCvv.fill(paymentDetails.creditCardCvv);
    }
    async completePayment() {
        await this.payBtn.waitFor();
        await this.payBtn.click();
        await this.page.waitForURL('thank-you');
    }
}