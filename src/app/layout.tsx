import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ReactNode } from "react";
import { Navbar } from "@/components/global/nav";
import { ConvexClientProvider } from "@/lib/providers/convex-clerk";
import { shadcn } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Zain Hackathon",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <ClerkProvider appearance={{ baseTheme: shadcn }}>
    <html lang="en">
      <body className="antialiased dark">
        <ConvexClientProvider>
          <Navbar />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
