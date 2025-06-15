import React from "react";

const fallbackImageUrl = "https://via.placeholder.com/300x400?text=No+Image";

function SearchResultItem({ title, description, release_year, duration, rating, posterUrl }) {
  return (
    <div className="card mb-3 bg-dark text-white" style={{ maxWidth: "100%" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={posterUrl}
            className="img-fluid rounded-start"
            alt={title}
            onError={(e) => (e.target.src = fallbackImageUrl)}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title text-danger">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                Year: {release_year} | Duration: {duration} | Rating: {rating}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultItem;
