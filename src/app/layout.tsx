import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ViveMedellín – Grupos",
  description: "Feature 4 – Comunidades",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <main className="container mx-auto p-4">{children}</main>
        <Toaster richColors />
      </body>
    </html>
  );
}
