export class MyAccountPage {
    constructor(page){
        this.page = page;

        this.pageHeading = page.getByRole('heading', { name: 'My Account' });
    }

    async visit() {
        await this.page.goto('/my-account');
    }

    async waitForPageHeading() {
        await this.pageHeading.waitFor();
    }
}