import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);
const lonjakCampaignAssets = [
  "lonjak-campaign-home.webp",
  "lonjak-campaign-path.webp",
  "lonjak-campaign-profile.webp",
  "lonjak-campaign-notes.webp",
];
const cafeAssets = [
  "cafe-home.webp",
  "cafe-menu.webp",
  "cafe-customize.webp",
  "cafe-cart.webp",
  "cafe-checkout.webp",
  "cafe-review.webp",
  "cafe-confirmed.webp",
  "cafe-tracking.webp",
  "cafe-location.webp",
  "cafe-orders.webp",
  "cafe-rewards.webp",
];
const cafeCampaignAssets = [
  "cafe-campaign-home.webp",
  "cafe-campaign-menu.webp",
  "cafe-campaign-history.webp",
];
const commitmentAssets = [
  "commitment-dashboard.webp",
  "commitment-bills.webp",
  "commitment-create.webp",
  "commitment-planner.webp",
  "commitment-insights.webp",
  "commitment-categories.webp",
  "commitment-history.webp",
  "commitment-schedule.webp",
];

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished portfolio shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Syafi Adil — Product Engineer &amp; Creative Developer<\/title>/i);
  assert.match(html, /I BUILD/);
  assert.match(html, /DIGITAL/);
  assert.match(html, /PRODUCTS/);
  assert.match(html, /Selected work/i);
  assert.match(html, /In progress/);
  assert.match(html, /Completed/);
  assert.match(html, /project-status--in-progress/);
  assert.match(html, /project-status--completed/);
  assert.match(html, /LONJAK/);
  for (const asset of lonjakCampaignAssets) assert.match(html, new RegExp(`/projects/${asset.replace(".", "\\.")}`));
  assert.doesNotMatch(html, /VIEW SOURCE ON GITHUB|PRIVATE REPOSITORY/);
  assert.match(html, /Aurum Jets/);
  assert.match(html, /StudentCore/);
  assert.match(html, /Commitment/);
  assert.match(html, /Cafe Ordering System/);
  assert.match(html, /MOBILE COMMERCE/);
  for (const asset of cafeCampaignAssets) assert.match(html, new RegExp(`/projects/${asset.replace(".", "\\.")}`));
  assert.match(html, /github\.com\/syafiadil1\/aurum-jets/);
  assert.match(html, /github\.com\/syafiadil1\/studentcoresystem/);
  assert.match(html, /github\.com\/syafiadil1\/commitmentapp/);
  assert.match(html, /mailto:syafiadil@gmail\.com/);
  assert.doesNotMatch(html, /href="https:\/\/github\.com\/syafiadil1\/lonjak"/);
  assert.doesNotMatch(html, /href="https:\/\/github\.com\/syafiadil1\/cafe-ordering-system"/);
  assert.doesNotMatch(html, /Financial Advisory|financialadvisory|linkedin\.com|read\.cv/i);
  assert.doesNotMatch(html, /foundation stage|WORK IN PROGRESS/i);
  assert.doesNotMatch(html, /BACK TO TOP|© 2026 SYAFI ADIL/);
  assert.match(html, /HAVE A HARD/);
  assert.doesNotMatch(html, /Relay|Northstar|Forma|Quiet Hours/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("keeps the implementation self-contained and production-ready", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /^"use client";/);
  assert.match(page, /from "framer-motion"/);
  assert.match(page, /useReducedMotion/);
  assert.match(page, /data-theme=\{theme\}/);
  assert.match(page, /navigator\.clipboard/);
  assert.ok(page.indexOf('title: "LONJAK"') < page.indexOf('title: "Cafe Ordering System"'));
  assert.ok(page.indexOf('title: "Cafe Ordering System"') < page.indexOf('title: "Aurum Jets"'));
  assert.match(layout, /openGraph:/);
  assert.match(layout, /\/og\.png/);
  assert.match(packageJson, /"framer-motion"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await access(new URL("../public/og.png", import.meta.url));
  await Promise.all(lonjakCampaignAssets.map((asset) => access(new URL(`../public/projects/${asset}`, import.meta.url))));
  await Promise.all(cafeAssets.map((asset) => access(new URL(`../public/projects/${asset}`, import.meta.url))));
  await Promise.all(cafeCampaignAssets.map((asset) => access(new URL(`../public/projects/${asset}`, import.meta.url))));
  await Promise.all(commitmentAssets.map((asset) => access(new URL(`../public/projects/${asset}`, import.meta.url))));
  await assert.rejects(access(new URL("../app/_sites-preview", templateRoot)));
});
