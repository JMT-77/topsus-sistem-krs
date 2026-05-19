export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full text-center">
        <h1 className="text-xl font-bold text-[#1e3a5f] mb-2">Akun belum terdaftar</h1>
        <p className="text-gray-500 text-sm">
          Anda berhasil login, namun akun Anda belum memiliki role dalam sistem.
          Hubungi administrator untuk aktivasi.
        </p>
      </div>
    </main>
  )
}
