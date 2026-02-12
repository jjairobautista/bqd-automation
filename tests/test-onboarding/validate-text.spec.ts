import { test, expect } from '@playwright/test';

/**
 * Pruebas de validación de textos en la página principal (Home)
 * bqd-frontend/app/page.tsx
 */
test.describe('Validación de textos - Página principal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe mostrar el badge "Tu banco digital de confianza"', async ({ page }) => {
    await expect(page.getByText('Tu banco digital de confianza')).toBeVisible();
  });

  test('debe mostrar el título principal "Financia tus sueños"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Financia tus\s*sueños/ })).toBeVisible();
  });

  test('debe mostrar la descripción de soluciones financieras', async ({ page }) => {
    await expect(
      page.getByText(
        'Soluciones financieras innovadoras diseñadas para impulsar tus proyectos y hacer crecer tus ideas con las mejores condiciones del mercado'
      )
    ).toBeVisible();
  });

  test('debe mostrar el enlace "Ir al Simulador" en el hero', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Ir al Simulador/ }).first()).toBeVisible();
  });

  test('debe mostrar el botón "Ver Productos"', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Ver Productos' })).toBeVisible();
  });

  test('debe mostrar el encabezado "Catálogo de Productos Financieros"', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Catálogo de Productos Financieros' })
    ).toBeVisible();
  });

  test('debe mostrar la descripción del catálogo de productos', async ({ page }) => {
    await expect(
      page.getByText(
        'Encuentra el crédito perfecto para tus necesidades. Cada producto está diseñado pensando en ti.'
      )
    ).toBeVisible();
  });

  test('debe mostrar los nombres de los tres productos de crédito', async ({ page }) => {
    await expect(page.getByText('Crédito Semilla')).toBeVisible();
    await expect(page.getByText('Crédito Impulso')).toBeVisible();
    await expect(page.getByText('Crédito Evolución')).toBeVisible();
  });

  test('debe mostrar la sección "Sobre QA Banco Digital"', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Sobre QA Banco Digital' })
    ).toBeVisible();
  });

  test('debe mostrar el párrafo sobre QA Banco Digital como institución', async ({ page }) => {
    await expect(
      page.getByText(/QA Banco Digital.*es una institución financiera innovadora/)
    ).toBeVisible();
  });

  test('debe mostrar el CTA "¿Listo para solicitar tu crédito?"', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: '¿Listo para solicitar tu crédito?' })
    ).toBeVisible();
  });

  test('debe mostrar el texto del CTA "Simula tu crédito ahora"', async ({ page }) => {
    await expect(
      page.getByText('Simula tu crédito ahora y descubre las mejores condiciones para ti')
    ).toBeVisible();
  });

  test('debe mostrar el segundo enlace "Ir al Simulador" en el CTA final', async ({ page }) => {
    const simuladorLinks = page.getByRole('link', { name: /Ir al Simulador/ });
    await expect(simuladorLinks).toHaveCount(2);
  });
});

test.describe('Validación de textos - Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
  });

  test('debe mostrar el nombre "QA Banco Digital" en el header', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: /QA Banco Digital/ }).first()
    ).toBeVisible();
  });

  test('debe mostrar los enlaces de navegación Productos y Nosotros', async ({ page }) => {
    await expect(page.getByRole('banner').getByRole('link', { name: 'Productos' })).toBeVisible();
    await expect(page.getByRole('banner').getByRole('link', { name: 'Nosotros' })).toBeVisible();
  });
});

test.describe('Validación de textos - Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe mostrar "QA Banco Digital" en el footer', async ({ page }) => {
    const footer = page.getByRole('contentinfo');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.getByText('QA Banco Digital', { exact: true })).toBeVisible();
  });

  test('debe mostrar el copyright en el footer', async ({ page }) => {
    await expect(
      page.getByText('© 2026 QA Banco Digital. Todos los derechos reservados.')
    ).toBeVisible();
  });
});
