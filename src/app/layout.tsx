import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import CustomToastContainer from "@/components/UX-UI/CustomToastContainer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AgendaGol - Reserva tu Cancha",
  description: "Plataforma de reservas de canchas de fútbol. Encuentra y reserva la cancha perfecta para tu próximo partido.",
  keywords: ["canchas", "fútbol", "reservas", "deportes", "partido"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-slate-900 text-white`}>
        {children}
        <CustomToastContainer />
      </body>
    </html>
  );
}
