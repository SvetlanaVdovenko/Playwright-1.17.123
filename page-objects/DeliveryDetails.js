import { expect } from "@playwright/test";
export class DeliveryDetails {
    constructor(page) {
        this.page = page;

        this.firstName = page.getByPlaceholder('First name');
        this.lastName = page.getByPlaceholder('Last name');
        this.street = page.getByPlaceholder('Street');
        this.postCode = page.getByPlaceholder('Post code');
        this.city = page.getByPlaceholder('City');
        this.countryDropDown = page.locator('[data-qa="country-dropdown"]');
        this.saveAddressBtn = page.locator('[data-qa="save-address-button"]');
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]');
        this.savedFirstName = page.locator('[data-qa="saved-address-firstName"]');
        this.savedLastName = page.locator('[data-qa="saved-address-lastName"]');
        this.savedStreet = page.locator('[data-qa="saved-address-street"]');
        this.savedPostCode = page.locator('[data-qa="saved-address-postcode"]');
        this.savedCity = page.locator('[data-qa="saved-address-city"]');
        this.savedCountry = page.locator('[data-qa="saved-address-country"]');
        this.continueToPaymentBtn = page.locator('[data-qa="continue-to-payment-button"]');
    }

    async fillDetails(userAddress) {
        await this.firstName.waitFor();
        await this.firstName.fill(userAddress.firstName);
        await this.lastName.waitFor();
        await this.lastName.fill(userAddress.lastName);
        await this.street.waitFor();
        await this.street.fill(userAddress.street);
        await this.postCode.waitFor();
        await this.postCode.fill(userAddress.postCode);
        await this.city.waitFor();
        await this.city.fill(userAddress.city);
        await this.countryDropDown.waitFor();
        await this.countryDropDown.selectOption(userAddress.country);

    }

    async saveDetails() {
        await this.saveAddressBtn.waitFor();
        const countAddressContainersBeforeSaving = await this.savedAddressContainer.count();
        await this.saveAddressBtn.click();
        await this.savedAddressContainer.waitFor();
        await expect(this.savedAddressContainer).toHaveCount(countAddressContainersBeforeSaving +1);
        await this.savedFirstName.waitFor();
        expect(await this.savedFirstName.first().innerText()).toBe(await this.firstName.inputValue());
        expect(await this.savedLastName.innerText()).toBe(await this.lastName.inputValue());
        expect(await this.savedStreet.innerText()).toBe(await this.street.inputValue());
        expect(await this.savedPostCode.innerText()).toBe(await this.postCode.inputValue());
        expect(await this.savedCountry.innerText()).toBe(await this.countryDropDown.inputValue());
    }

    async continueToPayment() {
        await this.continueToPaymentBtn.waitFor();
        await this.continueToPaymentBtn.click();
        await this.page.waitForURL('/payment');
    }
}