import React, { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "./CardComponent";
import MNavbar from "./MNavbar";

function FullMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:8080/movies");
        setMovies(res.data.movies || res.data || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  return (
      <div className="container py-4">
        <MNavbar></MNavbar>
      <h2 className="text-white mb-4">All Movies</h2>
      <div className="row">
        {movies.map((movie, idx) => (
          <div className="col-md-3 mb-4" key={idx}>
            <CardComponent
              title={movie.title}
              description={movie.description}
              release_year={movie.release_year}
              duration={movie.duration}
              rating={movie.rating}
              posterUrl={movie.posterUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FullMovies;
