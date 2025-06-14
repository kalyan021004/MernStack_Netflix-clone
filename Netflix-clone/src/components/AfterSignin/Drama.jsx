import React, { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "./CardComponent";
import { useNavigate } from "react-router-dom";

const fallbackImageUrl = "https://via.placeholder.com/300x400?text=No+Image";

function Drama() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("https://mern-stack-netflix-clone-uatc.vercel.app/genre/drama");
        setMovies(res.data);
      } catch (err) {
        console.error("Failed to fetch Drama movies:", err);
        setError("Failed to load Drama movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleShowMore = () => {
    navigate("/genre/Drama");
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-white">Drama Movies</h2>
        {movies.length > 6 && !loading && !error && (
          <button onClick={handleShowMore} className="btn btn-outline-danger btn-sm">
            Show More
          </button>
        )}
      </div>

      {loading && <p className="text-light">Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && movies.length === 0 && (
        <p className="text-light">No Drama movies found.</p>
      )}

      <div className="row g-2">
        {movies.slice(0, 6).map((movie) => (
          <div className="col-2" key={movie._id || movie.title}>
            <CardComponent
              title={movie.title || movie.Series_Title}
              description={movie.description || movie.Description}
              release_year={movie.release_year || movie.Release_Year}
              duration={movie.duration || movie.Duration}
              rating={movie.rating || movie.IMDB_Rating}
              posterUrl={movie.posterUrl || movie.Poster_Link || fallbackImageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drama;
