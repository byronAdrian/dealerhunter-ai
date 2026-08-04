"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Sparkles, BarChart3, PieChart as PieChartIcon } from 'lucide-react'

const COLORS = ['var(--color-gold)', '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

export function DashboardCharts({ companies }: { companies: any[] }) {
  // Process data for charts
  const statusData = [
    { name: 'Sin contactar', value: companies.filter(c => c.status === 'Sin contactar').length },
    { name: 'Contactado', value: companies.filter(c => c.status === 'Contactado').length },
    { name: 'Reunión agendada', value: companies.filter(c => c.status === 'Reunión agendada').length },
    { name: 'Cliente', value: companies.filter(c => c.status === 'Cliente').length },
  ].filter(d => d.value > 0) // Only show statuses with > 0

  // Fallback data if everything is 0
  const finalStatusData = statusData.length > 0 ? statusData : [{ name: 'Sin datos', value: 1 }]

  // Process cities
  const cityMap: Record<string, number> = {}
  companies.forEach(c => {
    if (c.city) {
      cityMap[c.city] = (cityMap[c.city] || 0) + 1
    }
  })
  const cityData = Object.entries(cityMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5) // Top 5
    
  const finalCityData = cityData.length > 0 ? cityData : [{ name: 'Sin datos', value: 1 }]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border/50 p-3 rounded-lg shadow-xl text-popover-foreground">
          <p className="font-semibold text-sm">{label || payload[0].name}</p>
          <p className="text-[var(--color-gold)] font-bold text-lg">{payload[0].value} <span className="text-xs text-muted-foreground font-normal">empresas</span></p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Bar Chart */}
      <div className="glass-panel rounded-2xl p-6 shadow-sm flex flex-col h-[400px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-foreground font-editorial flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[var(--color-gold)]" />
              Embudo de Ventas
            </h3>
            <p className="text-sm text-muted-foreground">Estado actual de todos los leads</p>
          </div>
        </div>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={finalStatusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.1)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-gray-medium)' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-gray-medium)' }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(128,128,128,0.1)' }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {finalStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="glass-panel rounded-2xl p-6 shadow-sm flex flex-col h-[400px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-foreground font-editorial flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-[var(--color-gold)]" />
              Top 5 Ciudades
            </h3>
            <p className="text-sm text-muted-foreground">Distribución geográfica de los leads</p>
          </div>
        </div>
        <div className="flex-1 w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={finalCityData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {finalCityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Centered text in donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold font-editorial text-foreground">{companies.length}</span>
            <span className="text-xs text-muted-foreground uppercase font-semibold">Total</span>
          </div>
        </div>
      </div>
    </div>
  )
}
