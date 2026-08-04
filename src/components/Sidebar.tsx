"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Building2, Map, Target, Sparkles, FileText, MonitorPlay, Mail, Megaphone, Users, Calendar, BarChart3, Settings, ScrollText, UserCircle } from "lucide-react"
import { LogoutButton } from "./LogoutButton"
import { ThemeToggle } from "./ThemeToggle"

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Empresas", icon: Building2, href: "/empresas" },
  { name: "Mapa", icon: Map, href: "/mapa" },
  { name: "Prospección", icon: Target, href: "/prospeccion" },
  { name: "Análisis IA", icon: Sparkles, href: "/analisis" },
  { name: "Propuestas", icon: FileText, href: "/propuestas" },
  { name: "Demos y Plantillas", icon: MonitorPlay, href: "/demos" },
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
  const pathname = usePathname()

  return (
    <aside className="w-64 glass-sidebar flex flex-col h-screen sticky top-0 hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-[var(--color-gold)] p-2 rounded-lg text-black">
          <Target className="w-6 h-6" />
        </div>
        <span className="text-xl font-bold font-editorial text-foreground tracking-tight">DealerHunter</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="p-3 border-t border-border/50 space-y-1">
        {bottomItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.name}</span>
          </Link>
        ))}
        <div className="flex items-center gap-3 px-3 py-2.5 justify-between">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
    </aside>
  )
}
