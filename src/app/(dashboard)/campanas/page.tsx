import { Megaphone, Plus, Search, Calendar, Users } from "lucide-react"

export default function CampanasPage() {
  return (
    <div className="flex-1 overflow-auto bg-[var(--color-graphite)] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Campañas de Prospección</h1>
            <p className="text-[var(--color-gray-medium)]">Organiza y lanza envíos masivos de correos y seguimiento.</p>
          </div>
          <button className="bg-[var(--color-gold)] text-[var(--color-graphite-dark)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-gold-light)] transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nueva Campaña
          </button>
        </div>

        <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
            <Megaphone className="w-8 h-8 text-[var(--color-gray-medium)]" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Sin campañas activas</h3>
          <p className="text-[var(--color-gray-medium)] max-w-md">
            El módulo de campañas masivas te permitirá automatizar la prospección. Agrupa varios concesionarios y lanza un envío escalonado de propuestas.
          </p>
        </div>
      </div>
    </div>
  )
}
