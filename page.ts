import { Page, expect } from '@playwright/test';

export class ShopPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  searchbox = () => {
    return this.page.locator('#twotabsearchtextbox');
  }

  productLink = (productName: string) => {
    return this.page.getByRole('listitem').getByRole('link', { name: productName });
  }

  continueShoppingButton = () => {
    return this.page.getByLabel('Continue Shopping', { exact: true });
  }

  addToCartButton = () => {
    return this.page.locator('input#add-to-cart-button');
  }

  itemPrice = () => {
    return this.page.locator('#apex_offerDisplay_desktop').locator('.a-offscreen').first();
  }

  goToCartButton = () => {
    return this.page.getByRole('link', { name: 'Go to Cart' });
  }

  cartSubtotalPrice = () => {
    return this.page.locator('#sc-subtotal-amount-activecart').locator('span');
  }

  cartItemCount = () => {
    return this.page.locator('#sc-subtotal-label-activecart');
  }

  proceedToCheckoutButton = () => {
    return this.page.locator('input[name="proceedToRetailCheckout"]');
  }

  emailInput = () => {
    return this.page.locator('input#ap_email_login[name="email"]');
  }

  continueButton = () => {
    return this.page.locator('input.a-button-input');
  }

  async search(term: string): Promise<void> {
    await this.searchbox().fill(term);
    await this.searchbox().press('Enter');
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async selectProductAndGetPrice(name: string){
    await this.productLink(name).first().click();
    await expect(this.page.getByText('About this item').first()).toBeVisible();
    const price = await this.itemPrice().textContent();
    return price
  }

  async verifyCart(price: string | null, itemCount: string) {
    await this.goToCartButton().first().click();
    expect(await this.cartSubtotalPrice().textContent()).toEqual(price);
    expect(await this.cartItemCount()).toContainText(itemCount);
  }
  
  async verifyInvalidEmail(invalidEmail: string) {
    await this.emailInput().fill(invalidEmail);
    await this.continueButton().click();
    await expect(this.page.getByText('Invalid email address')).toBeVisible();
  }

}

export default ShopPage;


