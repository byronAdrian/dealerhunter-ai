import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import ProposalEmail from '@/emails/ProposalEmail'

// Inicializar Resend con la clave de entorno. 
// Si no hay clave (entorno demo local sin env var), simulamos el envío para evitar errores.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { companyName, email, score, companyId } = body

    if (!email) {
      return NextResponse.json({ error: 'Falta email de destino' }, { status: 400 })
    }

    const proposalLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/demo/index.html?ref=${companyId}`

    if (!resend) {
      console.log('SIMULACIÓN DE ENVÍO DE CORREO:')
      console.log(`Para: ${email}`)
      console.log(`Empresa: ${companyName}`)
      console.log(`Link Propuesta: ${proposalLink}`)
      
      // Simular retraso de red
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      return NextResponse.json({ 
        success: true, 
        message: 'Correo simulado con éxito (Falta RESEND_API_KEY en .env)' 
      })
    }

    const data = await resend.emails.send({
      from: 'DealerHunter AI <hola@dealerhunter.ai>', // Cambiar por un dominio verificado en producción
      to: [email],
      subject: `Auditoría Digital Completada - ${companyName}`,
      react: ProposalEmail({ companyName, score, proposalLink }),
    })

    return NextResponse.json({ success: true, data })

  } catch (error) {
    console.error('Error enviando email:', error)
    return NextResponse.json({ error: 'Error interno al enviar el correo' }, { status: 500 })
  }
}
