import { test, expect } from '@playwright/test';

test('Concessão de frete grátis no limite de R$ 200,00', async ({ page }) => {
  //  Navega até a loja
  await page.goto('https://verzel-store.qa-test-verzel-store.workers.dev/');


  //await page.getByRole('article', { name: 'Camiseta Essencial' }).getByRole('button').click();
  //await page.getByRole('article', { name: 'Calça Jeans Slim' }).getByRole('button').click();
  //await page.getByRole('article', { name: 'Tênis Casual Urbano' }).getByRole('button').click();
  //await page.getByRole('article', { name: 'Boné Aba Curva' }).getByRole('button').click();
  await page.getByRole('article', { name: 'Mochila Urbana 20L' }).getByRole('button').click();
  //await page.getByRole('article', { name: 'Kit 3 Pares de Meias' }).getByRole('button').click();
  //await page.locator('li:nth-child(7) > article > .produto-corpo > .botao').click();
  //await page.locator('li:nth-child(8) > article > .produto-corpo > .botao').click();

  await page.getByRole('link', { name: 'Carrinho 1 itens no carrinho' }).click();
  
  
  await expect(page).toHaveURL('https://verzel-store.qa-test-verzel-store.workers.dev/carrinho');

  // clicando para chegar no valor de R$ 200,00 e verificar se o frete grátis foi aplicado
  await page.getByRole('button', { name: 'Aumentar quantidade de' }).click();
  await expect(page.getByRole('definition').filter({ hasText: 'R$ 200,00' })).toBeVisible();
  // verificando se o frete grátis foi aplicado
  await expect(page.getByText('R$ 0,00')).toBeVisible();
  
  


});