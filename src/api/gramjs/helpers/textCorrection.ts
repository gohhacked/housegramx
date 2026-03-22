// Text correction via secure backend
// API key is stored server-side, never exposed to client
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const CORRECT_TEXT_ENDPOINT = `${API_BASE_URL}/api/correct-text`;

export interface TextCorrectionResult {
  original: string;
  corrected: string;
  changes: string[];
  isChanged: boolean;
}

/**
 * Corrects text using backend API (secure)
 * API key is stored server-side, never exposed to client
 */
export async function correctTextWithAI(text: string): Promise<TextCorrectionResult> {
  if (!text || text.trim().length === 0) {
    throw new Error('Text cannot be empty');
  }

  if (text.length > 5000) {
    throw new Error('Text is too long (max 5000 characters)');
  }

  try {
    const response = await fetch(CORRECT_TEXT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `API error: ${response.statusText}`);
    }

    const data = await response.json();
    const { original, corrected, isChanged } = data;

    if (!corrected) {
      throw new Error('Empty response from API');
    }

    return {
      original,
      corrected,
      changes: isChanged ? [original, corrected] : [],
      isChanged,
    };
  } catch (error) {
    console.error('Text correction error:', error);
    throw error;
  }
}
