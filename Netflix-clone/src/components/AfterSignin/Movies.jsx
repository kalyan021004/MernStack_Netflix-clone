import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardComponent from "../AfterSignin/CardComponent";
import MNavbar from "./MNavbar";

function GenrePage() {
  const { genre } = useParams();
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/genre/${encodeURIComponent(genre)}`);
        setTitles(res.data);
      } catch (error) {
        console.error("Failed to fetch genre:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTitles();
  }, [genre]);

  return (
    <>
    <MNavbar></MNavbar>
    <div className="container py-4">
      <h2 className="text-white mb-3"> {genre}</h2>
      {loading ? (
        <p className="text-light">Loading...</p>
      ) : titles.length === 0 ? (
        <p className="text-light">No titles found in this genre.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {titles.map((movie) => (
            <div className="col" key={movie.title + movie.release_year}>
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
