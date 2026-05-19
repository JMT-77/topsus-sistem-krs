import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getDashboardPath } from '@/lib/auth/get-user-role'
import type { UserRole } from '@/lib/auth/get-user-role'

export default async function RootPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const role = (user.user_metadata?.role as UserRole) ?? null
  redirect(getDashboardPath(role))
}
