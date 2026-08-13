function normalizePhone(raw: unknown): string | null {
    if (typeof raw !== 'string') return null;
    const trimmed = raw.trim();
    if (!trimmed) return null;

  // Deja solo digitos y un posible "+" inicial (quita espacios, guiones, parentesis).
  const cleaned = trimmed.replace(/(?!^\+)[^\d]/g, '');

  // Validacion basica tipo E.164: opcional "+" seguido de 8 a 15 digitos.
  const e164 = /^\+?[1-9]\d{7,14}$/;
    return e164.test(cleaned) ? cleaned : null;
}

async function upsertBrevoContact(
    apiKey: string,
    listId: number,
    email: string,
    name: string,
    phone: string | null,
  ) {
    const attributes: Record<string, string> = { NOMBRE: name };
    if (phone) attributes.WHATSAPP = phone;

  return fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
        },
        body: JSON.stringify({
                email,
                attributes,
                listIds: [listId],
                updateEnabled: true,
        }),
  });
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
          return res.status(405).json({ success: false, error: 'Metodo no permitido.' });
    }

  try {
        const { name, email, phone } = req.body;

      if (!name || !email) {
              return res.status(400).json({ success: false, error: 'Falta nombre o correo.' });
      }

      const apiKey = process.env.BREVO_API_KEY;
        const listId = Number(process.env.BREVO_LIST_ID || 3);

      if (!apiKey) {
              console.error('BREVO_API_KEY no configurada');
              return res.status(500).json({ success: false, error: 'Configuracion del servidor incompleta.' });
      }

      const cleanPhone = normalizePhone(phone);

      let brevoResponse = await upsertBrevoContact(apiKey, listId, email, name, cleanPhone);

      if (!brevoResponse.ok) {
              const errorBody = await brevoResponse.text();
              console.error('Error de Brevo:', brevoResponse.status, errorBody);

          // El WhatsApp es opcional: si Brevo lo rechazo por formato de telefono,
          // reintentamos sin ese campo para no perder el lead por un dato secundario.
          const looksLikePhoneIssue = cleanPhone && /whatsapp|phone|sms|mobile/i.test(errorBody);
              if (looksLikePhoneIssue) {
                        brevoResponse = await upsertBrevoContact(apiKey, listId, email, name, null);
              }

          if (!brevoResponse.ok) {
                    const finalErrorBody = looksLikePhoneIssue ? await brevoResponse.text() : errorBody;
                    console.error('Error de Brevo (definitivo):', brevoResponse.status, finalErrorBody);
                    return res.status(502).json({ success: false, error: 'No se pudo registrar el contacto.' });
          }
      }

      res.json({ success: true });
  } catch (error: any) {
        console.error('Error en /api/leads:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor.' });
  }
}
