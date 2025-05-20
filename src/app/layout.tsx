import "~/styles/globals.css";

import Header from "~/app/_components/header";
import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "WAA Builder",
  description: "Warborne Above Ashes Character Builder",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
  createModal,
}: Readonly<{ children: React.ReactNode; createModal: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <div className="flex min-h-screen flex-col items-center bg-stone-800 text-white">
            <Header />
            {createModal}
            {children}
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
