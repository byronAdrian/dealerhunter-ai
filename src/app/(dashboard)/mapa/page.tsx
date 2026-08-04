import { createClient } from "@/utils/supabase/server"
import { MapPin } from "lucide-react"
import MapWrapper from "@/components/MapWrapper"

export const metadata = {
  title: "Mapa de Leads | DealerHunter"
}

export default async function MapaPage() {
  const supabase = await createClient()

  // Obtener datos reales
  const { data: companies } = await supabase.from("companies").select("*")
  const allCompanies = companies || []

  return (
    <div className="space-y-6 relative z-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-editorial flex items-center gap-2">
            <MapPin className="w-8 h-8 text-[var(--color-gold)]" />
            Mapa de Prospección
          </h1>
          <p className="text-muted-foreground mt-1">Ubicación geográfica de los concesionarios y compraventas</p>
        </div>
      </div>

      <div className="glass-panel p-2 rounded-2xl">
        <MapWrapper companies={allCompanies} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Total Ubicados</h3>
          <p className="text-3xl font-bold text-foreground font-editorial">{allCompanies.filter(c => c.city).length}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sin Ubicación</h3>
          <p className="text-3xl font-bold text-foreground font-editorial">{allCompanies.filter(c => !c.city).length}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl bg-[var(--color-gold)]/10 border-[var(--color-gold)]/20">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--color-gold)]" />
            Estrategia
          </h3>
          <p className="text-sm text-muted-foreground">Identifica zonas de alta densidad para planificar visitas comerciales o campañas de mailing locales hiper-segmentadas.</p>
        </div>
      </div>
    </div>
  )
}
