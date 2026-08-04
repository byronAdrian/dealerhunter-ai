export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-graphite)] text-[var(--color-gray-soft)] p-4">
      <div className="max-w-md w-full bg-[var(--color-graphite-light)] rounded-2xl shadow-2xl p-8 border border-white/10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[var(--color-gold)] p-3 rounded-xl mb-4 text-[var(--color-graphite)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
          </div>
          <h1 className="text-2xl font-semibold text-white">DealerHunter AI</h1>
          <p className="text-sm text-[var(--color-gray-medium)] mt-2">Plataforma de prospección comercial</p>
        </div>
        
        <form className="space-y-4 flex flex-col">
          <div>
            <label className="block text-sm text-[var(--color-gray-medium)] mb-1">Email</label>
            <input type="email" placeholder="tu@email.com" className="w-full bg-[var(--color-graphite)] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] transition-all" />
          </div>
          
          <div>
            <label className="block text-sm text-[var(--color-gray-medium)] mb-1">Contraseña</label>
            <input type="password" placeholder="••••••••" className="w-full bg-[var(--color-graphite)] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] transition-all" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-[var(--color-gold)] w-4 h-4 rounded bg-[var(--color-graphite)] border-white/10" />
              <span className="text-[var(--color-gray-medium)]">Recordarme</span>
            </label>
            <a href="#" className="text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="button" className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-graphite)] font-medium py-3 rounded-lg mt-4 transition-colors">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}
