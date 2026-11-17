import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:3417';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  workers: process.env.CI ? 2 : 4,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'pnpm start --hostname 127.0.0.1 --port 3417',
    url: baseURL + '/galeria',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
