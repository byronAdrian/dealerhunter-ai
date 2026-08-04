"use client"

import { useState } from "react"
import { Key } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

export function ChangePasswordForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })
  const [passwords, setPasswords] = useState({ new: "", confirm: "" })
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ text: "", type: "" })

    if (passwords.new !== passwords.confirm) {
      setMessage({ text: "Las contraseñas no coinciden", type: "error" })
      return
    }

    if (passwords.new.length < 6) {
      setMessage({ text: "La contraseña debe tener al menos 6 caracteres", type: "error" })
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      })

      if (error) throw error

      setMessage({ text: "Contraseña actualizada con éxito", type: "success" })
      setPasswords({ new: "", confirm: "" })
    } catch (error: any) {
      setMessage({ text: error.message || "Error al actualizar contraseña", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
        <Key className="w-5 h-5 text-[var(--color-gold)]" />
        Seguridad
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Nueva Contraseña</label>
          <input
            type="password"
            value={passwords.new}
            onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-[var(--color-gold)] transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Confirmar Contraseña</label>
          <input
            type="password"
            value={passwords.confirm}
            onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-[var(--color-gold)] transition-colors"
            required
          />
        </div>

        {message.text && (
          <div className={`text-sm p-2 rounded ${message.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
            {message.text}
          </div>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="bg-[var(--color-gold)] text-black font-semibold px-6 py-2.5 rounded-lg transition-all text-sm hover:opacity-90 disabled:opacity-50 shadow-sm"
        >
          {loading ? "Actualizando..." : "Cambiar Contraseña"}
        </button>
      </form>
    </div>
  )
}
