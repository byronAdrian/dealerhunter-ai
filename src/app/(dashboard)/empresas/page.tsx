"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/utils/supabase/client"
import { Plus, Search, Building2, MoreVertical, MapPin, Globe } from "lucide-react"

export default function EmpresasPage() {
  const router = useRouter()
  const [empresas, setEmpresas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmpresas = async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setEmpresas(data)
      setLoading(false)
    }

    fetchEmpresas()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">Empresas</h1>
          <p className="text-sm text-muted-foreground mt-1">Gestiona los concesionarios y su estado comercial.</p>
        </div>
        <button className="bg-[var(--color-gold)] text-[var(--color-graphite)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-gold-light)] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nueva Empresa
        </button>
      </div>

      <div className="bg-white dark:glass-panel rounded-xl border border-black/5 dark:border-border/50 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-black/5 dark:border-border/50 flex items-center justify-between">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar concesionarios..." 
              className="pl-9 pr-4 py-2 bg-[var(--color-background)] border border-black/5 dark:border-border/50 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground border border-black/5 dark:border-border/50 rounded-lg hover:bg-[var(--color-background)] transition-colors">
              Filtros
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-[var(--color-background)]">
              <tr>
                <th className="px-6 py-3">Concesionario</th>
                <th className="px-6 py-3">Ubicación</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Puntuación IA</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Cargando empresas...
                  </td>
                </tr>
              ) : empresas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center">
                      <Building2 className="w-8 h-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No hay empresas registradas aún.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                empresas.map((empresa) => (
                  <tr 
                    key={empresa.id} 
                    onClick={() => router.push(`/empresas/${empresa.id}`)}
                    className="border-b border-black/5 dark:border-border/50 hover:bg-[var(--color-background)]/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-background)] flex items-center justify-center text-[var(--color-gold)]">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div>{empresa.name}</div>
                        {empresa.website && (
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Globe className="w-3 h-3" />
                            {empresa.website.replace('https://', '').replace('www.', '')}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {empresa.city || 'Desconocido'}, {empresa.province}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800">
                        {empresa.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-[var(--color-background)] rounded-full h-2 max-w-[100px]">
                          <div className="bg-[var(--color-gold)] h-2 rounded-full" style={{ width: `${empresa.ai_score_total || 0}%` }}></div>
                        </div>
                        <span className="text-xs font-medium">{empresa.ai_score_total || 0}/100</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-muted-foreground hover:text-[var(--color-foreground)] transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
