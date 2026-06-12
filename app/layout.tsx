import type { Metadata } from "next"
import { Outfit, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "MOWP — AI-Assisted Personal Work Management OS",
  description: "Capture, classify, plan, and review your work automatically using Gemini 2.0 Flash.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn("dark scroll-smooth", outfit.variable, plusJakartaSans.variable)}
      style={{ colorScheme: "dark" }}
    >
      <body className="font-sans min-h-screen bg-background text-foreground antialiased selection:bg-primary/25 selection:text-foreground">
        {children}
      </body>
    </html>
  )
}
