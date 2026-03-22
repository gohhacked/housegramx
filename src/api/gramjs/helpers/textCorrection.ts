// Google Gemini API for text correction
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface TextCorrectionResult {
  original: string;
  corrected: string;
  changes: string[];
  isChanged: boolean;
}

export async function correctTextWithAI(text: string): Promise<TextCorrectionResult> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const prompt = `You are a professional text editor. Correct the following text for grammar, spelling, and punctuation errors. 
Return ONLY the corrected text without any explanation or markdown formatting.

Original text:
"${text}"

Corrected text:`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    const correctedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

    if (!correctedText) {
      throw new Error('Empty response from API');
    }

    const isChanged = correctedText !== text;

    return {
      original: text,
      corrected: correctedText,
      changes: isChanged ? [text, correctedText] : [],
      isChanged,
    };
  } catch (error) {
    console.error('Text correction error:', error);
    throw error;
  }
}
