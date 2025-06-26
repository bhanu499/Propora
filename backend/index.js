const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Read config from environment variables
const llmProvider = process.env.LLM_PROVIDER || 'ollama';
const ollamaHost = process.env.OLLAMA_HOST || '';
const ollamaModel = process.env.OLLAMA_MODEL || '';
const groqModel = process.env.GROQ_MODEL || '';
const groqApiKey = process.env.GROQ_API_KEY || '';

const systemPrompt = `You are a senior freelance software developer assistant. Generate a project proposal based on the user's portfolio and the client's brief. Always follow any style and size instructions provided in the user prompt. Keep the tone professional and convincing.`;

async function callLLM(prompt) {
  if (llmProvider === 'ollama') {
    const res = await axios.post(`${ollamaHost}/api/generate`, {
      model: ollamaModel,
      prompt: prompt,
      stream: false
    });
    return res.data.response.trim();
  }

  if (llmProvider === 'groq') {
    const res = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: groqModel,
      messages: [
         { role: 'system', content: systemPrompt },
         { role: 'user', content: prompt }]
    }, {
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data.choices[0].message.content.trim();
  }

  throw new Error("Unsupported LLM provider in environment variables");
}

app.post('/api/generate', async (req, res) => {
  try {
    const { clientBrief, portfolio, style, size } = req.body;
    const prompt = `Generate a project proposal based on this client brief:\n"${clientBrief}"\nand this developer's portfolio:\n"${portfolio}"\n\nProposal Style: ${style || 'Formal'}\nProposal Size: ${size || 'Medium'}\n\nPlease follow the selected style and size when generating the proposal.`;

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
