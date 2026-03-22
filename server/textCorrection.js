/**
 * Text Correction API Server
 * Secure backend for Google Gemini API calls
 * API key is stored server-side, never exposed to client
 */

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'https://housegramx.com'],
  credentials: true,
}));

// Rate limiting: 60 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Validation middleware
const validateTextInput = (req, res, next) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'Text must be a string' });
  }

  if (text.length > 5000) {
    return res.status(400).json({ error: 'Text is too long (max 5000 characters)' });
  }

  if (text.trim().length === 0) {
    return res.status(400).json({ error: 'Text cannot be empty' });
  }

  next();
};

/**
 * POST /api/correct-text
 * Corrects text using Google Gemini API
 */
app.post('/api/correct-text', validateTextInput, async (req, res) => {
  try {
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const { text } = req.body;

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
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return res.status(response.status).json({
        error: 'Failed to correct text',
        details: errorData.error?.message,
      });
    }

    const data = await response.json();
    const correctedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!correctedText) {
      return res.status(500).json({ error: 'Empty response from AI' });
    }

    res.json({
      original: text,
      corrected: correctedText,
      isChanged: correctedText !== text,
    });
  } catch (error) {
    console.error('Text correction error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Error handling middleware
 */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Text Correction API Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Key configured: ${Boolean(GEMINI_API_KEY)}`);
});

module.exports = app;
