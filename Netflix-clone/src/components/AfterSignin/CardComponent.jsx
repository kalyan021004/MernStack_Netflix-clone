import React from "react";

function CardComponent({ title, description, release_year, duration, rating, posterUrl }) {
  return (
    <div className="card bg-dark text-white h-100" style={{ width: "100%" }}>
      <img
        src={posterUrl || "https://via.placeholder.com/300x400?text=No+Image"}
        alt={title}
        className="card-img-top"
        style={{ height: "225px", objectFit: "cover" }}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
        }}
      />
      <div className="card-body d-flex flex-column p-2">
        <h5 className="card-title text-danger" style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          {title}
        </h5>
        <p
          className="card-text flex-grow-1"
          style={{
            fontSize: "0.75rem",
            marginBottom: "0.5rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
        <p className="card-text" style={{ fontSize: "0.7rem", marginBottom: "0.5rem" }}>
          <small className="text-muted">
            Year: {release_year} | Duration: {duration} | Rating: {rating}
          </small>
        </p>

        {/* Play button */}
        <button
          type="button"
          className="btn btn-danger btn-sm mt-auto"
          style={{ alignSelf: "flex-start" }}
          onClick={() => alert(`Playing ${title}`)} // You can replace this with actual play logic
        >
          ▶ Play
        </button>
      </div>
    </div>
  );
}

export default CardComponent;
