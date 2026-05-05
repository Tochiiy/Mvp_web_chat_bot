


import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';
import https from 'https'; 


console.log("🧪 Testing proxy connection to Google...");
const testReq = https.get('https://www.google.com', (res) => {
  console.log(`✅ Proxy Test Successful! Status: ${testReq}`, res.statusCode);
}).on('error', (err) => {
  console.error("❌ Proxy Test Failed:", err.message);
});


const app = express();
const port = 3000;


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

if (!OPENAI_API_KEY) {
  console.error("⚠️ ERROR: OPENAI_API_KEY is missing! Check your .env file.");
  process.exit(1);
}


app.use(cors());
app.use(express.json());


app.get("/health", (req, res) => {
  res.send("welcome to node❤");
});

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  
  if (!userMessage) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    console.log("Sending request to OpenAI...");
    
    const response = await axios.post(OPENAI_API_URL, {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful web assistant." },
        { role: "user", content: userMessage }
      ],
      max_tokens: 150,
    }, {
      
      proxy: {
        host: 'proxy.unn.ru',
        port: 8080,
       
      },
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    const botReply = response.data.choices[0].message.content;
    res.json({ reply: botReply });

  } catch (error) {
    console.error('Error calling OpenAI API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to get response from AI model." });
  }
});


app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});








