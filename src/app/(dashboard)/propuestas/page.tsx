import { FileText, Search, Plus, ExternalLink, Calendar } from "lucide-react"

export default function PropuestasGeneralPage() {
  return (
    <div className="flex-1 overflow-auto relative z-10 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Historial de Propuestas</h1>
            <p className="text-muted-foreground">Consulta todas las propuestas comerciales enviadas a los concesionarios.</p>
          </div>
          <button className="bg-[var(--color-gold)] text-[var(--color-graphite-dark)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-gold-light)] transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nueva Propuesta
          </button>
        </div>

        <div className="glass-panel border border-border/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border/50 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input 
                type="text"
                placeholder="Buscar por nombre de concesionario..." 
                className="w-full relative z-10 border border-border/50 rounded-lg pl-9 pr-4 py-2 text-foreground text-sm focus:outline-none focus:border-[var(--color-gold)]"
              />
            </div>
          </div>
          
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-border/50">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">No hay propuestas recientes</h3>
            <p className="text-muted-foreground max-w-md">
              Las propuestas que generes desde el análisis de IA de las empresas aparecerán en este historial.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
