/**
 * Viaive screen capture — runs Playwright against a deployed (or local) URL
 * and writes 18 routes × 2 viewports = 36 PNGs to docs/screens/.
 *
 *   PLAYWRIGHT_BASE_URL=https://staging.viaive.com pnpm tsx playwright/capture-screens.ts
 *
 * Locally:
 *   PLAYWRIGHT_BASE_URL=http://localhost:3000 pnpm tsx playwright/capture-screens.ts
 *
 * Requires:  pnpm add -D @playwright/test
 */

import { chromium, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const OUT_DIR = join(process.cwd(), "docs", "screens");

const ROUTES = [
  "/",
  "/start-planning",
  "/concierge",
  "/desks/hotel",
  "/desks/family",
  "/desks/safari",
  "/desks/asia",
  "/destinations/thailand",
  "/destinations/tokyo",
  "/destinations/paris",
  "/destinations/dubai",
  "/best/tokyo-hotels",
  "/best/paris-hotels",
  "/compare/villa-vs-hotel",
  "/compare/direct-vs-advisor-vs-portal",
  "/privacy",
  "/terms",
  "/affiliate-disclosure",
];

const VIEWPORTS: Array<{ name: "desktop" | "mobile"; viewport: { width: number; height: number }; deviceScaleFactor: number; userAgent?: string }> = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  {
    name: "mobile",
    viewport: devices["iPhone 14 Pro"].viewport,
    deviceScaleFactor: devices["iPhone 14 Pro"].deviceScaleFactor,
    userAgent: devices["iPhone 14 Pro"].userAgent,
  },
];

function fileNameFor(route: string, viewport: "desktop" | "mobile") {
  const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
  return `${slug}-${viewport}.png`;
}

async function captureRoute(route: string) {
  for (const vp of VIEWPORTS) {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: vp.viewport,
      deviceScaleFactor: vp.deviceScaleFactor,
      userAgent: vp.userAgent,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const url = new URL(route, BASE).toString();

    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
      // Suppress NovaExitIntent so it never appears in screens
      await page.evaluate(() => sessionStorage.setItem("nova:fired", "1"));
      // Give Stay22 iframes a beat to render
      await page.waitForTimeout(2_000);

      const out = join(OUT_DIR, fileNameFor(route, vp.name));
      await page.screenshot({ path: out, fullPage: true });
      console.log(`✓ ${route} [${vp.name}] → ${out}`);
    } catch (err) {
      console.error(`✗ ${route} [${vp.name}]:`, err);
    } finally {
      await context.close();
      await browser.close();
    }
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Capturing ${ROUTES.length} routes × ${VIEWPORTS.length} viewports against ${BASE}\n`);
  for (const route of ROUTES) {
    await captureRoute(route);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
