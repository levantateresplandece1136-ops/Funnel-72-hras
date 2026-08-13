export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método no permitido.' });
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
      return res.status(500).json({ success: false, error: 'Configuración del servidor incompleta.' });
    }

    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: { NOMBRE: name, WHATSAPP: phone || '' },
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (!brevoResponse.ok) {
      const errorBody = await brevoResponse.text();
      console.error('Error de Brevo:', brevoResponse.status, errorBody);
      return res.status(502).json({ success: false, error: 'No se pudo registrar el contacto.' });
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error en /api/leads:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor.' });
  }
}
