import "~/styles/globals.css";

import Header from "~/app/_components/Header";
import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "WAAT",
  description: "Warborne Above Ashes Tools: Character Creator",
  icons: [{ rel: "icon", url: "/WT_Favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <div className="scrollbar flex h-screen flex-col items-center overflow-y-scroll bg-neutral-800 text-white">
            <Header />
            {children}
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
