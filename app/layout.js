import { Geist, Geist_Mono } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Educational Coaching Voice Agent",
  description: "AI Educational Coaching Voice Agent – Transform the way you learn with an advanced AI-powered voice assistant. Get real-time coaching, personalized guidance, and interactive learning experiences. Perfect for students, educators, and professionals seeking smart, AI-driven tutoring. Explore the future of education today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><StackProvider app={stackServerApp}><StackTheme>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </StackTheme></StackProvider></body>
    </html>
  );
}
