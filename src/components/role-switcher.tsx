'use client'

import type { UserRole } from '@/lib/auth/get-user-role'

type Props = {
  viewRole: UserRole
  onSwitch: (role: UserRole) => void
}

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'dosen', label: 'Dosen' },
  { value: 'mahasiswa', label: 'Mahasiswa' },
]

const ROLE_COLORS: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-800 border-purple-300',
  dosen: 'bg-blue-100 text-blue-800 border-blue-300',
  mahasiswa: 'bg-green-100 text-green-800 border-green-300',
}

export function RoleSwitcher({ viewRole, onSwitch }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
        Lihat sebagai:
      </span>
      <div className="flex rounded-lg border border-gray-200 overflow-hidden">
        {ROLE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSwitch(opt.value)}
            className={`px-3 py-1 text-xs font-medium transition-all ${
              viewRole === opt.value
                ? ROLE_COLORS[opt.value ?? 'admin'] + ' border-r last:border-r-0'
                : 'bg-white text-gray-500 hover:bg-gray-50 border-r last:border-r-0'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
