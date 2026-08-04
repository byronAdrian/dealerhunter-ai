import { Target, Users, TrendingUp, Mail } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI Cards */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[var(--color-graphite-light)] border border-black/5 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-gray-medium)]">Empresas Encontradas</h3>
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold">2,451</p>
          <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
            +180 esta semana
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[var(--color-graphite-light)] border border-black/5 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-gray-medium)]">Nuevos Clientes</h3>
            <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold">12</p>
          <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
            +3 este mes
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[var(--color-graphite-light)] border border-black/5 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-gray-medium)]">Facturación Prevista</h3>
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[var(--color-gold)]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold">€18,500</p>
          <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
            +12% vs mes anterior
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[var(--color-graphite-light)] border border-black/5 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-gray-medium)]">Emails Abiertos</h3>
            <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold">48.2%</p>
          <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
            Excelente tasa de apertura
          </div>
        </div>
      </div>
    </div>
  )
}
