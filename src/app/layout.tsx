import "~/styles/globals.css";

import Header from "~/app/_components/Header";
import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: { absolute: "WAAT", template: "WAAT | %s" },
  description: "Warborne Above Ashes Tools: Character Creator, Guides, & News",
  icons: [{ rel: "icon", url: "/WT_Favicon.ico" }],
  verification: {
    google: "iKQeYxSVm9-txUM3mrvNnt6yrYO8nAHwKxiZm6tYvP0",
  },
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
          <div className="relative flex h-screen flex-col">
            <Header />
            <div className="flex flex-1 flex-col items-center overflow-auto">
              {children}
            </div>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
