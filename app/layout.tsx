import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EditalFit — Diagnóstico de aderência a editais",
  description:
    "Verifique se seu projeto está alinhado a um edital de inovação antes de submeter. Diagnóstico por IA, critério a critério, com fonte rastreável.",
  icons: { icon: "/editalfit-logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#0D2E6B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={sora.variable}>
      <body>{children}</body>
    </html>
  );
}
