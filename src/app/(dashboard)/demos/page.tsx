import { MonitorSmartphone, Code, CheckCircle2, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function DemosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">Demos y Plantillas</h1>
        <p className="text-sm text-[var(--color-gray-medium)] mt-1">Comparte estas plantillas de alto rendimiento con tus prospectos para cerrar ventas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Demo 1: AutoSync (El landing copiado) */}
        <div className="bg-white dark:bg-[var(--color-graphite-light)] rounded-xl border border-black/5 dark:border-white/10 shadow-sm overflow-hidden flex flex-col">
          <div className="h-48 bg-black relative flex items-center justify-center">
            {/* Si tienes una imagen del landing puedes ponerla de fondo */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
            <MonitorSmartphone className="w-16 h-16 text-[var(--color-gold)] relative z-10 opacity-80" />
            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Alta Conversión
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-2">AutoSync Premium</h3>
            <p className="text-sm text-[var(--color-gray-medium)] mb-4 flex-1">
              Plantilla de alto impacto para concesionarios multimarca. Incluye listado de vehículos, página de detalles, filtros dinámicos y optimización SEO extrema.
            </p>
            <div className="flex gap-2 text-xs text-[var(--color-gray-medium)] mb-6 flex-wrap">
              <span className="px-2 py-1 bg-black/5 dark:bg-white/5 rounded border border-black/5 dark:border-white/10">UI Moderna</span>
              <span className="px-2 py-1 bg-black/5 dark:bg-white/5 rounded border border-black/5 dark:border-white/10">Catálogo Vehículos</span>
              <span className="px-2 py-1 bg-black/5 dark:bg-white/5 rounded border border-black/5 dark:border-white/10">Responsive</span>
            </div>
            <div className="flex gap-3">
              <a 
                href="/demo/index.html" 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-gold)] text-[var(--color-graphite)] rounded-lg text-sm font-medium hover:bg-[var(--color-gold-light)] transition-colors"
              >
                Ver Demo
                <ExternalLink className="w-4 h-4" />
              </a>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-background)] border border-black/10 dark:border-white/10 text-[var(--color-foreground)] rounded-lg text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <Code className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
