import { Settings, Save, Shield, Key } from "lucide-react"

export default function ConfiguracionPage() {
  return (
    <div className="flex-1 overflow-auto relative z-10 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Configuración</h1>
            <p className="text-muted-foreground">Ajustes generales de la plataforma y de la agencia.</p>
          </div>
          <button className="bg-[var(--color-gold)] text-[var(--color-graphite-dark)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-gold-light)] transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>

        <div className="space-y-6">
          <div className="glass-panel border border-border/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-5 h-5 text-[var(--color-gold)]" />
              <h2 className="text-lg font-medium text-foreground">Ajustes de Agencia</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Nombre de la Agencia</label>
                <input type="text" defaultValue="DealerHunter AI" className="w-full relative z-10 border border-border/50 rounded-lg px-4 py-2 text-foreground focus:border-[var(--color-gold)] focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Email de Contacto (Remitente)</label>
                <input type="email" defaultValue="contacto@agencia.com" className="w-full relative z-10 border border-border/50 rounded-lg px-4 py-2 text-foreground focus:border-[var(--color-gold)] focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="glass-panel border border-border/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Key className="w-5 h-5 text-[var(--color-gold)]" />
              <h2 className="text-lg font-medium text-foreground">Claves de API</h2>
            </div>
            <p className="text-muted-foreground text-sm mb-4">Configura las integraciones de terceros (OpenAI, Resend, etc.).</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Resend API Key (Envío de correos)</label>
                <input type="password" placeholder="re_..." className="w-full relative z-10 border border-border/50 rounded-lg px-4 py-2 text-foreground focus:border-[var(--color-gold)] focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">OpenAI API Key (Análisis de webs)</label>
                <input type="password" placeholder="sk-..." className="w-full relative z-10 border border-border/50 rounded-lg px-4 py-2 text-foreground focus:border-[var(--color-gold)] focus:outline-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
