import { test, expect } from '@playwright/test';

test('Submissão de pedido com campos vazios', async ({ page }) => {
  
    //  Navega até a loja
  await page.goto('https://verzel-store.qa-test-verzel-store.workers.dev/');

  
  await page.getByRole('article', { name: 'Calça Jeans Slim' }).getByRole('button').click();
  await page.getByRole('article', { name: 'Mochila Urbana 20L' }).getByRole('button').click();
  await page.getByRole('link', { name: 'Carrinho 2 itens no carrinho' }).click();
  
  await expect(page).toHaveURL('https://verzel-store.qa-test-verzel-store.workers.dev/carrinho');
  await page.getByRole('link', { name: 'Finalizar compra' }).click();

  await expect(page).toHaveURL('https://verzel-store.qa-test-verzel-store.workers.dev/checkout');
  
  await page.getByRole('textbox', { name: 'Nome completo' }).fill('');
  await page.getByRole('textbox', { name: 'E-mail' }).fill('');
  await page.getByRole('textbox', { name: 'CEP' }).fill('');
  await page.getByRole('button', { name: 'Confirmar pedido' }).click();

  await expect(page.getByText('Informe o nome completo.')).toBeVisible();
  await expect(page.getByText('Informe o e-mail.')).toBeVisible();
  await expect(page.getByText('Informe o CEP.')).toBeVisible();

  await expect(page).toHaveURL('https://verzel-store.qa-test-verzel-store.workers.dev/checkout');
  

});