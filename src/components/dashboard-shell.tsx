'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRoleView } from '@/hooks/use-role-view'
import { RoleSwitcher } from '@/components/role-switcher'
import type { UserRole } from '@/lib/auth/get-user-role'

type Props = {
  children: React.ReactNode
  userEmail: string
  userName: string
  realRole: UserRole
}

const NAV_ITEMS: Record<string, { label: string; href: string }[]> = {
  mahasiswa: [
    { label: 'Dashboard', href: '/dashboard/mahasiswa' },
  ],
  dosen: [
    { label: 'Dashboard', href: '/dashboard/dosen' },
  ],
  admin: [
    { label: 'Dashboard', href: '/dashboard/admin' },
  ],
  pegawai: [
    { label: 'Dashboard', href: '/dashboard/pegawai' },
  ],
}

const ROLE_BADGE: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-700',
  dosen: 'bg-blue-100 text-blue-700',
  mahasiswa: 'bg-green-100 text-green-700',
  pegawai: 'bg-yellow-100 text-yellow-700',
}

export function DashboardShell({ children, userEmail, userName, realRole }: Props) {
  const { viewRole, switchRole } = useRoleView(realRole)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  const activeRole = realRole === 'admin' ? viewRole : realRole
  const navItems = NAV_ITEMS[activeRole ?? 'mahasiswa'] ?? []

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role)
    // Navigasi ke dashboard role yang dipilih
    const paths: Record<string, string> = {
      admin: '/dashboard/admin',
      dosen: '/dashboard/dosen',
      mahasiswa: '/dashboard/mahasiswa',
    }
    if (role && paths[role]) router.push(paths[role])
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1e3a5f] text-white flex flex-col transform transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-[#1e3a5f] font-black text-sm">K</span>
          </div>
          <div>
            <p className="font-bold text-sm leading-none">SIMAK</p>
            <p className="text-white/50 text-xs">Sistem KRS</p>
          </div>
        </div>

        {/* User info */}
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-white/50 text-xs truncate">{userEmail}</p>
            </div>
          </div>
          <div className="mt-2">
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
              ROLE_BADGE[activeRole ?? 'mahasiswa']
            }`}>
              {activeRole ?? 'mahasiswa'}
              {realRole === 'admin' && activeRole !== 'admin' && (
                <span className="ml-1 opacity-60">(simulasi)</span>
              )}
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors ${
                pathname === item.href
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Keluar
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-4 ml-auto">
            {/* Role switcher hanya untuk admin real */}
            {realRole === 'admin' && (
              <RoleSwitcher viewRole={activeRole} onSwitch={handleRoleSwitch} />
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
)}
