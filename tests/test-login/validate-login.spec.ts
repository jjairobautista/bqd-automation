import { test, expect } from '@playwright/test';

/**
 * Pruebas del modal de login y mensaje de error 500
 * bqd-frontend/components/Header.tsx + LoginModal.tsx
 */
test.describe('Login - Modal y flujo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe mostrar el botón Iniciar sesión en el header', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /Iniciar sesión/i })
    ).toBeVisible();
  });

  test('al hacer clic en Iniciar sesión debe abrir el modal de login', async ({ page }) => {
    await page.getByRole('button', { name: /Iniciar sesión/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Iniciar sesión', level: 2 })
    ).toBeVisible();
    await expect(
      page.getByText('Ingresa tus credenciales para continuar')
    ).toBeVisible();
  });

  test('el modal debe tener campos de email y contraseña', async ({ page }) => {
    await page.getByRole('button', { name: /Iniciar sesión/i }).click();
    await expect(page.getByLabel(/Correo electrónico/i)).toBeVisible();
    await expect(page.getByLabel(/Contraseña/i)).toBeVisible();
    await expect(page.getByPlaceholder('tu@email.com')).toBeVisible();
  });

  test('al enviar el formulario debe mostrarse el error 500', async ({ page }) => {
    await page.getByRole('button', { name: /Iniciar sesión/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByLabel(/Correo electrónico/i).fill('usuario@ejemplo.com');
    await page.getByLabel(/Contraseña/i).fill('miPassword123');
    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(
      page.getByRole('alert').filter({ hasText: 'Error 500' })
    ).toBeVisible();
    await expect(
      page.getByText('Error 500: Error interno del servidor')
    ).toBeVisible();
  });

  test('el modal se cierra al hacer clic en Cancelar', async ({ page }) => {
    await page.getByRole('button', { name: /Iniciar sesión/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });
});
