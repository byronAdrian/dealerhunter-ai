"use server";

import * as cheerio from "cheerio";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function prospectCompany(url: string) {
  try {
    // 1. Fetch website HTML
    // We add a random User-Agent to avoid basic blocks
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Error al acceder a la web: ${response.statusText}`);
    }

    const html = await response.text();

    // 2. Extract text using Cheerio
    const $ = cheerio.load(html);
    // Remove scripts and styles
    $("script, style, noscript, iframe, image").remove();
    // Get text and clean up whitespaces
    const rawText = $("body").text().replace(/\s+/g, " ").trim();
    // Limit to the first 15,000 characters to save tokens and fit limits
    const textContext = rawText.slice(0, 15000);

    // 3. Extract structured data with AI (OpenRouter)
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterApiKey) {
      throw new Error("No hay clave de API de OpenRouter configurada en el servidor.");
    }

    const systemPrompt = `
      Eres un experto analista de datos. Te voy a pasar el texto extraído de la página web de un concesionario o compraventa de coches.
      Extrae la información clave del negocio y devuélvela ESTRICTAMENTE en este formato JSON, sin comentarios adicionales ni Markdown extra:
      {
        "name": "Nombre de la empresa (string)",
        "phone": "Teléfono de contacto (string o null)",
        "email": "Email de contacto (string o null)",
        "address": "Dirección completa (string o null)",
        "city": "Ciudad (string o null)",
        "province": "Provincia (string o null)"
      }
    `;

    const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // Very fast and cheap model, perfect for JSON extraction
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `URL: ${url}\n\nTEXTO EXTRAÍDO:\n${textContext}` }
        ]
      })
    });

    if (!aiResponse.ok) {
      const errTxt = await aiResponse.text();
      throw new Error(`Error en la API de OpenRouter: ${errTxt}`);
    }

    const data = await aiResponse.json();
    const extractedContent = data.choices[0].message.content;
    const companyData = JSON.parse(extractedContent);

    // 4. Save to Database (Supabase)
    const supabase = await createClient();

    const { data: insertedCompany, error } = await supabase
      .from("companies")
      .insert({
        name: companyData.name || "Empresa Desconocida",
        website: url,
        phone: companyData.phone,
        email: companyData.email,
        address: companyData.address,
        city: companyData.city,
        province: companyData.province,
        status: "Sin contactar"
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Error al guardar en base de datos: ${error.message}`);
    }

    // Refresh the CRM page
    revalidatePath("/crm");

    return { success: true, company: insertedCompany };
  } catch (error: any) {
    console.error("Error prospectando la empresa:", error);
    return { success: false, error: error.message };
  }
}
