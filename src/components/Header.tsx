import { Bell, Search } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Search className="w-5 h-5" />
        <input 
          type="text" 
          placeholder="Buscar empresas, contactos..." 
          className="bg-transparent border-none focus:outline-none text-sm w-64 text-foreground"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-red-dark)] rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-[var(--color-gold)] flex items-center justify-center text-black font-bold text-sm">
          BA
        </div>
      </div>
    </header>
  )
}
