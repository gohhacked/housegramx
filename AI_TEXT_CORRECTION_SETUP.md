# AI Text Correction Feature Setup

## Overview
This feature adds an "Correct Text with AI" button to the message context menu, powered by Google Gemini API with a secure backend.

## Features
- ✨ AI-powered text correction using Google Gemini 2.0 Flash
- 🎨 Beautiful gradient UI with smooth animations
- ⚡ Real-time text correction with visual feedback
- 📝 Before/after comparison view
- ✅ Apply or cancel corrections
- 🔒 Secure backend - API key never exposed to client

## Architecture

### Client-Side (React)
- `TextCorrectionButton.tsx` - UI component with animations
- `textCorrection.ts` - API client that calls backend

### Server-Side (Node.js/Express)
- `server/textCorrection.js` - Secure API endpoint
- Stores Google Gemini API key server-side
- Rate limiting (60 requests per 15 minutes)
- Input validation and error handling

## Setup Instructions

### 1. Get Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### 2. Setup Backend Server

#### Install Dependencies
```bash
cd server
npm install
```

#### Configure Environment
Create `server/.env`:
```env
NODE_ENV=production
PORT=3001
GEMINI_API_KEY=AIzaSyC_Rm_vQYCCAAG3-12xfUm3f181tHva3w0
ALLOWED_ORIGINS=http://localhost:3000,https://housegramx.com
```

#### Start Server
```bash
# Development
npm run dev

# Production
npm start
```

### 3. Configure Frontend

Add to `.env.local`:
```env
REACT_APP_API_URL=http://localhost:3001
```

For production, update to your server URL:
```env
REACT_APP_API_URL=https://api.housegramx.com
```

### 4. Deploy

#### Backend Deployment Options

**Option A: Heroku**
```bash
cd server
heroku create your-app-name
heroku config:set GEMINI_API_KEY=your_key_here
git push heroku main
```

**Option B: Railway**
```bash
# Connect your repo to Railway
# Add environment variables in Railway dashboard
# Deploy automatically
```

**Option C: Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm install --production
COPY server/ ./
EXPOSE 3001
CMD ["npm", "start"]
```

## Security Best Practices

✅ **What We Do:**
- Store API key on server only
- Validate input on both client and server
- Rate limit requests (60/15min per IP)
- Use CORS to restrict origins
- Sanitize error messages in production

✅ **What You Should Do:**
- Use HTTPS in production
- Set strong CORS origins
- Monitor API usage
- Rotate API keys regularly
- Use environment variables for secrets
- Enable API key restrictions in Google Cloud Console

## API Endpoints

### POST /api/correct-text
Corrects text using Google Gemini API

**Request:**
```json
{
  "text": "Your text to correct here"
}
```

**Response (Success):**
```json
{
  "original": "Your text to correct here",
  "corrected": "Your text to correct here",
  "isChanged": false
}
```

**Response (Error):**
```json
{
  "error": "Text is too long (max 5000 characters)"
}
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-03-22T10:30:00.000Z"
}
```

## Usage

1. Right-click on any message with text
2. Select "Correct Text with AI" from the context menu
3. Wait for the AI to process (shows loading animation)
4. Review the corrected text
5. Click "Apply" to use the correction or "Cancel" to discard

## Supported Languages

Google Gemini supports 100+ languages including:
- English
- Russian
- Spanish
- French
- German
- Chinese
- Japanese
- And many more...

## Troubleshooting

### "Failed to correct text"
- Check backend server is running
- Verify `REACT_APP_API_URL` is correct
- Check network connection
- Review server logs

### "Too many requests"
- Rate limit exceeded (60 per 15 minutes)
- Wait 15 minutes or use different IP

### "Text is too long"
- Maximum 5000 characters per request
- Split text into smaller chunks

### Backend won't start
```bash
# Check if port is in use
lsof -i :3001

# Kill process on port 3001
kill -9 <PID>

# Try different port
PORT=3002 npm start
```

## Environment Variables

### Frontend (.env.local)
```env
REACT_APP_API_URL=http://localhost:3001
```

### Backend (server/.env)
```env
NODE_ENV=development
PORT=3001
GEMINI_API_KEY=your_key_here
ALLOWED_ORIGINS=http://localhost:3000,https://housegramx.com
```

## Performance

- Average response time: 1-3 seconds
- Gemini 2.0 Flash is optimized for speed
- Requests are cached on client side
- Rate limited to prevent abuse

## License

This feature is part of HouseGramX and follows the same GPL-3.0-or-later license.
