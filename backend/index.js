const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const systemPrompt = `You are a senior freelance software developer assistant. Generate a project proposal based on the user's portfolio and the client's brief. Keep the tone professional and convincing.`;


async function callLLM(prompt) {
  if (config.llm_provider === 'ollama') {
    const res = await axios.post(`${config.ollama.host}/api/generate`, {
      model: config.ollama.model,
      prompt: prompt,
      stream: false
    });
    return res.data.response.trim();
  }

  if (config.llm_provider === 'groq') {
    const res = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: config.groq.model,
      messages: [
         { role: 'system', content: systemPrompt },
         { role: 'user', content: prompt }]
    }, {
      headers: {
        Authorization: `Bearer ${config.groq.api_key}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data.choices[0].message.content.trim();
  }

  throw new Error("Unsupported LLM provider in config.json");
}

app.post('/api/generate', async (req, res) => {
  try {
    const { clientBrief, portfolio } = req.body;
    const prompt = `Generate a project proposal based on this client brief:\n"${clientBrief}"\nand this developer's portfolio:\n"${portfolio}"`;

    const proposal = await callLLM(prompt);
    res.json({ proposal });
  } catch (error) {
    console.error("LLM Error:", error.message);
    res.status(500).json({ error: 'Failed to generate proposal' });
  }
});

// Ensure the app uses the port provided by Render or defaults to 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
