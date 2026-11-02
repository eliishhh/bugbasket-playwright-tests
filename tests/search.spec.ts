import { test, expect } from "@playwright/test";

test('search finds the plush bear bruno', async ({ page }) => {
    await page.goto('/');
    const searchBox = page.getByRole('searchbox', { name: 'Search products' });
    await searchBox.fill('bear');
    await searchBox.press('Enter');

    await expect(page).toHaveURL(/q=bear/);
    await expect(page.getByTestId('catalog-result-count')).toHaveText('1 product');
    await expect(page.getByTestId('product-card-name')).toHaveText('Plush Bear Bruno');
});

test('no matches shows an empty state', async ({ page }) => {
    await page.goto('/products?q=fvjfnvkdfjv');
    
    await expect(page.getByTestId('catalog-result-count')).toHaveText('0 products');
});