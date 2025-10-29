import { test } from '@playwright/test';
import { ShopPage } from './page';
import { AMAZON_HOME_URL, INVALID_EMAIL, Products } from './constants';

test('amazon candle purchase flow', async ({ page }) => {
  test.setTimeout(60000);
  
  const shopPage = new ShopPage(page);
  await shopPage.goto(AMAZON_HOME_URL);
  await shopPage.search(Products.MENS_SCENTED_CANDLE);
  await shopPage.continueShoppingButton().click();
  const price = await shopPage.selectProductAndGetPrice(Products.MENS_SCENTED_CANDLE);
  await shopPage.addToCartButton().first().click();
  await shopPage.verifyCart(price, '1 item')
  await shopPage.proceedToCheckoutButton().click();
  await shopPage.verifyInvalidEmail(INVALID_EMAIL);
});


