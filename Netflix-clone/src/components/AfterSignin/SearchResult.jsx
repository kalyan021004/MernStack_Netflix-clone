import React, { useEffect, useState } from "react";
import axios from "axios";
import MNavbar from "./MNavbar";
import SearchResultItem from "./SearchResultItem";


function SearchResult() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL ="https://mernstack-netflix-clone-cpvy.onrender.com";

  // Get search query from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") || "";
    setSearchTerm(q);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API_URL}/api/titles/search?q=${encodeURIComponent(searchTerm)}`);
        const normalized = res.data.map((item) => ({
          title: item.Series_Title || item.title,
          description: item.Description || item.description || "No description available.",
          release_year: item.Release_Year || item.release_year,
          duration: item.Duration || item.duration || "N/A",
          rating: item.IMDB_Rating || item.rating || "N/A",
          posterUrl: item.Poster_Link || item.posterUrl,
        }));
        setResults(normalized);
      } catch (err) {
        console.error("Search fetch failed:", err);
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  return (
    <>
      <MNavbar />
      <div className="container py-4">
        {!searchTerm.trim() ? (
          <p className="text-white">Please enter a search term.</p>
        ) : (
          <>
            <h2 className="text-white mb-3">
              Search Results for "{searchTerm}"
            </h2>
            {loading && <p className="text-white">Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && results.length === 0 && (
              <p className="text-white">No results found.</p>
            )}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
              {!loading &&
                !error &&
                results.map((item, index) => (
                  <div className="col" key={`${item.title}-${index}`}>
                    <SearchResultItem {...item} />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SearchResult;
