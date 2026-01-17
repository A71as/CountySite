import { createClient } from "@supabase/supabase-js";

// Helper to get and validate environment variable
function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing ${key} environment variable`);
  }
  return value;
}

/**
 * Server-side Supabase client
 * Uses service role key for full database access
 * 
 * ⚠️ WARNING: Only use this in API routes and server components.
 * Never expose the service role key to the client.
 * 
 * @returns Supabase client with service role permissions
 */
export function createServerClient() {
  const supabaseUrl = getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
  const supabaseServiceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Client-side Supabase client
 * Uses anon key with Row Level Security (RLS) policies
 * 
 * Note: For this campaign site, most operations should be done
 * server-side via API routes. Use this client sparingly if needed.
 * 
 * @returns Supabase client with anon key permissions
 */
export function createClientClient() {
  const supabaseUrl = getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
  const supabaseAnonKey = getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

// Type exports
// TODO: Generate database types using Supabase CLI:
// npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/integrations/database.types.ts
// Then import and use: import type { Database } from './database.types'
// 
// Example usage:
// type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
// export type Subscriber = Tables<'subscribers'>;
// export type Volunteer = Tables<'volunteers'>;
// export type YardSign = Tables<'yard_signs'>;
