import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import CartProvider from "../../store/cart";

const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <NextNProgress />
        <Component className={inter.className} {...pageProps} />
      </CartProvider>
    </SessionProvider>
  );
}
