import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import NewsFeed from "./newsFeed"; // Import the NewsFeed component
import CountryFilter from "./components/CountryFilter";
import CategoryDropdown from "./components/CategoryDropdown";

export default function App() {
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("us");

  return (
    <>
      
      {/* News Aggregator Section */}
      <div className="text-center bg-blue-500 text-white p-4">
        <h1 className="text-3xl font-bold">Welcome to News Aggregator!</h1>
      </div>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow p-6">
          {/* Country and Category Filters */}
          <div className="flex justify-center space-x-4 mb-6">
            <CategoryDropdown setCategory={setCategory} />
            <CountryFilter setCountry={setCountry} />
          </div>

          {/* Pass category and country as props */}
          <NewsFeed category={category} country={country} />
        </main>
        <Footer />
      </div>
    </>
  );
}
