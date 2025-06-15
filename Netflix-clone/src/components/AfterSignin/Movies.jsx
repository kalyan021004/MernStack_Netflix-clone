import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardComponent from "../AfterSignin/CardComponent";
import MNavbar from "./MNavbar";

const API_URL = "https://mernstack-netflix-clone-cpvy.onrender.com";

function GenrePage() {
  const { genre } = useParams();
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const displayGenre = genre
    ? genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase()
    : "";

  useEffect(() => {
    const fetchTitles = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/titles/genre/${encodeURIComponent(genre)}`);
        setTitles(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch genre:", err);
        setError("Failed to load titles for this genre.");
      } finally {
        setLoading(false);
      }
    };

    if (genre) fetchTitles();
  }, [genre]);

  return (
    <>
      <MNavbar />
      <div className="container py-4">
        <h2 className="text-white mb-3">{displayGenre} Movies</h2>

        {loading && <p className="text-light">Loading...</p>}

        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && titles.length === 0 && (
          <p className="text-light">No titles found in this genre.</p>
        )}

        {!loading && !error && titles.length > 0 && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {titles.map((movie, index) => (
              <div className="col" key={movie._id || movie.id || `${movie.title}-${movie.release_year}-${index}`}>
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
        )}
      </div>
    </>
  );
}

export default GenrePage;