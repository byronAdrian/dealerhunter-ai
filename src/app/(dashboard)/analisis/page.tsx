import { Sparkles, BarChart, TrendingUp, AlertTriangle } from "lucide-react"

export default function AnalisisIAPage() {
  return (
    <div className="flex-1 overflow-auto bg-[var(--color-graphite)] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Dashboard de Análisis IA</h1>
            <p className="text-[var(--color-gray-medium)]">Estadísticas agregadas de todos los análisis generados por la IA.</p>
          </div>
          <button className="bg-[var(--color-gold)] text-[var(--color-graphite-dark)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-gold-light)] transition-colors flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Re-analizar BBDD
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[var(--color-graphite-light)] border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                <BarChart className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">42%</h3>
            <p className="text-[var(--color-gray-medium)] text-sm">Problemas SEO detectados</p>
          </div>
          <div className="bg-[var(--color-graphite-light)] border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">85%</h3>
            <p className="text-[var(--color-gray-medium)] text-sm">Sin catálogo online real</p>
          </div>
          <div className="bg-[var(--color-graphite-light)] border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">3.2M€</h3>
            <p className="text-[var(--color-gray-medium)] text-sm">Oportunidad de mercado estimada</p>
          </div>
        </div>

        <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl overflow-hidden min-h-[300px] flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
            <Sparkles className="w-8 h-8 text-[var(--color-gray-medium)]" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Vista Analítica en Construcción</h3>
          <p className="text-[var(--color-gray-medium)] max-w-md">
            Aquí se mostrarán gráficos y cruces de datos para entender las carencias del sector y adaptar el argumentario de ventas.
          </p>
        </div>
      </div>
    </div>
  )
}
