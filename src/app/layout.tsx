import { Roboto_Condensed } from "next/font/google";
import "../styles/app.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import siteConfig from "@/core/data/site-config";
import Providers from "@/core/providers";

const inter = Roboto_Condensed({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className}  bgafter`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
