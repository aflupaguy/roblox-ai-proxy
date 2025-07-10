
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://www.roblox.com/games/111595096444576/Ai-Roommate",
          "X-Title": "Ai Roommate"
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("OpenRouter Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "AI server error." });
  }
});

app.listen(PORT, () => {
  console.log(`AI Proxy running on port ${PORT}`);
});
