import type { Metadata } from "next";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import "./globals.css";
import { ReactNode } from "react";
import { Navbar } from "@/components/global/nav";

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
      <body className="antialiased dark">
        <Navbar />
        {children}
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
