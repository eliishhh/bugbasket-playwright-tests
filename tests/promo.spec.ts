import { test, expect } from "@playwright/test";

test('a logged in user can use a valid promocode', async({page}) =>{
    await page.goto('/login');
    await page.getByLabel('Email').fill('name01+hw8@gmail.com');
    await page.getByLabel('Password').fill('Student123');
    await page.getByRole('button', { name: 'Log in'}).click();

    await expect(page.getByRole('button', { name: 'Log out'})).toBeVisible();
    await expect(page).toHaveURL('/')

    await page.getByRole('button', { name: 'Add Clean Code Handbook to cart'}).click();

    await expect(page.getByTestId('toast-success')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cart, 1 item'})).toBeVisible();
    await page.goto('/cart');

    await expect(page.getByTestId('cart-line-name')).toHaveText('Clean Code Handbook');
    await expect(page.getByTestId('cart-line-total')).toHaveText('₴899.00');

    await page.getByLabel('Promo code').fill('SAVE100');
    await page.getByRole('button', { name: 'Apply'}).click();

    await expect(page.getByTestId('promo-applied-code')).toHaveText('SAVE100');
    await expect(page.getByTestId('cart-discount')).toHaveText('−₴100.00');
});

test('a logged in user enters an invalid promocode', async({page}) =>{
    await page.goto('/login');
    await page.getByLabel('Email').fill('name02+hw8@gmail.com');
    await page.getByLabel('Password').fill('Student123');
    await page.getByRole('button', { name: 'Log in'}).click();

    await expect(page.getByRole('button', { name: 'Log out'})).toBeVisible();
    await expect(page).toHaveURL('/')

    await page.getByRole('button', { name: 'Add Magnetic Building Tiles (60 pcs) to cart'}).click();

    await expect(page.getByTestId('toast-success')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cart, 1 item'})).toBeVisible();
    await page.goto('/cart');

    await expect(page.getByTestId('cart-line-name')).toHaveText('Magnetic Building Tiles (60 pcs)');
    await expect(page.getByTestId('cart-line-total')).toHaveText('₴1,690.00');

    await page.getByLabel('Promo code').fill('WRONGPROMOCODE');
    await page.getByRole('button', { name: 'Apply'}).click();

    await expect(page.getByTestId('promo-error')).toHaveText('Promo code not found');
});

test.afterEach(async({page}) => {
    await page.goto('/cart');
    await page.getByRole('button', { name: 'Clear cart'}).click();
    await page.getByTestId('cart-clear-confirm-btn').click();
    await expect(page.getByRole('heading', { name: 'Your cart is empty'})).toBeVisible();
});