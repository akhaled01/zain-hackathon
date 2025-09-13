import type { Metadata } from "next";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Zain Hackathon",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <ClerkProvider>
    <html lang="en">
      <body className="antialiased dark">{children}</body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
