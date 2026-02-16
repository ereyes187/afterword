import type { Metadata } from "next";
import { DM_Sans, Inter, Poppins, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const dm = DM_Sans({
  weight: "300",
});

const poppins = Poppins({
  weight: "300",
});

const syne = Syne({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Afterword",
  description: "A place to discover and discuss books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dm} min-h-screen w-screen flex flex-col `}>
        {children}
      </body>
    </html>
  );
}
