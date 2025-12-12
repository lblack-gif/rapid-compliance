import type React from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function KnowledgeBaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  )
}
