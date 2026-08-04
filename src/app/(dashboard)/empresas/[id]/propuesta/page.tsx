"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/utils/supabase/client"
import { Building2, ArrowLeft, Download, Send, FileText, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function PropuestaPage() {
  const params = useParams()
  const router = useRouter()
  const [empresa, setEmpresa] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!params.id) return
    
    const fetchEmpresa = async () => {
      const { data } = await supabase
        .from('companies')
        .select('*')
        .eq('id', params.id as string)
        .single()
      
      if (data) setEmpresa(data)
      setLoading(false)
    }

    fetchEmpresa()
  }, [params.id])

  const handleSendProposal = async () => {
    if (!empresa?.email) {
      alert("La empresa no tiene un correo electrónico registrado.")
      return
    }
    
    setSending(true)
    try {
      const res = await fetch('/api/send-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          companyName: empresa.name, 
          email: empresa.email, 
          score: empresa.ai_score_total || 0,
          companyId: empresa.id 
        })
      })
      const result = await res.json()
      if (result.success) {
        alert("¡Propuesta enviada con éxito!")
      } else {
        alert("Hubo un error al enviar la propuesta.")
      }
    } catch (err) {
      console.error(err)
      alert("Error de conexión al enviar el correo.")
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return <div className="p-6 text-[var(--color-gray-medium)]">Cargando datos de la empresa...</div>
  }

  if (!empresa) {
    return <div className="p-6 text-center text-white">Empresa no encontrada</div>
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Link href={`/empresas/${empresa.id}`} className="flex items-center gap-2 text-sm text-[var(--color-gray-medium)] hover:text-white transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          Volver a {empresa.name}
        </Link>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors text-white flex items-center gap-2">
            <Download className="w-4 h-4" />
            PDF
          </button>
          <button 
            onClick={handleSendProposal}
            disabled={sending}
            className="px-3 py-1.5 bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-graphite)] rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {sending ? 'Enviando...' : 'Enviar Propuesta'}
          </button>
        </div>
      </div>

      <div className="bg-white text-black rounded-xl shadow-xl overflow-hidden print:shadow-none">
        {/* Portada */}
        <div className="bg-[var(--color-graphite)] text-white p-12 text-center border-b-[8px] border-[var(--color-gold)]">
          <div className="w-20 h-20 bg-white/10 rounded-2xl mx-auto flex items-center justify-center mb-6">
            <Building2 className="w-10 h-10 text-[var(--color-gold)]" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Auditoría de Presencia Digital</h1>
          <p className="text-xl text-[var(--color-gray-medium)] mb-8">Preparado para: {empresa.name}</p>
          <p className="text-sm text-[var(--color-gray-medium)]">DealerHunter AI &copy; 2026</p>
        </div>

        {/* Contenido */}
        <div className="p-12 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-graphite)] border-b-2 border-[var(--color-gold)] pb-2 mb-4 inline-block">1. Estado Actual</h2>
            <p className="text-gray-700 leading-relaxed">
              Hemos analizado la presencia digital de <strong>{empresa.name}</strong> utilizando nuestra tecnología de inteligencia artificial. Nuestro informe revela áreas clave donde su concesionario está perdiendo oportunidades de ventas y captación de leads frente a la competencia local.
            </p>
            {empresa.ai_score_total ? (
              <div className="mt-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-4 text-center">Puntuación Global: <span className="text-[var(--color-gold)] text-2xl">{empresa.ai_score_total}/100</span></h3>
                <p className="text-sm text-gray-600 text-center mb-6">Su concesionario tiene un gran margen de mejora para dominar el mercado local.</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-100 shadow-sm">
                    <span className="font-medium text-gray-700">Diseño UI/UX</span>
                    <span className={empresa.ai_score_design < 50 ? "text-red-500 font-bold" : "text-green-600 font-bold"}>{empresa.ai_score_design}/100</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-100 shadow-sm">
                    <span className="font-medium text-gray-700">Optimización SEO</span>
                    <span className={empresa.ai_score_seo < 50 ? "text-red-500 font-bold" : "text-green-600 font-bold"}>{empresa.ai_score_seo}/100</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-100 shadow-sm">
                    <span className="font-medium text-gray-700">Velocidad Web</span>
                    <span className={empresa.ai_score_speed < 50 ? "text-red-500 font-bold" : "text-green-600 font-bold"}>{empresa.ai_score_speed}/100</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-100 shadow-sm">
                    <span className="font-medium text-gray-700">Estrategia Digital</span>
                    <span className={empresa.ai_score_marketing < 50 ? "text-red-500 font-bold" : "text-green-600 font-bold"}>{empresa.ai_score_marketing}/100</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-4 italic text-gray-500">Es necesario realizar el análisis de IA previo para ver los resultados detallados aquí.</p>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-graphite)] border-b-2 border-[var(--color-gold)] pb-2 mb-4 inline-block">2. Nuestra Propuesta</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Proponemos una transformación digital completa para {empresa.name}, enfocada en <strong>triplicar la captación de leads</strong> y automatizar las ventas mediante las siguientes soluciones:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Diseño Web Premium + SEO Local</h4>
                  <p className="text-gray-600">Creación de una web ultrarrápida, optimizada para móviles y posicionamiento en buscadores para dominar las búsquedas de vehículos en {empresa.province || 'su zona'}.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Sistema CRM Automotor + VeriFactu</h4>
                  <p className="text-gray-600">Implementación de un sistema de gestión de clientes (CRM) y facturación electrónica cumpliendo la normativa antifraude (VeriFactu).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Automatización con Inteligencia Artificial</h4>
                  <p className="text-gray-600">Chatbot 24/7 para atención inicial a clientes, cualificación de leads e integración con WhatsApp Business API.</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-gray-50 p-8 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-6">Inversión Recomendada</h2>
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
              <span className="font-medium text-gray-800">Setup Inicial y Desarrollo Web</span>
              <span className="font-bold">1.500 €</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
              <span className="font-medium text-gray-800">Implementación CRM y Migración de Datos</span>
              <span className="font-bold">850 €</span>
            </div>
            <div className="flex items-center justify-between pb-2 mb-2">
              <span className="font-medium text-gray-800">Mantenimiento, IA y Soporte Mensual</span>
              <span className="font-bold">290 € / mes</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
