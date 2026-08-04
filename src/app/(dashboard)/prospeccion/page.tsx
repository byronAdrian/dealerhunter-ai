import { Target, Search, Filter } from "lucide-react"

export default function ProspeccionPage() {
  return (
    <div className="flex-1 overflow-auto bg-[var(--color-graphite)] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Prospección Activa</h1>
            <p className="text-[var(--color-gray-medium)]">Busca y filtra nuevos concesionarios en la web o Google Maps.</p>
          </div>
        </div>

        <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl overflow-hidden mb-6">
          <div className="p-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input 
                type="text"
                placeholder="Ej: 'Concesionarios multimarca en Madrid'..." 
                className="w-full bg-[var(--color-graphite)] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors"
              />
            </div>
            <button className="bg-[var(--color-graphite)] border border-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros Avanzados
            </button>
            <button className="bg-[var(--color-gold)] text-[var(--color-graphite-dark)] px-8 py-3 rounded-lg font-medium hover:bg-[var(--color-gold-light)] transition-colors flex items-center justify-center">
              Iniciar Búsqueda
            </button>
          </div>
        </div>

        <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
            <Target className="w-8 h-8 text-[var(--color-gray-medium)]" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Motor de Búsqueda</h3>
          <p className="text-[var(--color-gray-medium)] max-w-md">
            El motor de prospección automática está en construcción. Utiliza esta herramienta para lanzar scrapers y buscar nuevos leads.
          </p>
        </div>
      </div>
    </div>
  )
}
