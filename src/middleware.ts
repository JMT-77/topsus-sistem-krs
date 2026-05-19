import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { UserRole } from '@/lib/auth/get-user-role'

// ─── Route permission map ────────────────────────────────────────────────────
// Key: prefix route yang diproteksi
// Value: role yang diizinkan mengakses (admin selalu punya akses ke semua)
const PROTECTED_ROUTES: Record<string, UserRole[]> = {
  '/dashboard/mahasiswa': ['mahasiswa', 'admin'],
  '/dashboard/dosen':     ['dosen', 'admin'],
  '/dashboard/admin':     ['admin'],
  '/dashboard/pegawai':   ['pegawai', 'admin'],
}

// Route yang hanya boleh diakses user BELUM login
const AUTH_ROUTES = ['/login', '/register']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  let response = NextResponse.next({
    request,
  })

  // Buat Supabase client yang bisa baca/tulis cookie di middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // PENTING: getUser() bukan getSession() — validasi JWT ke Supabase server
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const role = (user?.user_metadata?.role as UserRole) ?? null

  // ── 1. User sudah login, mencoba akses halaman auth (login/register) ──────
  if (user && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    const dashboardPath = getDashboardPathFromRole(role)
    return NextResponse.redirect(new URL(dashboardPath, request.url))
  }

  // ── 2. Cek apakah pathname termasuk protected route ──────────────────────
  const matchedPrefix = Object.keys(PROTECTED_ROUTES).find((prefix) =>
    pathname.startsWith(prefix)
  )

  if (matchedPrefix) {
    // Belum login → redirect ke login
    if (!user) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Sudah login tapi role tidak punya izin → redirect ke dashboard sendiri
    const allowedRoles = PROTECTED_ROUTES[matchedPrefix]
    if (!role || !allowedRoles.includes(role)) {
      const dashboardPath = getDashboardPathFromRole(role)
      return NextResponse.redirect(new URL(dashboardPath, request.url))
    }
  }

  // ── 3. Akses /dashboard tanpa sub-path → redirect ke dashboard sesuai role ─
  if (pathname === '/dashboard') {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.redirect(
      new URL(getDashboardPathFromRole(role), request.url)
    )
  }

  return response
}

function getDashboardPathFromRole(role: UserRole): string {
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

export const config = {
  matcher: [
    /*
     * Match semua path KECUALI:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - File dengan ekstensi (gambar, font, dsb)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
