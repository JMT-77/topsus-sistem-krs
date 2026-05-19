import { createClient } from '@supabase/supabase-js'

// HANYA untuk Server Actions / Route Handlers
// JANGAN import file ini dari komponen client
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
