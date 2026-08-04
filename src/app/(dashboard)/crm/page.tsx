import { Filter, MoreHorizontal, Mail, Phone, MapPin, Globe } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { AddLeadModal } from "@/components/AddLeadModal"

export default async function CRMPage() {
  const supabase = await createClient()

  const { data: companies, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false })

  // Fallback a array vacío si hay error
  const allCompanies = companies || []

  // Agrupar por estado
  const leadsNuevos = allCompanies.filter(c => c.status === "Sin contactar")
  const enNegociacion = allCompanies.filter(c => 
    c.status === "Email enviado" || 
    c.status === "Abierto" || 
    c.status === "Interesado" || 
    c.status === "Llamada realizada" || 
    c.status === "Reunión agendada" || 
    c.status === "Propuesta enviada"
  )
  const cerrados = allCompanies.filter(c => c.status === "Cliente" || c.status === "Descartado")

  const renderCompanyCard = (company: any) => (
    <div key={company.id} className="bg-card/40 backdrop-blur-md border border-border/50 rounded-xl p-4 mb-3 hover:border-[var(--color-gold)]/50 transition-colors group cursor-pointer shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-foreground truncate pr-4 font-editorial text-lg" title={company.name}>{company.name}</h4>
        <button className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-2 mb-3">
        {company.email && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{company.email}</span>
          </div>
        )}
        {company.phone && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{company.phone}</span>
          </div>
        )}
        {company.city && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{company.city}{company.province ? `, ${company.province}` : ''}</span>
          </div>
        )}
        {company.website && (
          <div className="flex items-center gap-2 text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            <Globe className="w-3.5 h-3.5 flex-shrink-0" />
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="truncate hover:underline">
              {new URL(company.website).hostname.replace('www.', '')}
            </a>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-border">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-gold)] bg-[var(--color-gold)]/10 px-2 py-0.5 rounded">
          {company.status}
        </span>
        <span className="text-xs text-muted-foreground">
          {new Date(company.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  )

  return (
    <div className="flex-1 overflow-auto bg-background p-8">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-editorial mb-2">CRM de Concesionarios</h1>
            <p className="text-muted-foreground">Gestiona el estado de tus leads y oportunidades comerciales.</p>
          </div>
          <div className="flex gap-3">
            <button className="glass-panel text-foreground px-4 py-2 rounded-lg font-medium hover:bg-muted/50 transition-colors flex items-center gap-2 text-sm">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            <AddLeadModal />
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {/* Columna: Nuevos Leads */}
          <div className="glass-panel rounded-2xl flex flex-col h-[calc(100vh-200px)] overflow-hidden">
            <div className="p-4 border-b border-border/50 flex justify-between items-center bg-black/5 dark:bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <h3 className="font-medium text-foreground">Nuevos Leads</h3>
              </div>
              <span className="text-xs bg-black/10 dark:bg-white/10 text-foreground px-2 py-1 rounded-full font-medium">{leadsNuevos.length}</span>
            </div>
            <div className="p-3 flex-1 overflow-y-auto">
              {leadsNuevos.length > 0 ? (
                leadsNuevos.map(renderCompanyCard)
              ) : (
                <div className="h-full border-2 border-dashed border-border rounded-lg flex items-center justify-center p-4 text-center">
                  <p className="text-muted-foreground text-sm">Utiliza "Añadir Lead" para prospectar nuevas empresas con IA.</p>
                </div>
              )}
            </div>
          </div>

          {/* Columna: En Negociación */}
          <div className="glass-panel rounded-2xl flex flex-col h-[calc(100vh-200px)] overflow-hidden">
            <div className="p-4 border-b border-border/50 flex justify-between items-center bg-black/5 dark:bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-gold)]"></div>
                <h3 className="font-medium text-foreground">En Negociación</h3>
              </div>
              <span className="text-xs bg-black/10 dark:bg-white/10 text-foreground px-2 py-1 rounded-full font-medium">{enNegociacion.length}</span>
            </div>
            <div className="p-3 flex-1 overflow-y-auto">
              {enNegociacion.length > 0 ? (
                enNegociacion.map(renderCompanyCard)
              ) : (
                <div className="h-full border-2 border-dashed border-border rounded-lg flex items-center justify-center p-4 text-center">
                  <p className="text-muted-foreground text-sm">Arrastra clientes aquí cuando comiences a contactarlos.</p>
                </div>
              )}
            </div>
          </div>

          {/* Columna: Cerrados */}
          <div className="glass-panel rounded-2xl flex flex-col h-[calc(100vh-200px)] overflow-hidden">
            <div className="p-4 border-b border-border/50 flex justify-between items-center bg-black/5 dark:bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <h3 className="font-medium text-foreground">Cerrados</h3>
              </div>
              <span className="text-xs bg-black/10 dark:bg-white/10 text-foreground px-2 py-1 rounded-full font-medium">{cerrados.length}</span>
            </div>
            <div className="p-3 flex-1 overflow-y-auto">
              {cerrados.length > 0 ? (
                cerrados.map(renderCompanyCard)
              ) : (
                <div className="h-full border-2 border-dashed border-border rounded-lg flex items-center justify-center p-4 text-center">
                  <p className="text-muted-foreground text-sm">Aquí aparecerán los clientes ganados y perdidos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
