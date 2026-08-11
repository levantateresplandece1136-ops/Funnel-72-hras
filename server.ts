import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Copy Generator endpoint for Sales Funnel
app.post("/api/generate-copy", async (req, res) => {
  try {
    const { promptType, targetAudience, offerDetails, tone } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback pre-crafted high-converting templates if API key is not present
      return res.json({
        success: true,
        source: "template",
        copy: getFallbackCopy(promptType, targetAudience, offerDetails)
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    let systemPrompt = `Eres un experto en Copywriting y Embudos de Conversión de Alto Impacto para Cursos de Marketing Digital.
Tus respuestas deben estar escritas en español persuasivo, claro y profesional, enfocadas en la conversión de leads a compradores.`;

    let userPrompt = "";

    if (promptType === "headline") {
      userPrompt = `Crea 3 titulares irresistibles para una página de captura (Squeeze Page) de un curso de Marketing Digital.
Público objetivo: ${targetAudience || "Emprendedores, Freelancers y Dueños de Negocios"}.
Oferta/Beneficio: ${offerDetails || "Aprender a escalar ventas con Anuncios y Embudos Automatizados"}.
Tono: ${tone || "Urgente, persuasivo y profesional"}.

Devuelve 3 opciones formateadas con viñetas claras.`;
    } else if (promptType === "email_sequence") {
      userPrompt = `Escribe una secuencia de 3 correos electrónicos de nutrición y venta para convertir leads en compradores.
Público: ${targetAudience || "Leads interesados en Marketing Digital"}.
Oferta: ${offerDetails || "Masterclass + Curso Completo de Marketing Digital con 50% de descuento"}.

Estructura requerida:
- Email 1: Entrega del regalo + Historia de transformación (AIDA).
- Email 2: Caso de éxito + Romper la objeción de falta de tiempo/dinero.
- Email 3: Último aviso (Urgencia & Escasez antes de cerrar descuento).`;
    } else if (promptType === "ad_copy") {
      userPrompt = `Escribe 2 textos para anuncios de Meta Ads (Instagram/Facebook) para atraer leads al embudo.
Público: ${targetAudience || "Dueños de PYMEs y creadores de contenido"}.
Oferta: ${offerDetails || "Clase gratis de estrategia de conversión"}.

Incluye: Gancho (Hook), Cuerpo persuasivo (Body) y Llamado a la Acción (CTA) claro.`;
    } else {
      userPrompt = `Genera un texto de ventas persuasivo para un curso de Marketing Digital basado en: ${offerDetails || "Aumentar conversiones"}.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
      ]
    });

    const generatedText = response.text || "No se pudo generar el texto. Intenta de nuevo.";

    res.json({
      success: true,
      source: "gemini",
      copy: generatedText
    });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    res.json({
      success: true,
      source: "template-fallback",
      copy: getFallbackCopy(req.body.promptType, req.body.targetAudience, req.body.offerDetails),
      warning: "Generado con plantilla por límite o indisponibilidad temporal de API."
    });
  }
});

function getFallbackCopy(type: string, audience?: string, offer?: string): string {
  if (type === "headline") {
    return `🔥 OPCIÓN 1: "Cómo atraerme de 20 a 50 Clientes Calificados Cada Semana Sin Gastar una Fortuna en Anuncios"
🚀 OPCIÓN 2: "El Sistema Exacto de 4 Pasos para Vender Tus Servicios o Cursos Digitales en Piloto Automático"
💡 OPCIÓN 3: "Masterclass Gratuita: Descubre el Embudo de Conversión que Generó +$100,000 en 90 Días"`;
  } else if (type === "email_sequence") {
    return `MENSANJE 1 - Entrega del Regalo:
Asunto: [ACCESO CONFIRMADO] Aquí tienes tu entrenamiento gratuito 🎁
Hola! Gracias por solicitar la Masterclass. Aquí tienes tu enlace directo de acceso: [Enlace]. En este video de 15 min aprenderás a captar leads de calidad.

MENSAJE 2 - La Solución Completa:
Asunto: La razón por la que el 90% de los negocios fallan en marketing digital...
Ayer te envié el mapa general. Hoy quiero mostrarte cómo nuestro estudiante Carlos pasó de $0 a $5,000/mes aplicando nuestro sistema paso a paso. [Ver Caso de Estudio]

MENSAJE 3 - Urgencia Final:
Asunto: ⚠️ Tu cupón del 50% de descuento expira hoy a medianoche
El precio normal de la Academia de Marketing Digital es de $397, pero por haber visto nuestra clase gratuita tienes acceso por solo $197. El contador vence en pocas horas: [Inscribirme con 50% DTO]`;
  } else {
    return `🎯 ¿Cansado de publicar en redes sin conseguir ventas reales?
Descubre el método probado para convertir seguidores fríos en clientes que pagan sin dudarlo.
👉 Haz clic abajo y accede gratis a la Masterclass de Marketing Digital y Embudos.`;
  }
}

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Funnel App Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
