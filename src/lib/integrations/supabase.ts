import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
}

if (!supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");
}

if (!supabaseServiceRoleKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
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
  if (!supabaseAnonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is required for client-side client");
  }

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
