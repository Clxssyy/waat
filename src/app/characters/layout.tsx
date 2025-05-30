import type React from "react";
import "~/styles/globals.css";

export default function RootLayout({
  children,
  createModal,
}: Readonly<{
  children: React.ReactNode;
  createModal: React.ReactNode;
}>) {
  return (
    <>
      {createModal}
      {children}
    </>
  );
}
