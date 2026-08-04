import Link from "next/link"
import { LayoutDashboard, Building2, Map, Target, Sparkles, FileText, MonitorPlay, Mail, Megaphone, Users, Calendar, BarChart3, Settings, ScrollText, UserCircle } from "lucide-react"

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Empresas", icon: Building2, href: "/empresas" },
  { name: "Mapa", icon: Map, href: "/mapa" },
  { name: "Prospección", icon: Target, href: "/prospeccion" },
  { name: "Análisis IA", icon: Sparkles, href: "/analisis" },
  { name: "Propuestas", icon: FileText, href: "/propuestas" },
  { name: "Demo Web", icon: MonitorPlay, href: "/demos" },
  { name: "Emails", icon: Mail, href: "/emails" },
  { name: "Campañas", icon: Megaphone, href: "/campanas" },
  { name: "CRM", icon: Users, href: "/crm" },
  { name: "Calendario", icon: Calendar, href: "/calendario" },
  { name: "Estadísticas", icon: BarChart3, href: "/estadisticas" },
]

const bottomItems = [
  { name: "Configuración", icon: Settings, href: "/configuracion" },
  { name: "Logs", icon: ScrollText, href: "/logs" },
  { name: "Perfil", icon: UserCircle, href: "/perfil" },
]

export function Sidebar() {
  return (
    <aside className="w-64 bg-[var(--color-graphite-light)] border-r border-white/10 flex flex-col h-screen sticky top-0 hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-[var(--color-gold)] p-2 rounded-lg text-[var(--color-graphite)]">
          <Target className="w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">DealerHunter</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--color-gray-medium)] hover:text-white hover:bg-white/5 transition-colors">
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="p-3 border-t border-white/10 space-y-1">
        {bottomItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--color-gray-medium)] hover:text-white hover:bg-white/5 transition-colors">
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}
