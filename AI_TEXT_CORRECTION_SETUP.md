# AI Text Correction Feature Setup

## Overview
This feature adds an "Correct Text with AI" button to the message context menu, powered by Google Gemini API.

## Features
- ✨ AI-powered text correction using Google Gemini 2.0 Flash
- 🎨 Beautiful gradient UI with smooth animations
- ⚡ Real-time text correction with visual feedback
- 🔄 Before/after comparison view
- ✅ Apply or cancel corrections

## Setup Instructions

### 1. Get Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### 2. Configure Environment Variables

Add the API key to your `.env.local` file:

```env
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

**Important:** Never commit your API key to version control. Use `.env.local` for local development.

### 3. Security Considerations

⚠️ **IMPORTANT:** The current implementation exposes the API key on the client side. For production:

1. **Create a Backend Endpoint:**
   ```typescript
   // Example: /api/correct-text
   POST /api/correct-text
   Body: { text: string }
   Response: { corrected: string }
   ```

2. **Update the Service:**
   ```typescript
   // src/api/gramjs/helpers/textCorrection.ts
   export async function correctTextWithAI(text: string) {
     const response = await fetch('/api/correct-text', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ text }),
     });
     // ... handle response
   }
   ```

3. **Keep API Key on Server:**
   - Store `GEMINI_API_KEY` as a server environment variable
   - Never expose it to the client

## Usage

1. Right-click on any message with text
2. Select "Correct Text with AI" from the context menu
3. Wait for the AI to process (shows loading animation)
4. Review the corrected text
5. Click "Apply" to use the correction or "Cancel" to discard

## API Response Format

The Gemini API returns:
```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "Corrected text here..."
          }
        ]
      }
    }
  ]
}
```

## Error Handling

- If API key is missing: Shows error message
- If API fails: Displays error with retry option
- If text is unchanged: Still shows comparison view

## Customization

### Change Animation Duration
Edit `TextCorrectionButton.tsx`:
```typescript
animationTimeoutRef.current = setTimeout(() => {
  setIsAnimating(false);
}, 2000); // Change 2000 to desired milliseconds
```

### Modify Prompt
Edit `textCorrection.ts`:
```typescript
const prompt = `Your custom prompt here...`;
```

### Adjust Styling
Edit `TextCorrectionButton.scss` to customize colors, animations, and layout.

## Supported Languages

Google Gemini supports 100+ languages. The correction works for:
- English
- Russian
- Spanish
- French
- German
- Chinese
- Japanese
- And many more...

## Troubleshooting

### "API key is not configured"
- Check `.env.local` file exists
- Verify `REACT_APP_GEMINI_API_KEY` is set
- Restart development server

### "Empty response from API"
- Check API key is valid
- Verify text is not empty
- Check network connection

### Slow responses
- Gemini 2.0 Flash is optimized for speed
- First request may be slower due to model loading
- Consider implementing request caching

## Rate Limiting

Google Gemini API has rate limits:
- Free tier: 60 requests per minute
- Paid tier: Higher limits available

Implement request throttling if needed:
```typescript
const throttledCorrect = throttle(correctTextWithAI, 1000);
```

## Future Improvements

- [ ] Add language detection
- [ ] Implement request caching
- [ ] Add tone/style options (formal, casual, etc.)
- [ ] Support for multiple languages simultaneously
- [ ] Batch correction for multiple messages
- [ ] Custom correction rules

## License

This feature is part of HouseGramX and follows the same GPL-3.0-or-later license.
