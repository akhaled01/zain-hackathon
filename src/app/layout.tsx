import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zain Hackathon",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className="antialiased dark">{children}</body>
  </html>
);

export default RootLayout;
