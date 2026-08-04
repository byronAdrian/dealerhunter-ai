"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/utils/supabase/client"
import { Building2, MapPin, Globe, Phone, Mail, Clock, Star, ArrowLeft, Sparkles, Send, Loader2 } from "lucide-react"
import Link from "next/link"

export default function EmpresaDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [empresa, setEmpresa] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)

  useEffect(() => {
    if (!params.id) return
    
    const fetchEmpresa = async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', params.id as string)
        .single()
      
      if (data) setEmpresa(data)
      setLoading(false)
    }

    fetchEmpresa()
  }, [params.id])

  const handleAnalyze = async () => {
    if (!empresa) return
    setAnalyzing(true)

    try {
      // 1. Llamar a la API de análisis simulado
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId: empresa.id, website: empresa.website })
      })

      const result = await res.json()

      if (result.success) {
        const aiData = result.data

        // 2. Actualizar Supabase
        const { error } = await supabase
          .from('companies')
          .update({
            ai_score_design: aiData.ai_score_design,
            ai_score_seo: aiData.ai_score_seo,
            ai_score_speed: aiData.ai_score_speed,
            ai_score_marketing: aiData.ai_score_marketing,
            ai_score_security: aiData.ai_score_security,
            ai_score_total: aiData.ai_score_total
          })
          .eq('id', empresa.id)
        
        if (error) {
          console.error("Error al actualizar la base de datos", error)
          alert("Error al guardar el análisis. (¿Tienes habilitado RLS anónimo para UPDATE?)")
        } else {
          // 3. Actualizar estado local
          setEmpresa({ ...empresa, ...aiData })
        }
      } else {
        alert("Error en el análisis de IA")
      }
    } catch (err) {
      console.error(err)
      alert("Error al comunicar con la API de IA")
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSendEmail = async () => {
    if (!empresa?.email) {
      alert("La empresa no tiene correo electrónico")
      return
    }
    try {
      const res = await fetch('/api/send-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName: empresa.name, email: empresa.email, score: empresa.ai_score_total || 0, companyId: empresa.id })
      })
      if (res.ok) alert("Email enviado")
    } catch(e) { alert("Error") }
  }

  if (loading) {
    return <div className="p-6 text-[var(--color-gray-medium)] flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Cargando detalles de la empresa...</div>
  }

  if (!empresa) {
    return (
      <div className="p-6 text-center flex flex-col items-center mt-20">
        <Building2 className="w-12 h-12 text-[var(--color-gray-medium)] mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Empresa no encontrada</h2>
        <p className="text-[var(--color-gray-medium)] mb-6">El concesionario que buscas no existe o ha sido eliminado.</p>
        <button onClick={() => router.back()} className="px-4 py-2 bg-[var(--color-gold)] text-[var(--color-graphite)] rounded-lg font-medium">Volver al listado</button>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link href="/empresas" className="flex items-center gap-2 text-sm text-[var(--color-gray-medium)] hover:text-white transition-colors w-fit">
        <ArrowLeft className="w-4 h-4" />
        Volver a Empresas
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-[var(--color-graphite-light)] flex items-center justify-center text-[var(--color-gold)] border border-white/10 shadow-sm shrink-0">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">{empresa.name}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-[var(--color-gray-medium)] flex-wrap">
              {empresa.city && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {empresa.city}, {empresa.province}
                </span>
              )}
              {empresa.website && (
                <a href={empresa.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[var(--color-gold)] transition-colors">
                  <Globe className="w-4 h-4" />
                  Sitio Web
                </a>
              )}
            </div>
            <div className="flex gap-2 mt-3">
              <span className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                {empresa.status}
              </span>
              {empresa.category && (
                <span className="px-3 py-1 text-xs font-medium bg-white/5 text-[var(--color-gray-medium)] border border-white/10 rounded-full">
                  {empresa.category}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={handleSendEmail} 
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-graphite-light)] hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors text-white disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Enviar Email
          </button>
          <Link href={`/empresas/${empresa.id}/propuesta`} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-graphite)] rounded-lg text-sm font-medium transition-colors">
            <Sparkles className="w-4 h-4" />
            Generar Propuesta
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Análisis IA de Presencia Digital</h2>
              {empresa.ai_score_total && (
                <button 
                  onClick={handleAnalyze} 
                  disabled={analyzing}
                  className="text-xs flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-2 py-1 rounded transition-colors disabled:opacity-50"
                >
                  {analyzing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-[var(--color-gold)]" />}
                  {analyzing ? "Analizando..." : "Re-analizar"}
                </button>
              )}
            </div>
            
            {empresa.ai_score_total ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-[var(--color-gold)]">{empresa.ai_score_total}</div>
                  <div className="text-sm text-[var(--color-gray-medium)]">
                    Puntuación Global<br/>
                    <span className="text-white">Presencia Mejorable</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-[var(--color-gray-medium)] uppercase">Diseño</div>
                    <div className="text-lg font-medium text-white">{empresa.ai_score_design || 0}/100</div>
                    <div className="w-full bg-black/20 rounded-full h-1.5"><div className="bg-[var(--color-gold)] h-1.5 rounded-full" style={{width: `${empresa.ai_score_design || 0}%`}}></div></div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-[var(--color-gray-medium)] uppercase">SEO</div>
                    <div className="text-lg font-medium text-white">{empresa.ai_score_seo || 0}/100</div>
                    <div className="w-full bg-black/20 rounded-full h-1.5"><div className="bg-red-500 h-1.5 rounded-full" style={{width: `${empresa.ai_score_seo || 0}%`}}></div></div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-[var(--color-gray-medium)] uppercase">Velocidad</div>
                    <div className="text-lg font-medium text-white">{empresa.ai_score_speed || 0}/100</div>
                    <div className="w-full bg-black/20 rounded-full h-1.5"><div className="bg-orange-500 h-1.5 rounded-full" style={{width: `${empresa.ai_score_speed || 0}%`}}></div></div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-[var(--color-gray-medium)] uppercase">Marketing</div>
                    <div className="text-lg font-medium text-white">{empresa.ai_score_marketing || 0}/100</div>
                    <div className="w-full bg-black/20 rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{width: `${empresa.ai_score_marketing || 0}%`}}></div></div>
                  </div>
                </div>
                
                <div className="bg-[var(--color-graphite)] p-4 rounded-lg border border-white/5 mt-4">
                  <h3 className="text-sm font-medium mb-2 text-white flex items-center gap-2"><Sparkles className="w-4 h-4 text-[var(--color-gold)]" /> Informe Resumen IA</h3>
                  <p className="text-sm text-[var(--color-gray-medium)] leading-relaxed">
                    {empresa.ai_report || "La empresa dispone de una página web funcional, aunque presenta un diseño visual desactualizado, baja velocidad de carga y escasa optimización SEO. La incorporación de una nueva web junto con el CRM especializado y el sistema VeriFactu permitiría mejorar la captación de clientes y automatizar completamente la gestión administrativa."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Sparkles className="w-10 h-10 text-[var(--color-gray-medium)] mx-auto mb-3 opacity-50" />
                <h3 className="text-white font-medium">Sin analizar</h3>
                <p className="text-sm text-[var(--color-gray-medium)] mt-1 mb-4">La IA aún no ha analizado la presencia digital de esta empresa.</p>
                <button 
                  onClick={handleAnalyze} 
                  disabled={analyzing}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors text-white flex items-center gap-2 mx-auto disabled:opacity-50"
                >
                  {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {analyzing ? "Analizando..." : "Ejecutar Análisis IA"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-white">Información de Contacto</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[var(--color-gray-medium)] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-white">{empresa.phone || 'No disponible'}</div>
                  <div className="text-xs text-[var(--color-gray-medium)]">Teléfono Principal</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[var(--color-gray-medium)] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-white">{empresa.email || 'No disponible'}</div>
                  <div className="text-xs text-[var(--color-gray-medium)]">Correo Electrónico</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--color-gray-medium)] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-white">{empresa.address || 'No disponible'}</div>
                  <div className="text-xs text-[var(--color-gray-medium)]">{empresa.postal_code} {empresa.city}, {empresa.province}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[var(--color-gray-medium)] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-white">{empresa.business_hours || 'No especificado'}</div>
                  <div className="text-xs text-[var(--color-gray-medium)]">Horario</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--color-graphite-light)] border border-white/10 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-white">Reputación</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-[var(--color-gold)] fill-[var(--color-gold)]" />
                <span className="text-xl font-bold text-white">{empresa.rating || 'N/A'}</span>
              </div>
              <div className="text-sm text-[var(--color-gray-medium)]">
                {empresa.reviews_count || 0} reseñas en Google
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
