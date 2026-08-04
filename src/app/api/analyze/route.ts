import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { companyId, website } = body

    if (!companyId) {
      return NextResponse.json({ error: 'Falta companyId' }, { status: 400 })
    }

    // SIMULACIÓN: Aquí se haría scraping a la web (website) usando Puppeteer o Cheerio
    // Y luego se enviaría el texto a Gemini o OpenAI para ser calificado.
    
    // Retraso artificial para simular el análisis
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Valores simulados
    const ai_score_design = Math.floor(Math.random() * 40) + 30 // 30-70
    const ai_score_seo = Math.floor(Math.random() * 50) + 20 // 20-70
    const ai_score_speed = Math.floor(Math.random() * 40) + 40 // 40-80
    const ai_score_marketing = Math.floor(Math.random() * 30) + 20 // 20-50
    const ai_score_security = Math.floor(Math.random() * 30) + 50 // 50-80
    
    const ai_score_total = Math.floor(
      (ai_score_design + ai_score_seo + ai_score_speed + ai_score_marketing + ai_score_security) / 5
    )

    const report = "La empresa dispone de una página web funcional, aunque presenta un diseño visual desactualizado, baja velocidad de carga y escasa optimización SEO. La incorporación de una nueva web junto con el CRM especializado y el sistema VeriFactu permitiría mejorar la captación de clientes y automatizar completamente la gestión administrativa."

    return NextResponse.json({
      success: true,
      data: {
        ai_score_design,
        ai_score_seo,
        ai_score_speed,
        ai_score_marketing,
        ai_score_security,
        ai_score_total,
        ai_report: report
      }
    })

  } catch (error) {
    console.error('Error in analyze API:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
