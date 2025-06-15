import React, { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "./CardComponent";
import { useNavigate } from "react-router-dom";


function Fantasy() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL ="https://mernstack-netflix-clone-cpvy.onrender.com";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/titles/genre/fantasy`);
        setMovies(res.data);
      } catch (err) {
        console.error("Failed to fetch Fantasy movies:", err);
        setError("Failed to load Fantasy movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleShowMore = () => {
    navigate("/genre/fantasy");
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-white">Fantasy Movies</h2>
        {movies.length > 6 && !loading && !error && (
          <button onClick={handleShowMore} className="btn btn-outline-danger btn-sm">
            Show More
          </button>
        )}
      </div>

      {loading && <p className="text-light">Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && movies.length === 0 && (
        <p className="text-light">No Fantasy movies found.</p>
      )}

      <div className="row g-2">
        {movies.slice(0, 6).map((movie) => (
          <div className="col-2" key={movie._id || movie.title}>
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

export default Fantasy;
