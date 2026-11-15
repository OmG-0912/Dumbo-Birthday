import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { AtmosphericBackground } from "@/components/layout/AtmosphericBackground";
import { GardenAtmosphereProvider } from "@/context/GardenAtmosphereContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Anavi's World — The Enchanted Living Storybook",
  description:
    "A private, living digital storybook sanctuary dedicated to her passions, creativity, achievements, and our shared universe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-parchment text-cocoa antialiased selection:bg-blush selection:text-cocoa-deep relative">
        <GardenAtmosphereProvider>
          <AuthProvider>
            <AtmosphericBackground />
            <Navigation />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
          </AuthProvider>
        </GardenAtmosphereProvider>
      </body>
    </html>
  );
}
