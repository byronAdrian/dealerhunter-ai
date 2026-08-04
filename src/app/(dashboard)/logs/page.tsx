import { ScrollText, AlertCircle, CheckCircle2 } from "lucide-react"

export default function LogsPage() {
  return (
    <div className="flex-1 overflow-auto relative z-10 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Logs del Sistema</h1>
            <p className="text-muted-foreground">Registro de actividades de la plataforma e Inteligencia Artificial.</p>
          </div>
        </div>

        <div className="glass-panel border border-border/50 rounded-xl overflow-hidden">
          <div className="border-b border-border/50 p-4 bg-white/[0.02]">
            <h2 className="font-medium text-foreground">Actividad Reciente</h2>
          </div>
          <div className="p-0">
            <div className="flex items-start gap-4 p-4 border-b border-border/50 hover:bg-white/[0.02]">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="text-foreground text-sm">Análisis IA completado para <span className="font-medium">AutoMadrid</span></p>
                <span className="text-muted-foreground text-xs">Hace 5 minutos</span>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border-b border-border/50 hover:bg-white/[0.02]">
              <AlertCircle className="w-5 h-5 text-[var(--color-gold)] mt-0.5" />
              <div>
                <p className="text-foreground text-sm">Fallo al conectar con la web de <span className="font-medium">Motor Sur</span> (Timeout)</p>
                <span className="text-muted-foreground text-xs">Hace 2 horas</span>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 hover:bg-white/[0.02]">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="text-foreground text-sm">Sesión iniciada correctamente</p>
                <span className="text-muted-foreground text-xs">Hoy, 09:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
