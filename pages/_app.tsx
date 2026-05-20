import type { AppProps } from "next/app";
import { Inter, Sora } from "next/font/google";
import "../src/index.css";
// ADDED: Next.js-compatible Header and Footer (src/components/ originals are untouched)
import Header from "@/components/next/Header";
import Footer from "@/components/next/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} ${sora.variable} min-h-screen flex flex-col`}>
      <Header />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
