import { Map as MapIcon } from "lucide-react"

export default function MapaPage() {
  return (
    <div className="flex-1 overflow-auto bg-[var(--color-graphite)] p-8">
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Mapa de Concesionarios</h1>
            <p className="text-[var(--color-gray-medium)]">Visualización geográfica de los leads detectados.</p>
          </div>
        </div>

        <div className="flex-1 bg-[var(--color-graphite-light)] border border-white/10 rounded-xl overflow-hidden min-h-[600px] flex flex-col items-center justify-center text-center relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Spain&zoom=6&size=800x600&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0xffffff&style=feature:all|element:labels.text.stroke|visibility:off&style=feature:water|element:geometry|color:0x1a1a1a&style=feature:landscape|element:geometry|color:0x222222&key=YOUR_API_KEY')] bg-cover bg-center"></div>
          
          <div className="relative z-10 p-12 bg-[var(--color-graphite-dark)]/80 backdrop-blur-md border border-white/10 rounded-2xl max-w-md shadow-2xl">
            <div className="w-16 h-16 bg-[var(--color-gold)]/10 rounded-full flex items-center justify-center mb-4 mx-auto border border-[var(--color-gold)]/20">
              <MapIcon className="w-8 h-8 text-[var(--color-gold)]" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Mapa en Desarrollo</h3>
            <p className="text-[var(--color-gray-medium)]">
              Próximamente podrás ver un mapa interactivo con la ubicación de todos los concesionarios detectados en tu zona.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
