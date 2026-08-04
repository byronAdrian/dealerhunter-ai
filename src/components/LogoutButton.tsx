'use client'

import { LogOut } from 'lucide-react'
import { logout } from '@/app/login/actions'
import { useTransition } from 'react'

export function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() => startTransition(() => logout())}
      disabled={isPending}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors w-full text-left mt-2 disabled:opacity-50"
    >
      <LogOut className="w-5 h-5" />
      <span className="font-medium text-sm">{isPending ? 'Saliendo...' : 'Cerrar Sesión'}</span>
    </button>
  )
}
