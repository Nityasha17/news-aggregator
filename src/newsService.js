import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/news";


// Fetch news articles
export const fetchNews = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}?page=${page}&limit=${limit}`);
        return response.data; // Ensure your API returns { articles, totalPages }
    } catch (error) {
        console.error("Error fetching news articles:", error);
        throw error;
    }
};
