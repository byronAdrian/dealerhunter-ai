import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Button,
} from "@react-email/components"
import * as React from "react"

interface ProposalEmailProps {
  companyName: string
  score: number
  proposalLink: string
}

export const ProposalEmail = ({
  companyName = "Concesionario",
  score = 65,
  proposalLink = "https://dealerhunter.ai/demo",
}: ProposalEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Auditoría de Presencia Digital para {companyName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>DealerHunter AI</Heading>
          
          <Text style={text}>Hola equipo de {companyName},</Text>
          
          <Text style={text}>
            Hemos realizado una auditoría rápida mediante Inteligencia Artificial a la presencia digital de su concesionario. El resultado global indica una puntuación de <strong>{score}/100</strong>.
          </Text>
          
          <Section style={scoreSection}>
            <Text style={scoreText}>
              Existen áreas clave donde su concesionario está perdiendo oportunidades de ventas y captación de leads frente a la competencia local (Diseño, SEO, Velocidad).
            </Text>
          </Section>

          <Text style={text}>
            Hemos preparado una propuesta personalizada con un plan de transformación digital (Nueva Web, CRM Automotor y VeriFactu) para triplicar la captación de leads.
          </Text>

          <Section style={btnContainer}>
            <Button style={button} href={proposalLink}>
              Ver Propuesta Comercial Completa
            </Button>
          </Section>

          <Text style={footer}>
            Si tiene alguna duda, puede responder a este correo. <br />
            El equipo de DealerHunter AI
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default ProposalEmail

const main = {
  backgroundColor: "#f5f5f5",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  maxWidth: "600px",
  marginTop: "40px",
  marginBottom: "40px",
}

const h1 = {
  color: "#1c1c1e",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
  borderBottom: "3px solid #d4af37",
  paddingBottom: "10px",
  display: "inline-block",
}

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  marginBottom: "20px",
}

const scoreSection = {
  backgroundColor: "#f9fafb",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  marginBottom: "20px",
}

const scoreText = {
  color: "#4b5563",
  fontSize: "15px",
  lineHeight: "24px",
  margin: 0,
}

const btnContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
}

const button = {
  backgroundColor: "#d4af37",
  borderRadius: "6px",
  color: "#1c1c1e",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 24px",
}

const footer = {
  color: "#898989",
  fontSize: "14px",
  lineHeight: "22px",
  marginTop: "40px",
  borderTop: "1px solid #eaeaec",
  paddingTop: "20px",
}
