export const metadata = { title: "Rapid Compliance", description: "Section 3 Management Platform",
    generator: 'v0.app'
}

import "./globals.css"
import { ReactNode } from "react"
import Providers from "./providers"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
