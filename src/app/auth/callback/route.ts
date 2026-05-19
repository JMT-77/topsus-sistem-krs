import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code  = searchParams.get('code')
  const next  = searchParams.get('next') ?? '/'
  const error = searchParams.get('error')

  // Tangani error dari provider OAuth
  if (error) {
    console.error('[auth/callback] OAuth error:', error)
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error)}`, origin)
    )
  }

  if (code) {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Tidak bisa set cookie dari Server Component, middleware yang handle
            }
          },
        },
      }
    )

    const { data, error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.error('[auth/callback] Exchange error:', exchangeError.message)
      return NextResponse.redirect(
        new URL('/login?error=auth_callback_failed', origin)
      )
    }

    // Tentukan redirect target berdasarkan role dari metadata
    const role = data.user?.user_metadata?.role as string | undefined
    let redirectPath = '/onboarding'

    if (role === 'mahasiswa') redirectPath = '/dashboard/mahasiswa'
    else if (role === 'dosen')     redirectPath = '/dashboard/dosen'
    else if (role === 'admin')     redirectPath = '/dashboard/admin'
    else if (role === 'pegawai')   redirectPath = '/dashboard/pegawai'

    // Jika ada query param `next` yang valid, prioritaskan
    if (next && next.startsWith('/') && !next.startsWith('//')) {
      redirectPath = next
    }

    return NextResponse.redirect(new URL(redirectPath, origin))
  }

  // Tidak ada code — redirect ke login
  return NextResponse.redirect(new URL('/login', origin))
}
