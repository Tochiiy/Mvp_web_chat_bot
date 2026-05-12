import express from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";
import https from "https";

//  Test outbound connection
console.log("🧪 Testing internet connection...");
https
  .get("https://www.google.com", (res) => {
    console.log(`✅ Connection OK! Status: ${res.statusCode}`);
  })
  .on("error", (err) => {
    console.error("❌ Connection failed:", err.message);
  });

const app = express();
const port = process.env.PORT || 3000;

//  Env variables

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://openrouter.ai/api/v1/chat/completions";

if (!OPENAI_API_KEY) {
  console.error("⚠️ ERROR: OPENAI_API_KEY is missing in .env");
  process.exit(1);
}

//  Middleware
app.use(
  cors({
    origin: "https://mvp-web-chat-bot-1.onrender.com/",
  }),
);
app.use(express.json());

// ✅ Health route
app.get("/health", (req, res) => {
  res.send("✅ Backend is running");
});

//Chat endpoint
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    console.log("📡 Sending request to OpenAI...");

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "openai/gpt-oss-120b:free",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "MVP Web Chat Bot",
        },
      },
    );

    const botReply =
      response.data.choices?.[0]?.message?.content ||
      "⚠️ No response from model";
    res.json({ reply: botReply });
  } catch (error) {
    console.error(
      "❌ OpenAI Error:",
      error.response ? error.response.data : error.message,
    );

    res.status(500).json({
      error: "Failed to get response from AI",
      details: error.response?.data || error.message,
    });
  }
});

//  Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
