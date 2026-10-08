import { test, expect } from '@playwright/test';

test('Aplicação de cupom válido com desconto', async ({ page }) => {
  //  Navega até a loja
  await page.goto('https://verzel-store.qa-test-verzel-store.workers.dev/');


  await page.getByRole('article', { name: 'Camiseta Essencial' }).getByRole('button').click();
  //await page.getByRole('article', { name: 'Calça Jeans Slim' }).getByRole('button').click();
  //await page.getByRole('article', { name: 'Tênis Casual Urbano' }).getByRole('button').click();
  await page.getByRole('article', { name: 'Boné Aba Curva' }).getByRole('button').click();
  await page.getByRole('article', { name: 'Mochila Urbana 20L' }).getByRole('button').click();
  //await page.getByRole('article', { name: 'Kit 3 Pares de Meias' }).getByRole('button').click();
  //await page.locator('li:nth-child(7) > article > .produto-corpo > .botao').click();
  await page.locator('li:nth-child(8) > article > .produto-corpo > .botao').click();

  await page.getByRole('link', { name: 'Carrinho 4 itens no carrinho' }).click();
  
  
  await expect(page).toHaveURL('https://verzel-store.qa-test-verzel-store.workers.dev/carrinho');

  // aplicando cupom com caica baixa
  await page.getByRole('textbox', { name: 'Cupom de desconto' }).fill('bemvindo10');
  await page.getByRole('button', { name: 'Aplicar cupom' }).click();

  
  // Garante que o elemento está visível E que o valor após o R$ não é zero
  await expect(page.getByText('R$ 0,00')).not.toBeVisible();
  await expect(page.getByText('- R$')).toBeVisible();
  await expect(page.getByText('Cupom BEMVINDO10 aplicado.')).toBeVisible();


});