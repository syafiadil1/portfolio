import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

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
  assert.match(html, /Relay/);
  assert.match(html, /Northstar/);
  assert.match(html, /Quiet Hours/);
  assert.match(html, /HAVE A HARD/);
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
  assert.match(layout, /openGraph:/);
  assert.match(layout, /\/og\.png/);
  assert.match(packageJson, /"framer-motion"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await access(new URL("../public/og.png", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", templateRoot)));
});
