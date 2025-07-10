const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      req.body,
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://www.roblox.com/games/111595096444576/Ai-Roommate',
          'X-Title': 'Ai Roommate'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error forwarding to OpenRouter:', error.response?.data || error.message);
    res.status(500).json({ error: 'AI proxy failed', details: error.response?.data || error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
