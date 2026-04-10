import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Uniquement les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, target_lang = 'EN-US' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Missing text parameter' });
    }

    const apiKey = process.env.DEEPL_API_KEY;
    
    if (!apiKey) {
      console.error('DEEPL_API_KEY is not configured');
      return res.status(500).json({ error: 'Translation service is not configured' });
    }

    // Détermine la bonne URL de l'API selon le type de clé (Gratuite ou Pro)
    // Les clés gratuites finissent toujours par ":fx"
    const isFreeKey = apiKey.endsWith(':fx');
    const apiUrl = isFreeKey
      ? 'https://api-free.deepl.com/v2/translate'
      : 'https://api.deepl.com/v2/translate';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        target_lang: target_lang,
        source_lang: 'FR',
        tag_handling: 'html', // C'est CA qui préserve le gras/italique !
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepL API Error:', response.status, errorText);
      return res.status(response.status).json({ error: 'DeepL translation failed', details: errorText });
    }

    const data = await response.json();
    
    if (data.translations && data.translations.length > 0) {
      return res.status(200).json({ translatedText: data.translations[0].text });
    } else {
      return res.status(500).json({ error: 'Invalid response format from DeepL' });
    }
  } catch (error) {
    console.error('Translation error:', error);
    return res.status(500).json({ error: 'Internal server error while translating' });
  }
}
