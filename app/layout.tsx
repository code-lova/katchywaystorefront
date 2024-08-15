import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import Toasters from "@/components/Toasters";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Katchyways - Store Front",
  description: "No 1 store front for everyThing leather materials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <Toasters>
            {children}
          </Toasters>
        </body>
      </Provider>
    </html>
  );
}
