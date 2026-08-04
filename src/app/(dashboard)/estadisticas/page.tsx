import { BarChart3, TrendingUp, Users, Target } from "lucide-react"

export default function EstadisticasPage() {
  return (
    <div className="flex-1 overflow-auto bg-[var(--color-graphite)] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Estadísticas de la Agencia</h1>
            <p className="text-[var(--color-gray-medium)]">Rendimiento global del equipo comercial y de captación.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[var(--color-graphite-light)] border border-white/10 p-6 rounded-xl">
            <p className="text-[var(--color-gray-medium)] text-sm mb-2">Tasa de Conversión</p>
            <h3 className="text-3xl font-bold text-white">0%</h3>
          </div>
          <div className="bg-[var(--color-graphite-light)] border border-white/10 p-6 rounded-xl">
            <p className="text-[var(--color-gray-medium)] text-sm mb-2">Emails Abiertos</p>
            <h3 className="text-3xl font-bold text-white">0%</h3>
          </div>
          <div className="bg-[var(--color-graphite-light)] border border-white/10 p-6 rounded-xl">
            <p className="text-[var(--color-gray-medium)] text-sm mb-2">Reuniones Agendadas</p>
            <h3 className="text-3xl font-bold text-white">0</h3>
          </div>
          <div className="bg-[var(--color-graphite-light)] border border-white/10 p-6 rounded-xl">
            <p className="text-[var(--color-gray-medium)] text-sm mb-2">Nuevos Clientes</p>
            <h3 className="text-3xl font-bold text-[var(--color-gold)]">0</h3>
          </div>
        </div>

        <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl overflow-hidden min-h-[300px] flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
            <BarChart3 className="w-8 h-8 text-[var(--color-gray-medium)]" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Gráficos en Construcción</h3>
          <p className="text-[var(--color-gray-medium)] max-w-md">
            Módulo de reportes y métricas detalladas en desarrollo.
          </p>
        </div>
      </div>
    </div>
  )
}
