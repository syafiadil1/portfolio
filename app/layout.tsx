import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource-variable/manrope/wght.css";
import "@fontsource-variable/unbounded/wght.css";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers();
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "localhost:3000";
  const protocol = incomingHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;

  return {
    metadataBase: new URL(baseUrl),
    title: "Adil Syafi — Product Engineer & Creative Developer",
    description:
      "Kuala Lumpur-based product engineer crafting fast, humane digital products through systems thinking, interface design, and production code.",
    keywords: ["Product Engineer", "Creative Developer", "React Developer", "Kuala Lumpur", "Portfolio"],
    authors: [{ name: "Adil Syafi" }],
    openGraph: {
      title: "Adil Syafi — I Build Digital Products",
      description: "Product engineering, interaction, and systems thinking—made clear.",
      type: "website",
      url: baseUrl,
      images: [{ url: `${baseUrl}/og.png`, width: 1731, height: 909, alt: "Adil Syafi — Product Engineer" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Adil Syafi — I Build Digital Products",
      description: "Product engineering, interaction, and systems thinking—made clear.",
      images: [`${baseUrl}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
