import { Calendar as CalendarIcon, Clock, Video } from "lucide-react"

export default function CalendarioPage() {
  return (
    <div className="flex-1 overflow-auto relative z-10 p-8">
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Calendario de Citas</h1>
            <p className="text-muted-foreground">Reuniones y seguimientos con los concesionarios prospectados.</p>
          </div>
          <button className="bg-[var(--color-gold)] text-[var(--color-graphite-dark)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-gold-light)] transition-colors flex items-center gap-2">
            Conectar Calendario
          </button>
        </div>

        <div className="flex-1 glass-panel border border-border/50 rounded-xl overflow-hidden min-h-[500px] flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-border/50">
            <CalendarIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium text-foreground mb-2">Integración en curso</h3>
          <p className="text-muted-foreground max-w-md">
            Próximamente podrás integrar Google Calendar o Microsoft Outlook para gestionar tus reuniones de venta directamente desde aquí.
          </p>
        </div>
      </div>
    </div>
  )
}
