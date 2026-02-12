import { test, expect } from '@playwright/test';

/**
 * Pruebas de validación de la página Simulador de Créditos
 * bqd-frontend/app/simulador/page.tsx
 */
test.describe('Simulador de Créditos - Textos estáticos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/simulador');
  });

  test('debe mostrar el badge "Calcula tu crédito"', async ({ page }) => {
    await expect(page.getByText('Calcula tu crédito')).toBeVisible();
  });

  test('debe mostrar el título "Simulador de Créditos"', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Simulador de Créditos', level: 1 })
    ).toBeVisible();
  });

  test('debe mostrar la descripción del simulador', async ({ page }) => {
    await expect(
      page.getByText(
        'Ingresa el monto y plazo deseado para conocer tu cuota mensual en tiempo real'
      )
    ).toBeVisible();
  });

  test('debe mostrar el header con QA Banco Digital', async ({ page }) => {
    await expect(
      page.getByRole('banner').getByRole('link', { name: /QA Banco Digital/ })
    ).toBeVisible();
  });
});

test.describe('Simulador de Créditos - Formulario', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/simulador');
  });

  test('debe mostrar el encabezado "Datos del Crédito"', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Datos del Crédito', level: 2 })
    ).toBeVisible();
  });

  test('debe mostrar el label "Monto del Crédito (COP)"', async ({ page }) => {
    await expect(page.getByText('Monto del Crédito (COP)', { exact: true })).toBeVisible();
  });

  test('debe mostrar el input de monto con placeholder', async ({ page }) => {
    await expect(page.getByPlaceholder('100.000')).toBeVisible();
  });

  test('debe mostrar el rango permitido del monto', async ({ page }) => {
    await expect(page.getByText('Rango: $100.000 - $5.000.000 COP')).toBeVisible();
  });

  test('debe mostrar el label "Plazo (meses)"', async ({ page }) => {
    await expect(page.getByText('Plazo (meses)', { exact: true })).toBeVisible();
  });

  test('debe tener el select de plazo con opciones del 1 al 12', async ({ page }) => {
    const select = page.getByRole('combobox');
    await expect(select).toBeVisible();
    await expect(select).toHaveValue('12');
    await select.selectOption('6');
    await expect(select).toHaveValue('6');
  });
});

test.describe('Simulador de Créditos - Información importante', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/simulador');
  });

  test('debe mostrar el encabezado "Información Importante"', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Información Importante', level: 3 })
    ).toBeVisible();
  });

  test('debe mostrar el texto sobre tasa según monto', async ({ page }) => {
    await expect(
      page.getByText('La tasa de interés se determina automáticamente según el monto solicitado.')
    ).toBeVisible();
  });

  test('debe mostrar el texto sobre monto máximo', async ({ page }) => {
    await expect(
      page.getByText('El monto máximo permitido es $5.000.000 COP.')
    ).toBeVisible();
  });

  test('debe mostrar el texto sobre simulación estimación', async ({ page }) => {
    await expect(
      page.getByText(/La simulación es una estimación. Las condiciones finales pueden variar/)
    ).toBeVisible();
  });
});

test.describe('Simulador de Créditos - Interacciones y resultados', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/simulador');
  });

  test('al ingresar monto válido de Crédito Semilla muestra producto y resumen', async ({
    page,
  }) => {
    const inputMonto = page.getByPlaceholder('100.000');
    await inputMonto.click();
    await inputMonto.fill('300000');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('heading', { name: 'Crédito Semilla' })).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText('Resumen de tu Crédito')).toBeVisible();
    await expect(page.getByText('Cuota Mensual:')).toBeVisible();
    await expect(page.getByText('Total a Pagar:')).toBeVisible();
    await expect(page.getByText('Número de Cuotas:')).toBeVisible();
  });

  test('al ingresar monto menor al mínimo muestra error', async ({ page }) => {
    const inputMonto = page.getByPlaceholder('100.000');
    await inputMonto.click();
    await inputMonto.fill('50000');
    await page.keyboard.press('Tab');
    await expect(page.getByText('El monto mínimo es $100.000 COP')).toBeVisible({
      timeout: 10000,
    });
  });

  test('al ingresar monto de Crédito Impulso muestra ese producto', async ({ page }) => {
    const inputMonto = page.getByPlaceholder('100.000');
    await inputMonto.click();
    await inputMonto.fill('600000');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('heading', { name: 'Crédito Impulso' })).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText('Consumo de rango medio')).toBeVisible();
  });

  test('al ingresar monto de Crédito Evolución muestra ese producto', async ({ page }) => {
    const inputMonto = page.getByPlaceholder('100.000');
    await inputMonto.click();
    await inputMonto.fill('2000000');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('heading', { name: 'Crédito Evolución' })).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText('Crédito Preferencial')).toBeVisible();
  });

  test('al cambiar el plazo se actualiza el resumen', async ({ page }) => {
    const inputMonto = page.getByPlaceholder('100.000');
    await inputMonto.click();
    await inputMonto.fill('500000');
    await page.keyboard.press('Tab');
    await expect(page.getByText('Resumen de tu Crédito')).toBeVisible({ timeout: 10000 });
    const selectPlazo = page.getByRole('combobox');
    await selectPlazo.selectOption('3');
    await expect(selectPlazo).toHaveValue('3');
    await expect(page.getByText('Número de Cuotas:')).toBeVisible();
  });
});
