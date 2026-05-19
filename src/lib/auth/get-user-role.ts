import type { SupabaseClient } from '@supabase/supabase-js'

export type UserRole = 'mahasiswa' | 'dosen' | 'admin' | 'pegawai' | null

export async function getUserRole(
  supabase: SupabaseClient
): Promise<UserRole> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) return null

  const role = user.user_metadata?.role as string | undefined

  if (
    role === 'mahasiswa' ||
    role === 'dosen' ||
    role === 'admin' ||
    role === 'pegawai'
  ) {
    return role
  }

  return null
}

export function getDashboardPath(role: UserRole): string {
  switch (role) {
    case 'mahasiswa':
      return '/dashboard/mahasiswa'
    case 'dosen':
      return '/dashboard/dosen'
    case 'admin':
      return '/dashboard/admin'
    case 'pegawai':
      return '/dashboard/pegawai'
    default:
      return '/onboarding'
  }
}
