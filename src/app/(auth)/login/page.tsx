'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// 1. Pindahkan seluruh logika utama ke dalam komponen internal
function LoginFormContent() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const supabase     = createClient()

  const [email,       setEmail]       = useState('')
  const [isLoading,   setIsLoading]   = useState(false)
  const [isSent,      setIsSent]      = useState(false)
  const [errorMsg,    setErrorMsg]    = useState<string | null>(null)

  // Tampilkan error dari OAuth callback (query param)
  useEffect(() => {
    const err = searchParams.get('error')
    if (err === 'auth_callback_failed') {
      setErrorMsg('Autentikasi gagal. Silakan coba lagi.')
    } else if (err) {
      setErrorMsg(`Terjadi kesalahan: ${err}`)
    }
  }, [searchParams])

  // ── Magic Link ─────────────────────────────────────────────────────────────
  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setIsLoading(false)

    if (error) {
      setErrorMsg(error.message)
      return
    }

    setIsSent(true)
  }

  // ── Google SSO ─────────────────────────────────────────────────────────────
  async function handleGoogleSSO() {
    setIsLoading(true)
    setErrorMsg(null)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setIsLoading(false)
      setErrorMsg(error.message)
    }
  }

  // ── Render: Magic link sudah dikirim ──────────────────────────────────────
  if (isSent) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Cek email Anda</h2>
          <p className="text-gray-500 text-sm mb-1">Kami mengirim tautan masuk ke:</p>
          <p className="font-medium text-[#1e3a5f] mb-6">{email}</p>
          <p className="text-xs text-gray-400">
            Tidak menerima email? Periksa folder spam atau{' '}
            <button
              onClick={() => { setIsSent(false); setEmail('') }}
              className="text-[#1e3a5f] underline underline-offset-2"
            >
              coba lagi
            </button>
            .
          </p>
        </div>
      </div>
    )
  }

  // ── Render: Form login ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1e3a5f] rounded-xl mb-4">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">SIMAK KRS</h1>
          <p className="text-gray-500 text-sm mt-1">Sistem Informasi Kartu Rencana Studi</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Masuk ke akun Anda</h2>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5 flex items-start gap-3">
              <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-700">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleMagicLink} className="space-y-4 mb-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email institusi</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nim@student.unud.ac.id"
                required
                disabled={isLoading}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-[#1e3a5f] hover:bg-[#16304f] text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? 'Mengirim tautan...' : 'Kirim Tautan Masuk'}
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center"><span className="px-3 bg-white text-xs text-gray-400">atau</span></div>
          </div>

          <button
            onClick={handleGoogleSSO}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Masuk dengan Google
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">Hubungi administrator jika Anda belum terdaftar dalam sistem.</p>
      </div>
    </div>
  )
}

// 2. Export default dengan pembungkus Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  )
}
