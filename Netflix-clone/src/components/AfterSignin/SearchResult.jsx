import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchResultItem from "./SearchResultItem";
import MNavbar from "./MNavbar";

const fallbackImageUrl = "https://via.placeholder.com/300x400?text=No+Image";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResult() {
  const query = useQuery();
  const searchTerm = query.get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      console.log("No search term found");
      return;
    }
    const fetchResults = async () => {
      try {
        console.log("Fetching results for:", searchTerm);
        const res = await axios.get(`https://mern-stack-netflix-clone-uatc.vercel.app/search?q=${searchTerm}`);
        console.log("Raw API results:", res.data);

        const normalized = res.data.map(item => ({
          title: item.Series_Title || item.title,
          description: item.Description || item.description,
          release_year: item.Release_Year || item.release_year,
          duration: item.Duration || item.duration,
          rating: item.IMDB_Rating || item.rating,
          posterUrl: item.Poster_Link || item.posterUrl || fallbackImageUrl
        }));

        setResults(normalized);
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    };

    fetchResults();
  }, [searchTerm]);

  return (
    <>
      <MNavbar />
      <div className="container py-4">
        {results.length > 0 ? (
          results.map((item, index) => (
            <SearchResultItem
              key={index}
              title={item.title}
              description={item.description}
              release_year={item.release_year}
              duration={item.duration}
              rating={item.rating}
              posterUrl={item.posterUrl}
            />
          ))
        ) : (
          <p className="text-white">No results found.</p>
        )}
      </div>
    </>
  );
}

export default SearchResult;
