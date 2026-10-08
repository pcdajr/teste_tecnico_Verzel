import { test, expect } from '@playwright/test';

test('Submissão de pedido com dados válidos', async ({ page }) => {
  
    //  Navega até a loja
  await page.goto('https://verzel-store.qa-test-verzel-store.workers.dev/');

  
  await page.getByRole('article', { name: 'Calça Jeans Slim' }).getByRole('button').click();
  await page.getByRole('article', { name: 'Mochila Urbana 20L' }).getByRole('button').click();
  
  await page.getByRole('link', { name: 'Carrinho 2 itens no carrinho' }).click();
  
  //await expect(page).toHaveURL('https://verzel-store.qa-test-verzel-store.workers.dev/carrinho');

 
  
  


});