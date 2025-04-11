const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/verify-article', async (req, res) => {
  const { articleText } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Please verify the factual accuracy of the following article. Highlight any claims that may be misleading, false, or lack sufficient evidence, and explain why:\n\n${articleText}`
              }
            ]
          }
        ]
      }
    );

    const geminiReply = response.data.candidates[0].content.parts[0].text;
    res.json({ result: geminiReply });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Gemini API request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
