import { test, expect } from '@playwright/test';

test('guest can add a product to a cart', async({page}) =>{
    await page.goto('/');
    await page.getByRole('button', { name: 'Add Magnetic Building Tiles (60 pcs) to cart'}).click();
    await page.getByTestId('toast-success');
    await page.getByRole('link', { name: 'Cart, 1 item' });
    await page.goto('/cart');
    
    await expect(page.getByTestId('cart-line-name')).toHaveText('Magnetic Building Tiles (60 pcs)');
    await expect(page.getByTestId('cart-line-total')).toHaveText('₴1,690.00');
});