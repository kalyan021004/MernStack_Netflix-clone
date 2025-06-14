import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function MNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "War",
    "Western",
  ];

  const handleLogout = async () => {
    try {
      await axios.post("https://mern-stack-netflix-clone-uatc.vercel.app/logout", {}, { withCredentials: true });
      alert("Logged out successfully");
      navigate("/");
    } catch (err) {
      alert("Logout failed");
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleGenreClick = (genre) => {
    navigate(`/genre/${encodeURIComponent(genre)}`);
  };

  return (
    <nav className="sticky-top navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold text-danger" to="/home">
        NETFLIX
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          {/* Genre Dropdown */}
          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              role="button"
              id="genreDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            >
              Genres
            </span>
            <ul className="dropdown-menu" aria-labelledby="genreDropdown">
              {genres.map((genre) => (
                <li key={genre}>
                  <span
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleGenreClick(genre)}
                  >
                    {genre}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        <form className="d-flex me-3" onSubmit={handleSearch}>
          <input
            className="form-control form-control-sm"
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-danger btn-sm ms-2" type="submit">
            Search
          </button>
        </form>

        <button onClick={handleLogout} className="btn btn-danger btn-sm">
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default MNavbar;
