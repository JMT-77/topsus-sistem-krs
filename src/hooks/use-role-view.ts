'use client'

import { useState, useEffect } from 'react'
import type { UserRole } from '@/lib/auth/get-user-role'

// Role switcher hanya tersedia untuk admin.
// Menyimpan "active view role" di localStorage — tidak mengubah session.

const STORAGE_KEY = 'krs_view_role'

export function useRoleView(realRole: UserRole) {
  const [viewRole, setViewRole] = useState<UserRole>(realRole)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Hanya admin yang boleh pakai switcher
    if (realRole !== 'admin') {
      setViewRole(realRole)
      return
    }
    const stored = localStorage.getItem(STORAGE_KEY) as UserRole
    if (stored && ['admin', 'dosen', 'mahasiswa'].includes(stored)) {
      setViewRole(stored)
    } else {
      setViewRole('admin')
    }
  }, [realRole])

  const switchRole = (role: UserRole) => {
    if (realRole !== 'admin') return
    setViewRole(role)
    if (role) localStorage.setItem(STORAGE_KEY, role)
  }

  return { viewRole: mounted ? viewRole : realRole, switchRole }
}
