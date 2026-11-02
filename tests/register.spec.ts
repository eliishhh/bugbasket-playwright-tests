import { test, expect } from "@playwright/test";

test('register button is enabled when all required fields are filled', async({page}) =>{
    await page.goto('/register');
    await page.getByRole('textbox', { name: 'Email'}).fill('name03+hw8@gmail.com');
    await page.getByRole('textbox', { name: 'First name'}).fill('namethree');
    await page.getByRole('textbox', { name: 'Last name'}).fill('three');
    await page.getByTestId('register-password-input').fill('TestPassword3');
    await page.getByTestId('register-confirm-password-input').fill('TestPassword3');
    await page.getByRole('checkbox', { name: 'I accept the Terms and Conditions'}).click();

    await expect(page.getByRole('button', { name: 'Register'})).toBeEnabled();
});

test('an invalid email is entered, register button is disabled', async({page}) => {
    await page.goto('/register');
    await page.getByRole('textbox', { name: 'Email'}).fill('name03+hw8');
    await page.getByRole('textbox', { name: 'First name'}).fill('namethree');
    await page.getByRole('textbox', { name: 'Last name'}).fill('three');
    await page.getByTestId('register-password-input').fill('TestPassword3');
    await page.getByTestId('register-confirm-password-input').fill('TestPassword3');
    await page.getByRole('checkbox', { name: 'I accept the Terms and Conditions'}).click();

    await expect(page.getByText('Enter a valid email')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register'})).toBeDisabled();
});

test('passwords do not match, register button is disabled', async({page}) => {
    await page.goto('/register');
    await page.getByRole('textbox', { name: 'Email'}).fill('name03+hw8@gmail.com');
    await page.getByRole('textbox', { name: 'First name'}).fill('namethree');
    await page.getByRole('textbox', { name: 'Last name'}).fill('three');
    await page.getByTestId('register-password-input').fill('TestPassword3');
    await page.getByTestId('register-confirm-password-input').fill('TestPassword');
    await page.getByRole('checkbox', { name: 'I accept the Terms and Conditions'}).click();

    await expect(page.getByText('Passwords do not match')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register'})).toBeDisabled();
});

test('forbidden characters are entered in Fisrt/Last name fields, register button is disabled', async({page}) => {
    await page.goto('/register');
    await page.getByRole('textbox', { name: 'Email'}).fill('name03+hw8@gmail.com');
    await page.getByRole('textbox', { name: 'First name'}).fill('namethree123');
    await page.getByRole('textbox', { name: 'Last name'}).fill('three123');
    await page.getByTestId('register-password-input').fill('TestPassword3');
    await page.getByTestId('register-confirm-password-input').fill('TestPassword3');
    await page.getByRole('checkbox', { name: 'I accept the Terms and Conditions'}).click();

    await expect(page.getByTestId('register-first-name-input-error')).toBeVisible();
    await expect(page.getByTestId('register-last-name-input-error')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register'})).toBeDisabled();
});

test('Terms and Conditions button is not cliked, register button is disabled', async({page}) => {
    await page.goto('/register');
    await page.getByRole('textbox', { name: 'Email'}).fill('name03+hw8@gmail.com');
    await page.getByRole('textbox', { name: 'First name'}).fill('namethree');
    await page.getByRole('textbox', { name: 'Last name'}).fill('three');
    await page.getByTestId('register-password-input').fill('TestPassword3');
    await page.getByTestId('register-confirm-password-input').fill('TestPassword3');
    
    const TermsAndConditions = page.getByRole('checkbox', { name: 'I accept the Terms and Conditions', checked: false});
    await expect(TermsAndConditions).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register'})).toBeDisabled();
});