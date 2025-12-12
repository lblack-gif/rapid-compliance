import type { Metadata } from "next"
import KnowledgeBaseClientPage from "./KnowledgeBaseClientPage"

export const metadata: Metadata = {
  title: "Knowledge Base - Rapid Compliance",
  description: "Comprehensive Section 3 compliance resources, guides, and documentation",
}

export default function KnowledgeBasePage() {
  return <KnowledgeBaseClientPage />
}
