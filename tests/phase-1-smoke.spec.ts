import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('application loads and renders the interactive map', async ({ page }) => {
  await expect(page).toHaveTitle(/Lanka Map/i);
  await expect(page.locator('#map canvas.maplibregl-canvas')).toBeVisible();
  await expect(page.getByRole('button', { name: /My location/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Sri Lanka/i })).toBeVisible();
});

test('place search shows a result and selects its coordinates', async ({ page }) => {
  await page.route('https://nominatim.openstreetmap.org/**', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify([{
        place_id: 123,
        display_name: 'Galle Fort, Galle, Sri Lanka',
        lon: '80.2170',
        lat: '6.0260'
      }])
    });
  });

  await page.locator('#query').fill('Galle Fort');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.locator('.result')).toContainText('Galle Fort');
  await page.locator('.result').click();
  await expect(page.locator('#coord')).toContainText('6.026');
  await expect(page.locator('#report')).toBeEnabled();
});

test('map click selects a point for a road report', async ({ page }) => {
  const canvas = page.locator('#map canvas.maplibregl-canvas');
  await expect(canvas).toBeVisible();
  const bounds = await canvas.boundingBox();
  if (!bounds) throw new Error('Map canvas has no visible bounds');
  await page.mouse.click(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await expect(page.locator('#coord')).toContainText('Map point');
  await expect(page.locator('#report')).toBeEnabled();
});

test('GPS recording can start, collect a point and stop', async ({ page, context }) => {
  await context.grantPermissions(['geolocation']);
  await context.setGeolocation({
    latitude: 6.9271,
    longitude: 79.8612,
    accuracy: 8
  });

  await page.getByRole('button', { name: /Start/i }).click();
  await expect(page.locator('#trackStatus')).toContainText('GPS points: 1', { timeout: 15_000 });

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /Stop/i }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/road-gps-track-.*\.geojson/);
  await expect(page.getByRole('button', { name: /Start/i })).toBeEnabled();
});
