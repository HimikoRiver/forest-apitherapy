import { Comfortaa } from "next/font/google";

import RouteChrome from "@/components/shared/RouteChrome";

import "./globals.css";

const comfortaa = Comfortaa({
  subsets: ["cyrillic", "latin"],
  variable: "--font-comfortaa",
  display: "swap",
});

export const metadata = {
  title: "APIDARB | Апитерапия",
  description:
    "Апитерапия, пчелопродукты и натуральный подход к восстановлению организма.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="ru"
      className={`${comfortaa.variable} h-full antialiased`}
    >
      <body className="font-comfortaa relative min-h-full bg-[#030b0c] text-[#f3efe5]">
        {children}

        <RouteChrome />
      </body>
    </html>
  );
}