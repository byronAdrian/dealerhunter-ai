import { Target, Users, TrendingUp, Mail } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { DashboardCharts } from "@/components/DashboardCharts"

export default async function DashboardPage() {
  const supabase = await createClient()

  // Obtener datos reales
  const { data: companies } = await supabase.from("companies").select("*")
  const allCompanies = companies || []
  const totalCompanies = allCompanies.length
  const totalClients = allCompanies.filter((c) => c.status === "Cliente").length

  return (
    <div className="space-y-6 relative z-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-editorial">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Resumen de actividad comercial</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI Cards */}
        <div className="p-6 rounded-2xl glass-panel relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-sm font-medium text-muted-foreground">Empresas Encontradas</h3>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-bold text-foreground font-editorial relative z-10">{totalCompanies}</p>
          <div className="mt-3 text-xs text-green-500 font-medium relative z-10">
            Datos reales de Supabase
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-sm font-medium text-muted-foreground">Nuevos Clientes</h3>
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shadow-inner">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-bold text-foreground font-editorial relative z-10">{totalClients}</p>
          <div className="mt-3 text-xs text-green-500 font-medium relative z-10">
            Estado "Cliente" en CRM
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel opacity-80 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-sm font-medium text-muted-foreground">Facturación Prevista</h3>
            <div className="w-10 h-10 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-gold)] shadow-inner">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-bold text-foreground font-editorial relative z-10">€0</p>
          <div className="mt-3 text-xs text-muted-foreground font-medium relative z-10">
            Próximamente
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel opacity-80 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-sm font-medium text-muted-foreground">Emails Abiertos</h3>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shadow-inner">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-bold text-foreground font-editorial relative z-10">0%</p>
          <div className="mt-3 text-xs text-muted-foreground font-medium relative z-10">
            Conexión con Resend en breve
          </div>
        </div>
      </div>

      <DashboardCharts companies={allCompanies} />
    </div>
  )
}
