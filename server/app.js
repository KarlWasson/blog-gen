require('dotenv').config({ path: './.env.local' });
const express = require('express');
const axios = require('axios');
const app = express();



// This is needed to be able to parse the JSON body of incoming requests
app.use(express.json());

const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],   // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.post('/generateOutline', async (req, res) => {
  const { title, description, tag } = req.body;

  // Ensure that all parameters are provided
  if (!title || !description || !tag) {
    res.status(400).json({ error: 'Please provide title, description, and tag.' });
    return;
  }

  const OPENAI_API_KEY = process.env.OPEN_API_KEY;
  const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  };

  const prompt = `Generate an outline for a blog post. Layout in markdown with headers. Add SEO optimized meta title and meta description. Create a social media post for the content. Title: ${title}, Description: ${description}, Tag: ${tag}`;

  try {
    const response = await axios.post(OPENAI_URL, {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a knowledgable product marketer for malware prevention, detection and analysis platform.' },
        { role: 'user', content: prompt },
      ],
    }, { headers });

    const outline = response.data.choices[0].message.content;
    res.status(200).json({ outline });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating the outline.' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});