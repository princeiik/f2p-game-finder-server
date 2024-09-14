const express = require('express');
// const fetch = require('node-fetch'); 
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to enable CORS so your frontend can call this API
app.use(cors());

// Proxy request to the FreeToGame API
app.get('/api/games', async (req, res) => {
  try {
    const { genre, platform } = req.query;

    // Build the API URL dynamically based on query parameters
    let url = 'https://www.freetogame.com/api/games';

    if (genre || platform) {
      url += '?';
      if (genre) url += `category=${genre}&`;
      if (platform) url += `platform=${platform}`;
      url = url.replace(/[&?]$/, ''); // Clean up any trailing & or ?
    }

    // Fetch data from the FreeToGame API
    const response = await fetch(url);
    const data = await response.json();

    // Return the data to the client
    res.json(data);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games data' });
  }
});

// Proxy for game details (optional if you have individual game pages)
app.get('/api/game', async (req, res) => {
  try {
    const { id } = req.query;
    const url = `/api/game?id=${id}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Error fetching game details:', error);
    res.status(500).json({ error: 'Failed to fetch game details' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
