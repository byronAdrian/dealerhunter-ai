import { UserCircle, LogOut, Key } from "lucide-react"

export default function PerfilPage() {
  return (
    <div className="flex-1 overflow-auto bg-[var(--color-graphite)] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Mi Perfil</h1>
            <p className="text-[var(--color-gray-medium)]">Gestiona tu cuenta y credenciales.</p>
          </div>
        </div>

        <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl p-8 mb-6 flex items-center gap-6">
          <div className="w-24 h-24 bg-[var(--color-gold)]/20 rounded-full flex items-center justify-center border border-[var(--color-gold)]/30">
            <UserCircle className="w-12 h-12 text-[var(--color-gold)]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Administrador</h2>
            <p className="text-[var(--color-gray-medium)]">xbyronadrian@gmail.com</p>
          </div>
        </div>

        <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-[var(--color-gold)]" />
            Seguridad
          </h3>
          <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg transition-colors text-sm">
            Cambiar Contraseña
          </button>
        </div>
      </div>
    </div>
  )
}
