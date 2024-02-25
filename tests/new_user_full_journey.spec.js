import {test} from '@playwright/test';
import { ProductsPage } from '../page-objects/ProductsPage';
import { Navigation } from '../page-objects/Navigation';
import { Checkout } from '../page-objects/Checkout';
import { LoginPage } from '../page-objects/LoginPage';
import { RegisterPage } from '../page-objects/RegisterPage';
import { DeliveryDetails } from '../page-objects/DeliveryDetails';
import { deliveryDetails as userAddress} from '../data/DeliveryDetails';
import { PaymentPage } from '../page-objects/PaymentPage';
import { paymentDetails } from '../data/PaymentDetails';

test("New user full end-to-end test journey", async ({page}) => {
    const productPage = new ProductsPage(page);
    await productPage.visit();
    await productPage.sortByCheapest();
    await productPage.addProductToBasket(0);
    await productPage.addProductToBasket(1);
    await productPage.addProductToBasket(2);
    
    const navigation = new Navigation(page);
    await navigation.goToCheckout();
    
    const checkout = new Checkout(page);
    await checkout.removeCheapestProduct();
    await checkout.continueToCheckout();
    
    const login = new LoginPage(page);
    await login.goToRegister();
    
    const registerPage = new RegisterPage(page);
    await registerPage.singInAsANewUser();
    
    const deliveryDetails = new DeliveryDetails(page);
    await deliveryDetails.fillDetails(userAddress);
    await deliveryDetails.saveDetails();
    await deliveryDetails.continueToPayment();
    
    const paymentPage = new PaymentPage(page);
    await paymentPage.activateDiscount();
    await paymentPage.fillPaymentDetails(paymentDetails);
    await paymentPage.completePayment();
})