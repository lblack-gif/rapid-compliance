// Configuration management for Section 3 Compliance System
export const config = {
  app: {
    name: "Section 3 Compliance System",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  },
  database: {
    url: process.env.NEON_DATABASE_URL || process.env.POSTGRES_URL || "",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },
  supabase: {
    url: process.env.SUPABASE_URL || "",
    anonKey: process.env.SUPABASE_ANON_KEY || "",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY || "",
  },
  email: {
    smtpHost: process.env.SMTP_HOST || "",
    smtpPort: Number.parseInt(process.env.SMTP_PORT || "587"),
    smtpUser: process.env.SMTP_USER || "",
    smtpPassword: process.env.SMTP_PASSWORD || "",
    fromEmail: process.env.FROM_EMAIL || "",
  },
  security: {
    jwtSecret: process.env.JWT_SECRET || "",
    encryptionKey: process.env.ENCRYPTION_KEY || "",
  },
  compliance: {
    section3Threshold: 0.25, // 25% of labor hours must be Section 3
    targetedSection3Threshold: 0.05, // 5% targeted Section 3 workers
    laborHourBenchmark: 25, // Default benchmark percentage
  },
}

export function validateConfig() {
  const warnings: string[] = []
  const errors: string[] = []

  // Check required environment variables
  if (!config.database.url) {
    warnings.push("DATABASE_URL or POSTGRES_URL not configured")
  }

  if (!config.database.supabaseUrl) {
    warnings.push("NEXT_PUBLIC_SUPABASE_URL not configured")
  }

  if (!config.database.supabaseAnonKey) {
    warnings.push("NEXT_PUBLIC_SUPABASE_ANON_KEY not configured")
  }

  if (!config.ai.apiKey) {
    warnings.push("OPENAI_API_KEY not configured - AI features will be disabled")
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors,
  }
}

export function getConfigStatus() {
  return {
    database: {
      configured: !!config.database.url,
      hasValidUrl: config.database.url.startsWith("https://"),
    },
    supabase: {
      configured: !!(config.supabase.url && config.supabase.anonKey),
      hasValidUrl: config.supabase.url.startsWith("https://"),
      hasKey: !!config.supabase.anonKey,
    },
    openai: {
      configured: !!config.ai.apiKey,
    },
    email: {
      smtpHost: !!config.email.smtpHost,
      configured: !!(config.email.smtpHost && config.email.smtpUser),
    },
    security: {
      jwtSecret: !!config.security.jwtSecret,
      encryptionKey: !!config.security.encryptionKey,
    },
    compliance: {
      configured: !!(
        config.compliance.section3Threshold &&
        config.compliance.targetedSection3Threshold &&
        config.compliance.laborHourBenchmark
      ),
    },
    isDemoMode: !config.database.url || !config.database.supabaseUrl || !config.database.supabaseAnonKey,
  }
}
