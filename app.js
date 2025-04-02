require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

const apiKey = process.env.MEDIASTACK_API_KEY;

if (!apiKey) {
  console.error("❌ ERROR: MEDIASTACK_API_KEY is missing in .env file!");
  process.exit(1);
}

// Cache mechanism to avoid hitting API rate limits
let cachedArticles = null;
let lastFetchTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // Cache for 10 minutes

// API route to fetch news
app.get("/api/news", async (req, res) => {
  try {
    const { category, country } = req.query;

    if (!country) {
      return res.status(400).json({ error: "Missing 'country' parameter" });
    }

    // Check if cached data is still valid
    if (cachedArticles && Date.now() - lastFetchTime < CACHE_DURATION) {
      console.log("✅ Serving cached news data");
      return res.json({ data: cachedArticles });
    }

    console.log("🌍 Fetching fresh news data from Mediastack API...");

    // Fetch fresh news data
    const response = await axios.get("http://api.mediastack.com/v1/news", {
      params: {
        access_key: apiKey,
        countries: country,
        categories: category || "general",
        limit: 10,
      },
    });

    // Check if response is valid
    if (!response.data || !response.data.data || response.data.data.length === 0) {
      throw new Error("Invalid API response: No articles found.");
    }

    // Store articles in cache
    cachedArticles = response.data.data;
    lastFetchTime = Date.now();

    res.json({ data: cachedArticles });
  } catch (error) {
    console.error("❌ ERROR Fetching News:", error.message);

    if (error.response && error.response.status === 429) {
      res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    } else {
      res.status(500).json({
        message: "Error fetching news data. Try again later.",
      });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
