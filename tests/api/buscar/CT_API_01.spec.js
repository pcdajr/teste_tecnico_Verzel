const { test, expect } = require('@playwright/test');

const API_URL =
  'https://verzel-store.qa-test-verzel-store.workers.dev/api/produtos';

test('CT_API_01 - lista todos os produtos', async ({ request }) => {
  const response = await request.get(API_URL);
  const statusCode = response.status();
  const products = await response.json();

  console.log('Status code:', statusCode);
  console.log('JSON:', JSON.stringify(products, null, 2));

  expect(statusCode).toBe(200);
  expect(Array.isArray(products)).toBe(true);
  expect(products.length).toBeGreaterThan(0);

  const productIds = products.map((product) => {
    expect(product).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        nome: expect.any(String),
        preco: expect.any(Number),
        descricao: expect.any(String),
        categoria: expect.any(String),
      }),
    );

    return product.id;
  });

  expect(new Set(productIds).size).toBe(productIds.length);
});