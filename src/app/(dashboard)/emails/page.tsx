import { Mail, Search, Send, Clock, FileText } from "lucide-react"

export default function EmailsPage() {
  return (
    <div className="flex-1 overflow-auto relative z-10 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Bandeja de Emails</h1>
            <p className="text-muted-foreground">Gestiona las campañas y los correos enviados a concesionarios.</p>
          </div>
          <button className="bg-[var(--color-gold)] text-[var(--color-graphite-dark)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-gold-light)] transition-colors flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Redactar Nuevo
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 flex flex-col gap-2">
            <button className="w-full text-left px-4 py-3 glass-panel border border-border/50 rounded-lg text-foreground font-medium flex items-center gap-3">
              <Send className="w-4 h-4 text-[var(--color-gold)]" />
              Enviados
            </button>
            <button className="w-full text-left px-4 py-3 hover:glass-panel border border-transparent hover:border-border/50 rounded-lg text-muted-foreground transition-colors flex items-center gap-3">
              <Clock className="w-4 h-4" />
              Programados
            </button>
            <button className="w-full text-left px-4 py-3 hover:glass-panel border border-transparent hover:border-border/50 rounded-lg text-muted-foreground transition-colors flex items-center gap-3">
              <FileText className="w-4 h-4" />
              Borradores
            </button>
          </div>

          <div className="lg:col-span-3 glass-panel border border-border/50 rounded-xl overflow-hidden min-h-[500px] flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-border/50">
              <Mail className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">Bandeja vacía</h3>
            <p className="text-muted-foreground max-w-md">
              Aún no has enviado ningún correo electrónico a través de la plataforma. Envía tu primera propuesta para empezar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
