import { useState, useEffect } from "react";
import NewsCard from "./NewsCard"; // Ensure it's correctly imported
import axios from "axios";

const NewsFeed = ({ category, country }) => {
  const [articles, setArticles] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `http://localhost:3000/api/news?category=${category}&country=${country}`
        );

        console.log("API Articles Data:", response.data.data);


        if (!response.data || !Array.isArray(response.data.data) || response.data.data.length === 0) {
          throw new Error("Invalid API response: No articles found.");
        }

        setArticles(response.data.data);
      } catch (error) {
        console.error("❌ Error fetching news:", error.message);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, country]);

  // Ensure articles is always an array
  const safeArticles = Array.isArray(articles) ? articles : [];

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = safeArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(safeArticles.length / articlesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 overflow-hidden">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        📰 Latest News
      </h1>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
          ))}
        </div>
      )}

      {/* Error Handling */}
      {error && <div className="text-red-500 text-center text-lg">{error}</div>}

      {/* News Cards Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentArticles.length > 0 ? (
            currentArticles.map((article, index) => (
              <NewsCard
              key={index}
              title={article.title || "No Title"}
              description={article.description || "No Description Available"}
              url={article.url || "#"}
              imageUrl={article.image && article.image.trim() !== "" ? article.image : "https://placehold.co/400?text=No+Image"}   
              />
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              No articles available.
            </div>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          ← Previous
        </button>
        <span className="text-lg font-semibold px-3">Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(safeArticles.length / articlesPerPage)}
          className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${
            currentPage >= Math.ceil(safeArticles.length / articlesPerPage)
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default NewsFeed;
