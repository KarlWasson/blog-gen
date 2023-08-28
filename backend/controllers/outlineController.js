const axios = require('axios');

exports.generateOutline = async (req, res, next) => {
  console.log("Received request with body:", req.body);

  const { title, description, tag } = req.body;

  // Ensure that all parameters are provided
  if (!title || !description || !tag) {
    res.status(400).json({ error: 'Please provide title, description, and tag.' });
    return;
  }

  const OPENAI_API_KEY = process.env.OPEN_API_KEY;
  if (!OPENAI_API_KEY) {
    console.error("OpenAI API key is not set.");
    res.status(500).json({ error: 'Server configuration error.' });
    return;
  }

  const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  };

  const prompt = `Generate an outline for a blog post. Layout in markdown with headers. Add SEO optimized meta title and meta description. Create a social media post for the content. Title: ${title}, Description: ${description}, Tag: ${tag}`;
  console.log("Generated prompt:", prompt);

  try {
    const response = await axios.post(OPENAI_URL, {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a knowledgeable product marketer for malware prevention, detection, and analysis platform.' },
        { role: 'user', content: prompt },
      ],
    }, { headers });

    console.log("OpenAI Response:", response.data);

    const outline = response.data.choices && response.data.choices[0] && response.data.choices[0].message.content;
    if (outline) {
      res.status(200).json({ outline });
    } else {
      res.status(500).json({ error: 'Failed to generate an outline from OpenAI.' });
    }
  } catch (error) {
    console.error("Error with OpenAI request:", error);
    res.status(500).json({ error: 'An error occurred while generating the outline.' });
  }
};
