import { expect, test, type Page } from '@playwright/test';

const galleryPath = '/galeria';
const photoPath = '/foto/montanas';

function photoLink(page: Page, id = 'montanas') {
  return page.locator(`[data-photo-id="${id}"]`);
}

async function openPhoto(page: Page, id = 'montanas') {
  await page.goto(galleryPath);
  await photoLink(page, id).click();

  const dialog = page.getByRole('dialog');
  await expect(page).toHaveURL(new RegExp(`/foto/${id}$`));
  await expect(dialog).toBeVisible();
  return dialog;
}

test('un enlace interno mantiene la galería montada; la misma URL abre el detalle en una pestaña nueva', async ({
  page,
  context,
}) => {
  await page.goto(galleryPath);
  const gallery = page.getByTestId('photo-grid');
  await expect(gallery).toBeVisible();
  const mountedGrid = await gallery.elementHandle();

  await photoLink(page).click();
  const dialog = page.getByRole('dialog');
  await expect(page).toHaveURL(new RegExp(`${photoPath}$`));
  await expect(dialog).toBeVisible();
  expect(await mountedGrid?.evaluate((grid) => grid.isConnected)).toBe(true);

  const [directPage] = await Promise.all([
    context.waitForEvent('page'),
    dialog.getByRole('link', { name: /Abrir como página/ }).click(),
  ]);
  await expect(directPage).toHaveURL(page.url());
  await expect(directPage.getByRole('dialog')).toHaveCount(0);
  await expect(directPage.getByTestId('photo-grid')).toHaveCount(0);
  await expect(directPage.getByTestId('photo-page')).toBeVisible();
  await expect(directPage.getByRole('heading', { level: 1, name: 'Entre montañas' })).toBeVisible();

  await directPage.getByRole('link', { name: 'Volver a la galería' }).click();
  await expect(directPage).toHaveURL(/\/galeria$/);
  await expect(directPage.getByTestId('photo-grid')).toBeVisible();
  await expect(directPage.getByRole('dialog')).toHaveCount(0);
});

test('recargar la URL interceptada convierte el modal en una página completa', async ({ page }) => {
  await openPhoto(page);
  const interceptedUrl = page.url();

  await page.reload();

  await expect(page).toHaveURL(interceptedUrl);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByTestId('photo-grid')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Volver a la galería' })).toBeVisible();
});

test('Atrás conserva scroll y galería; Adelante reabre el modal', async ({ page }) => {
  await page.goto(galleryPath);
  const link = photoLink(page, 'oasis');
  await link.scrollIntoViewIfNeeded();
  const scroll = await page.evaluate(() => window.scrollY);
  expect(scroll).toBeGreaterThan(0);

  await link.click();
  await expect(page).toHaveURL(/\/foto\/oasis$/);
  await expect(page.getByRole('dialog')).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/galeria$/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(link).toBeFocused();
  await expect.poll(async () => Math.abs(await page.evaluate(() => window.scrollY) - scroll)).toBeLessThan(4);

  await page.goForward();
  await expect(page).toHaveURL(/\/foto\/oasis$/);
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('el botón Cerrar vuelve al enlace de origen', async ({ page }) => {
  const dialog = await openPhoto(page);
  const close = dialog.getByRole('button', { name: 'Cerrar', exact: true });
  await expect(close).toBeFocused();

  await close.click();

  await expect(page).toHaveURL(/\/galeria$/);
  await expect(dialog).toHaveCount(0);
  await expect(photoLink(page)).toBeFocused();
});

test('el diálogo tiene nombre, mantiene el foco en su interior y Escape devuelve el foco', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'Recorrido de teclado de escritorio');
  await page.goto(galleryPath);
  const link = photoLink(page);
  await link.focus();
  await link.press('Enter');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName(/\S/);
  await expect(dialog.getByRole('button', { name: 'Cerrar', exact: true })).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('link', { name: /Abrir como página/ })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Cerrar', exact: true })).toBeFocused();
  await expect(link).not.toBeFocused();

  await page.keyboard.press('Escape');

  await expect(page).toHaveURL(/\/galeria$/);
  await expect(dialog).toHaveCount(0);
  await expect(link).toBeFocused();
});

test('un ID inexistente presenta un 404 con salida a la galería', async ({ page }) => {
  const response = await page.goto('/foto/no-existe');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Foto no encontrada' })).toBeVisible();
  await page.getByRole('link', { name: 'Volver a la galería' }).click();
  await expect(page).toHaveURL(/\/galeria$/);
});

test('todas las tarjetas tienen una imagen local y el detalle reutiliza la misma fuente', async ({
  page,
  request,
}, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'El catálogo es idéntico en ambos viewports');
  await page.goto(galleryPath);

  const sources = await page.getByTestId('photo-grid').locator('img').evaluateAll(
    (images) => images.map((image) => image.getAttribute('src')),
  );
  expect(sources.length).toBeGreaterThanOrEqual(12);
  expect(new Set(sources).size).toBe(sources.length);
  await Promise.all(sources.map(async (source) => {
    expect(source).toMatch(/^\/photos\/[a-z-]+\.jpg$/);
    const image = await request.get(source!);
    expect(image.ok()).toBe(true);
    expect(image.headers()['content-type']).toContain('image/jpeg');
  }));

  await photoLink(page).click();
  await expect(page.getByTestId('photo-detail').locator('img')).toHaveAttribute('src', sources[0]!);
});
