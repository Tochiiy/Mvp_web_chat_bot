<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=fff" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=fff" alt="Express"/>
  <img src="https://img.shields.io/badge/OpenRouter-412991?logo=openai&logoColor=fff" alt="OpenRouter"/>
  <img src="https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=fff" alt="Render"/>
</p>

# MVP Web Chat Bot

A lightweight AI chatbot with a floating widget interface. Built with Node.js + Express backend and a vanilla JavaScript frontend that proxies chat requests to OpenRouter.

**Live Demo:** [mvp-web-chat-bot-1.onrender.com](https://mvp-web-chat-bot-1.onrender.com)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Node.js, Express 4 |
| **AI** | OpenRouter API (`openai/gpt-oss-120b:free`) |
| **Frontend** | Vanilla HTML, CSS, JavaScript |
| **Deployment** | Render |

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |
| POST | `/api/chat` | Send message to AI and get response |

### POST /api/chat

**Request:**
```json
{ "message": "Hello, who are you?" }
```

**Response:**
```json
{ "reply": "I'm an AI assistant..." }
```

## Quick Start

```bash
# Clone
git clone https://github.com/Tochiiy/Mvp_web_chat_bot.git
cd Mvp_web_chat_bot

# Install backend
cd backend
npm install

# Create .env
echo "OPENAI_API_KEY=sk-or-v1-..." > .env
echo "PORT=3000" >> .env

# Start
npm start
```

## Project Structure

```
Mvp_web_chat_bot/
├── backend/
│   ├── server.js           # Express + OpenRouter proxy
│   ├── package.json
│   └── .env
├── frontend/               # Vanilla JS chatbot widget
│   ├── index.html
│   ├── script.js
│   └── style.css
└── Web-bot/                # Older variant (OpenAI direct)
```

## Features

- **Floating chat widget**: Minimizable chatbot bubble
- **Typing indicator**: Shows when AI is responding
- **Avatar icons**: Bot and user message styling
- **Markdown rendering**: AI responses formatted with markdown
- **Responsive**: Works on desktop and mobile
