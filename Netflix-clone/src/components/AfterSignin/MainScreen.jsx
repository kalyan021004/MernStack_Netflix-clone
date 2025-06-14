import React, { useEffect, useState } from "react";
import axios from "axios";

function MainScreen() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        const res = await axios.get("http://localhost:8080/hero");
        setMovie(res.data);
      } catch (err) {
        console.error("Error fetching hero movie:", err);
      }
    };

    fetchHeroMovie();
  }, []);

  if (!movie) return null; // or a loading spinner

  return (
    <div
      style={{
        position: "relative",
        height: "70vh",
        color: "white",
        backgroundImage: `url(${movie.Poster_Link})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "2rem",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.9) 90%)",
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 2, maxWidth: "600px" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          {movie.Series_Title}
        </h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>
          {movie.Overview}
        </p>
        <button
          style={{
            backgroundColor: "#e50914",
            border: "none",
            padding: "0.75rem 1.5rem",
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => alert("Play button clicked!")}
        >
          ▶ Play Now
        </button>
      </div>
    </div>
  );
}

export default MainScreen;
