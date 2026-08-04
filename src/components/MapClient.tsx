"use client"

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Fix missing marker icons in leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapClient({ companies }: { companies: any[] }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="h-[600px] w-full rounded-2xl glass-panel animate-pulse"></div>

  // We will estimate positions for demonstration, or default to Spain center
  // In a real app, you would use a geocoding service (like Mapbox or Google) to get real lat/lng for 'company.city'
  // Here we'll just plot some random slight offsets around Madrid/Spain for demo if they have no lat/lng,
  // or you can add lat/lng to your supabase table later.
  
  const validCompanies = companies.filter(c => c.city)

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-border/50 shadow-xl relative z-0">
      <MapContainer center={[40.4168, -3.7038]} zoom={6} className="h-full w-full" style={{ zIndex: 0 }}>
        {/* Dark/Light mode tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {validCompanies.map((company, i) => {
          // Mock coordinates based on city string hash (to keep them in same spot for same city)
          // Ideally you fetch real lat/lng in your prospect logic
          const hash = company.city.split('').reduce((a: number,b: string) => (((a << 5) - a) + b.charCodeAt(0))|0, 0)
          const lat = 40.4168 + ((hash % 100) / 20) - 2.5
          const lng = -3.7038 + ((hash % 70) / 10) - 3.5

          return (
            <Marker key={company.id || i} position={[lat, lng]} icon={customIcon}>
              <Popup className="custom-popup">
                <div className="font-sans">
                  <h3 className="font-bold text-gray-900">{company.name}</h3>
                  <p className="text-gray-600 text-sm m-0">{company.city}, {company.province}</p>
                  <a href={`/empresas/${company.id}`} className="text-[var(--color-gold-dark)] text-xs mt-2 inline-block font-semibold hover:underline">Ver detalles</a>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
      <style jsx global>{`
        .leaflet-container {
          background-color: transparent !important;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  )
}
