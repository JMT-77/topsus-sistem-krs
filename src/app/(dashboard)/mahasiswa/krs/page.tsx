import { createClient } from '@/lib/supabase/server'

export default async function KrsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold text-[#1e3a5f]">Kartu Rencana Studi</h1>
      <p className="text-gray-500 mt-1 text-sm">
        Login sebagai: {user?.email}
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Role: {user?.user_metadata?.role ?? 'belum diset'}
      </p>
    </main>
  )
}
