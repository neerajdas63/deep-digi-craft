import type { AppProps } from "next/app";
import "../src/index.css";
// ADDED: Next.js-compatible Header and Footer (src/components/ originals are untouched)
import Header from "@/components/next/Header";
import Footer from "@/components/next/Footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
