"use server"

import { createServerClient } from "@/lib/supabase"

export async function initializeDatabase() {
  console.log("[v0] Starting database initialization...")

  try {
    const supabase = await createServerClient()

    if (!supabase) {
      throw new Error("Supabase client is not initialized")
    }

    const client = supabase

    // Create tables directly using Supabase client
    const tables = [
      {
        name: "clients",
        check: async () => {
          const { error } = await client.from("clients").select("id").limit(1)
          return error?.code === "42P01" // Table does not exist
        },
      },
      {
        name: "funding_sources",
        check: async () => {
          const { error } = await client.from("funding_sources").select("id").limit(1)
          return error?.code === "42P01"
        },
      },
    ]

    // Check which tables need to be created
    const missingTables: string[] = []
    for (const table of tables) {
      if (await table.check()) {
        missingTables.push(table.name)
      }
    }

    if (missingTables.length === 0) {
      return {
        success: true,
        message: "All tables already exist",
      }
    }

    console.log("[v0] Missing tables:", missingTables)

    return {
      success: false,
      message: `Please run the SQL initialization script manually. Missing tables: ${missingTables.join(
        ", ",
      )}. Go to your Supabase dashboard SQL editor and run the scripts/init-import-tables.sql file.`,
    }
  } catch (error: any) {
    console.error("[v0] Error during database check:", error)
    return {
      success: false,
      message: error.message || "Unknown error during initialization check",
    }
  }
}
