import { Filter, MoreHorizontal, Mail, Phone, MapPin } from "lucide-react"
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
    <div key={company.id} className="bg-[var(--color-graphite)] border border-white/10 rounded-lg p-4 mb-3 hover:border-white/20 transition-colors group cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-white truncate pr-4" title={company.name}>{company.name}</h4>
        <button className="text-[var(--color-gray-medium)] opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-2 mb-3">
        {company.email && (
          <div className="flex items-center gap-2 text-xs text-[var(--color-gray-medium)]">
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{company.email}</span>
          </div>
        )}
        {company.phone && (
          <div className="flex items-center gap-2 text-xs text-[var(--color-gray-medium)]">
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{company.phone}</span>
          </div>
        )}
        {company.city && (
          <div className="flex items-center gap-2 text-xs text-[var(--color-gray-medium)]">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{company.city}{company.province ? `, ${company.province}` : ''}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-white/5">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-gold)] bg-[var(--color-gold)]/10 px-2 py-0.5 rounded">
          {company.status}
        </span>
        <span className="text-xs text-[var(--color-gray-medium)]">
          {new Date(company.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  )

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
            <AddLeadModal />
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Columna: Nuevos Leads */}
          <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl flex flex-col h-[calc(100vh-200px)] overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <h3 className="font-medium text-white">Nuevos Leads</h3>
              </div>
              <span className="text-xs bg-white/10 text-white px-2 py-1 rounded-full">{leadsNuevos.length}</span>
            </div>
            <div className="p-3 flex-1 overflow-y-auto">
              {leadsNuevos.length > 0 ? (
                leadsNuevos.map(renderCompanyCard)
              ) : (
                <div className="h-full border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center p-4 text-center">
                  <p className="text-[var(--color-gray-medium)] text-sm">Utiliza "Añadir Lead" para prospectar nuevas empresas con IA.</p>
                </div>
              )}
            </div>
          </div>

          {/* Columna: En Negociación */}
          <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl flex flex-col h-[calc(100vh-200px)] overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-gold)]"></div>
                <h3 className="font-medium text-white">En Negociación</h3>
              </div>
              <span className="text-xs bg-white/10 text-white px-2 py-1 rounded-full">{enNegociacion.length}</span>
            </div>
            <div className="p-3 flex-1 overflow-y-auto">
              {enNegociacion.length > 0 ? (
                enNegociacion.map(renderCompanyCard)
              ) : (
                <div className="h-full border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center p-4 text-center">
                  <p className="text-[var(--color-gray-medium)] text-sm">Arrastra clientes aquí cuando comiences a contactarlos.</p>
                </div>
              )}
            </div>
          </div>

          {/* Columna: Cerrados */}
          <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl flex flex-col h-[calc(100vh-200px)] overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <h3 className="font-medium text-white">Cerrados</h3>
              </div>
              <span className="text-xs bg-white/10 text-white px-2 py-1 rounded-full">{cerrados.length}</span>
            </div>
            <div className="p-3 flex-1 overflow-y-auto">
              {cerrados.length > 0 ? (
                cerrados.map(renderCompanyCard)
              ) : (
                <div className="h-full border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center p-4 text-center">
                  <p className="text-[var(--color-gray-medium)] text-sm">Aquí aparecerán los clientes ganados y perdidos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
