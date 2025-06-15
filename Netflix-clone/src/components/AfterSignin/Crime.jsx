import React, { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "./CardComponent";
import { useNavigate } from "react-router-dom";

function Crime() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const API_URL = "https://mernstack-netflix-clone-cpvy.onrender.com";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/titles/genre/crime`, {
          withCredentials: true
        });
        setMovies(res.data);
      } catch (err) {
        console.error("Failed to fetch Crime movies:", err);
        setError("Failed to load Crime movies.");
        
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
    navigate("/genre/crime");
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-white">Crime Movies</h2>
        {movies.length > 6 && !loading && !error && (
          <button onClick={handleShowMore} className="btn btn-outline-danger btn-sm">
            Show More
          </button>
        )}
      </div>

      {loading && <p className="text-light">Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && movies.length === 0 && (
        <p className="text-light">No Crime movies found.</p>
      )}

      <div className="row g-2">
        {movies.slice(0, 6).map((movie, index) => (
          <div className="col-2" key={movie.id || movie._id || `${movie.title}-${index}`}>
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

export default Crime;