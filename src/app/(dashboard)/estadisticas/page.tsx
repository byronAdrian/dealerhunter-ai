import { BarChart3, TrendingUp, Users, Target } from "lucide-react"

export default function EstadisticasPage() {
  return (
    <div className="flex-1 overflow-auto relative z-10 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Estadísticas de la Agencia</h1>
            <p className="text-muted-foreground">Rendimiento global del equipo comercial y de captación.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-panel border border-border/50 p-6 rounded-xl">
            <p className="text-muted-foreground text-sm mb-2">Tasa de Conversión</p>
            <h3 className="text-3xl font-bold text-foreground">0%</h3>
          </div>
          <div className="glass-panel border border-border/50 p-6 rounded-xl">
            <p className="text-muted-foreground text-sm mb-2">Emails Abiertos</p>
            <h3 className="text-3xl font-bold text-foreground">0%</h3>
          </div>
          <div className="glass-panel border border-border/50 p-6 rounded-xl">
            <p className="text-muted-foreground text-sm mb-2">Reuniones Agendadas</p>
            <h3 className="text-3xl font-bold text-foreground">0</h3>
          </div>
          <div className="glass-panel border border-border/50 p-6 rounded-xl">
            <p className="text-muted-foreground text-sm mb-2">Nuevos Clientes</p>
            <h3 className="text-3xl font-bold text-[var(--color-gold)]">0</h3>
          </div>
        </div>

        <div className="glass-panel border border-border/50 rounded-xl overflow-hidden min-h-[300px] flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-border/50">
            <BarChart3 className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium text-foreground mb-2">Gráficos en Construcción</h3>
          <p className="text-muted-foreground max-w-md">
            Módulo de reportes y métricas detalladas en desarrollo.
          </p>
        </div>
      </div>
    </div>
  )
}
