export const translateText = async (text: string, targetLang: string = 'EN-US'): Promise<string> => {
  if (!text || text.trim() === '') return '';

  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        target_lang: targetLang,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la traduction');
    }

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error('Erreur du service de traduction :', error);
    throw error;
  }
};
