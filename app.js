// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Access the API key from the environment variables
const apiKey = process.env.MEDIASTACK_API_KEY;

if (!apiKey) {
  console.error("❌ ERROR: MEDIASTACK_API_KEY is missing in .env file!");
  process.exit(1); // Stop execution if API key is missing
}

// Set up a basic route
app.get('/', (req, res) => {
  res.send('Welcome to the News Aggregator API!');
});

// News route with category & country filtering
app.get('/api/news', async (req, res) => {
  try {
    const { category, country } = req.query; // Get query params from frontend

    // Validate inputs (optional but recommended)
    if (!country) {
      return res.status(400).json({ error: "Missing 'country' parameter" });
    }

    // Fetch news data from NewsAPI
    const response = await axios.get('http://api.mediastack.com/v1/news', {
      params: {
        access_key: apiKey, // Use correct API key
        countries: country, // Use 'countries' instead of 'country'
        categories: category || 'general', // Use 'categories' instead of 'category'
        limit: 10, // Limit results to 10 articles
      },
    });

    // Send the fetched news data back as a JSON response
    res.json(response.data);
  } catch (error) {
    console.error("❌ ERROR Fetching News:", error.message);
    res.status(500).json({ message: "Error fetching news data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
