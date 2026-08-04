import { UserCircle } from "lucide-react"
import { ChangePasswordForm } from "@/components/ChangePasswordForm"

export default function PerfilPage() {
  return (
    <div className="flex-1 overflow-auto bg-background p-8">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 font-editorial">Mi Perfil</h1>
            <p className="text-muted-foreground">Gestiona tu cuenta y credenciales.</p>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-8 mb-6 flex items-center gap-6">
          <div className="w-24 h-24 bg-[var(--color-gold)]/10 rounded-full flex items-center justify-center border border-[var(--color-gold)]/30 shadow-inner">
            <UserCircle className="w-12 h-12 text-[var(--color-gold)]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-1 font-editorial">Administrador</h2>
            <p className="text-muted-foreground text-lg">xbyronadrian@gmail.com</p>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-8">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  )
}
