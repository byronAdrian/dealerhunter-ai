"use client"
import { useState } from 'react'
import { login } from './actions'
import { Plus, Search, Building2, MoreVertical, MapPin, Globe } from "lucide-react"

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    
    const formData = new FormData(e.currentTarget)
    const result = await login(formData)
    
    if (result?.error) {
      setErrorMsg(result.error)
      setLoading(false)
    }
    // Si no hay error, el server action hace un redirect a /empresas
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-screen">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        onSubmit={handleSubmit}
      >
        <div className="mb-6 flex flex-col items-center">
          <div className="w-12 h-12 bg-[var(--color-gold)] rounded-xl flex items-center justify-center mb-4">
            <span className="text-[var(--color-graphite-dark)] font-bold text-xl">DH</span>
          </div>
          <h1 className="text-2xl font-bold text-white text-center">DealerHunter AI</h1>
          <p className="text-[var(--color-gray-medium)] text-sm mt-1 text-center">Plataforma de Prospección Comercial</p>
        </div>

        <label className="text-md text-white font-medium" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-[var(--color-graphite-light)] border border-white/10 text-white mb-4 focus:outline-none focus:border-[var(--color-gold)]"
          name="email"
          placeholder="xbyronadrian@gmail.com"
          required
        />
        
        <label className="text-md text-white font-medium" htmlFor="password">
          Contraseña
        </label>
        <input
          className="rounded-md px-4 py-2 bg-[var(--color-graphite-light)] border border-white/10 text-white mb-6 focus:outline-none focus:border-[var(--color-gold)]"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        
        <button 
          disabled={loading}
          className="bg-[var(--color-gold)] text-[var(--color-graphite-dark)] font-medium rounded-md px-4 py-3 text-white/90 hover:bg-[var(--color-gold-light)] mb-2 transition-colors disabled:opacity-50"
        >
          {loading ? 'Iniciando...' : 'Iniciar Sesión'}
        </button>

        {errorMsg && (
          <p className="mt-4 p-4 bg-red-500/10 text-red-500 text-center rounded-md border border-red-500/20">
            {errorMsg}
          </p>
        )}
      </form>
    </div>
  )
}
