
// Comedy.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "./CardComponent";
import { useNavigate } from "react-router-dom";

const fallbackImageUrl = "https://via.placeholder.com/300x400?text=No+Image";

function Comedy() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
const API_URL ="https://mernstack-netflix-clone-cpvy.onrender.com";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/titles/genre/comedy`, {
          withCredentials: true
        });
        setMovies(res.data);
      } catch (err) {
        console.error("Failed to fetch Comedy movies:", err);
        setError("Failed to load Comedy movies.");
        
        // Handle authentication errors
        if (err.response?.status === 401) {
          navigate('/signin');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [API_URL, navigate]);

  const handleShowMore = () => {
    navigate("/genre/comedy");
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-white">Comedy Movies</h2>
        {movies.length > 6 && !loading && !error && (
          <button onClick={handleShowMore} className="btn btn-outline-danger btn-sm">
            Show More
          </button>
        )}
      </div>

      {loading && <p className="text-light">Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && movies.length === 0 && (
        <p className="text-light">No Comedy movies found.</p>
      )}

      <div className="row g-2">
        {movies.slice(0, 6).map((movie) => (
          <div className="col-2" key={movie.title}>
            <CardComponent
              title={movie.title}
              description={movie.description}
              release_year={movie.release_year}
              duration={movie.duration}
              rating={movie.rating}
              posterUrl={movie.posterUrl || fallbackImageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comedy;