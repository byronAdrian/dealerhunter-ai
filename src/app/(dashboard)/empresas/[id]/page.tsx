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
    return <div className="p-6 text-muted-foreground flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Cargando detalles de la empresa...</div>
  }

  if (!empresa) {
    return (
      <div className="p-6 text-center flex flex-col items-center mt-20">
        <Building2 className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Empresa no encontrada</h2>
        <p className="text-muted-foreground mb-6">El concesionario que buscas no existe o ha sido eliminado.</p>
        <button onClick={() => router.back()} className="px-4 py-2 bg-[var(--color-gold)] text-[var(--color-graphite)] rounded-lg font-medium">Volver al listado</button>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto relative z-10">
      <Link href="/empresas" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit">
        <ArrowLeft className="w-4 h-4" />
        Volver a Empresas
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-gold)] border border-[var(--color-gold)]/20 shadow-sm shrink-0">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight font-editorial">{empresa.name}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground flex-wrap">
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
              <span className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-full">
                {empresa.status}
              </span>
              {empresa.category && (
                <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground border border-border/50 rounded-full">
                  {empresa.category}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
          <button 
            onClick={handleSendEmail} 
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 glass-panel hover:bg-muted/50 rounded-lg text-sm font-medium transition-colors text-foreground disabled:opacity-50 shadow-sm"
          >
            <Send className="w-4 h-4" />
            Enviar Email
          </button>
          <Link href={`/empresas/${empresa.id}/propuesta`} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-gold)] hover:opacity-90 text-black shadow-sm rounded-lg text-sm font-semibold transition-colors">
            <Sparkles className="w-4 h-4" />
            Generar Propuesta
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground font-editorial">Análisis IA de Presencia Digital</h2>
              {empresa.ai_score_total && (
                <button 
                  onClick={handleAnalyze} 
                  disabled={analyzing}
                  className="text-xs flex items-center gap-1 bg-muted/50 hover:bg-muted border border-border/50 text-foreground px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 font-medium"
                >
                  {analyzing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-[var(--color-gold)]" />}
                  {analyzing ? "Analizando..." : "Re-analizar"}
                </button>
              )}
            </div>
            
            {empresa.ai_score_total ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold text-[var(--color-gold)] font-editorial">{empresa.ai_score_total}</div>
                  <div className="text-sm text-muted-foreground">
                    Puntuación Global<br/>
                    <span className="text-foreground font-medium">Presencia Mejorable</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground uppercase font-semibold">Diseño</div>
                    <div className="text-lg font-bold text-foreground">{empresa.ai_score_design || 0}/100</div>
                    <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-1.5"><div className="bg-[var(--color-gold)] h-1.5 rounded-full" style={{width: `${empresa.ai_score_design || 0}%`}}></div></div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground uppercase font-semibold">SEO</div>
                    <div className="text-lg font-bold text-foreground">{empresa.ai_score_seo || 0}/100</div>
                    <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-1.5"><div className="bg-red-500 h-1.5 rounded-full" style={{width: `${empresa.ai_score_seo || 0}%`}}></div></div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground uppercase font-semibold">Velocidad</div>
                    <div className="text-lg font-bold text-foreground">{empresa.ai_score_speed || 0}/100</div>
                    <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-1.5"><div className="bg-orange-500 h-1.5 rounded-full" style={{width: `${empresa.ai_score_speed || 0}%`}}></div></div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground uppercase font-semibold">Marketing</div>
                    <div className="text-lg font-bold text-foreground">{empresa.ai_score_marketing || 0}/100</div>
                    <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{width: `${empresa.ai_score_marketing || 0}%`}}></div></div>
                  </div>
                </div>
                
                <div className="bg-card/50 p-4 rounded-xl border border-border/50 mt-4 shadow-sm">
                  <h3 className="text-sm font-semibold mb-2 text-foreground flex items-center gap-2"><Sparkles className="w-4 h-4 text-[var(--color-gold)]" /> Informe Resumen IA</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {empresa.ai_report || "La empresa dispone de una página web funcional, aunque presenta un diseño visual desactualizado, baja velocidad de carga y escasa optimización SEO. La incorporación de una nueva web junto con el CRM especializado y el sistema VeriFactu permitiría mejorar la captación de clientes y automatizar completamente la gestión administrativa."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                <h3 className="text-foreground font-semibold text-lg">Sin analizar</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-6">La IA aún no ha analizado la presencia digital de esta empresa.</p>
                <button 
                  onClick={handleAnalyze} 
                  disabled={analyzing}
                  className="px-6 py-2 bg-muted/50 hover:bg-muted border border-border/50 rounded-lg text-sm font-medium transition-colors text-foreground flex items-center gap-2 mx-auto disabled:opacity-50 shadow-sm"
                >
                  {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {analyzing ? "Analizando..." : "Ejecutar Análisis IA"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-foreground font-editorial">Información de Contacto</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="bg-muted/50 p-2 rounded-lg shrink-0 border border-border/50">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{empresa.phone || 'No disponible'}</div>
                  <div className="text-xs text-muted-foreground">Teléfono Principal</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-muted/50 p-2 rounded-lg shrink-0 border border-border/50">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{empresa.email || 'No disponible'}</div>
                  <div className="text-xs text-muted-foreground">Correo Electrónico</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-muted/50 p-2 rounded-lg shrink-0 border border-border/50">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{empresa.address || 'No disponible'}</div>
                  <div className="text-xs text-muted-foreground">{empresa.postal_code} {empresa.city}, {empresa.province}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-muted/50 p-2 rounded-lg shrink-0 border border-border/50">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{empresa.business_hours || 'No especificado'}</div>
                  <div className="text-xs text-muted-foreground">Horario</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-foreground font-editorial">Reputación</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-[var(--color-gold)] fill-[var(--color-gold)]" />
                <span className="text-3xl font-bold text-foreground font-editorial">{empresa.rating || 'N/A'}</span>
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {empresa.reviews_count || 0} reseñas en Google
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
