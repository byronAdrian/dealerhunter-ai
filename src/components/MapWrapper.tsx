"use client"

import dynamic from "next/dynamic"

const MapClient = dynamic(() => import("@/components/MapClient"), { 
  ssr: false,
  loading: () => <div className="h-[600px] w-full rounded-2xl glass-panel flex items-center justify-center text-muted-foreground">Cargando mapa interactivo...</div>
})

export default function MapWrapper({ companies }: { companies: any[] }) {
  return <MapClient companies={companies} />
}
