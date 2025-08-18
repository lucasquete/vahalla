"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Vahalla",
//   description: "Video app",
// };

export default function RootLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <Search menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <div className="flex">
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div
              className={`flex-5/6 mt-20 ${
                menuOpen
                  ? "lg:ml-18 md:ml-50"
                  : "lg:ml-50 md:ml-16"
              }`}
            >
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
