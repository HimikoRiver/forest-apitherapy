import localFont from "next/font/local";

import HeroMenu from "@/components/home/hero-menu/HeroMenu";
import RoutePageLogo from "@/components/shared/PageLogo";

import "./globals.css";

const comfortaa = localFont({
  src: [
    {
      path: "./fonts/comfortaa/comfortaa-variable.ttf",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-comfortaa",
  display: "swap",
});

export const metadata = {
  title: "APIDARB | Апитерапия",
  description:
    "Апитерапия, пчелопродукты и натуральный подход к восстановлению организма.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${comfortaa.variable} h-full antialiased`}>
      <body className="font-comfortaa relative min-h-full bg-[#030b0c] text-[#f3efe5]">
        <RoutePageLogo />
        {children}
        <HeroMenu />
      </body>
    </html>
  );
}
