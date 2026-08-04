import { Users, Search, Plus, Filter, MoreHorizontal } from "lucide-react"

export default function CRMPage() {
  return (
    <div className="flex-1 overflow-auto bg-[var(--color-graphite)] p-8">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">CRM de Concesionarios</h1>
            <p className="text-[var(--color-gray-medium)]">Gestiona el estado de tus leads y oportunidades comerciales.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-[var(--color-graphite-light)] text-white border border-white/10 px-4 py-2 rounded-lg font-medium hover:bg-white/5 transition-colors flex items-center gap-2 text-sm">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            <button className="bg-[var(--color-gold)] text-[var(--color-graphite-dark)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-gold-light)] transition-colors flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              Añadir Lead
            </button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Columna: Nuevos Leads */}
          <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <h3 className="font-medium text-white">Nuevos Leads</h3>
              </div>
              <span className="text-xs bg-white/10 text-white px-2 py-1 rounded-full">0</span>
            </div>
            <div className="p-4 flex-1">
              <div className="h-full border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center">
                <p className="text-[var(--color-gray-medium)] text-sm">Arrastra clientes aquí</p>
              </div>
            </div>
          </div>

          {/* Columna: En Negociación */}
          <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-gold)]"></div>
                <h3 className="font-medium text-white">En Negociación</h3>
              </div>
              <span className="text-xs bg-white/10 text-white px-2 py-1 rounded-full">0</span>
            </div>
            <div className="p-4 flex-1">
              <div className="h-full border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center">
                <p className="text-[var(--color-gray-medium)] text-sm">Arrastra clientes aquí</p>
              </div>
            </div>
          </div>

          {/* Columna: Cerrados */}
          <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <h3 className="font-medium text-white">Cerrados</h3>
              </div>
              <span className="text-xs bg-white/10 text-white px-2 py-1 rounded-full">0</span>
            </div>
            <div className="p-4 flex-1">
              <div className="h-full border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center">
                <p className="text-[var(--color-gray-medium)] text-sm">Arrastra clientes aquí</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
