import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getUserRole } from '@/lib/auth/get-user-role'
import { DashboardShell } from '@/components/dashboard-shell'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const role = await getUserRole(supabase)

  return (
    <DashboardShell
      userEmail={user.email ?? ''}
      userName={user.user_metadata?.full_name ?? user.email ?? ''}
      realRole={role}
    >
      {children}
    </DashboardShell>
  )
}
