import React, { useState } from 'react';

function CardComponent({ title, description, release_year, duration, rating, posterUrl }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Fallback placeholder image or default poster
  const defaultPoster = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  return (
    <div className="card bg-dark text-white h-100" style={{ border: 'none' }}>
      <div className="position-relative">
        {imageLoading && (
          <div 
            className="d-flex align-items-center justify-content-center bg-secondary" 
            style={{ height: '300px', fontSize: '14px' }}
          >
            Loading...
          </div>
        )}
        
        <img
          src={imageError ? defaultPoster : posterUrl}
          className="card-img-top"
          alt={title}
          style={{ 
            height: '300px', 
            objectFit: 'cover',
            display: imageLoading ? 'none' : 'block'
          }}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        
        {/* Rating badge */}
        {rating && (
          <span 
            className="position-absolute top-0 end-0 badge bg-warning text-dark m-2"
            style={{ fontSize: '0.75rem' }}
          >
            ⭐ {rating}
          </span>
        )}
      </div>
      
      <div className="card-body d-flex flex-column">
        <h6 className="card-title text-truncate" title={title}>
          {title}
        </h6>
        
        <div className="small text-muted mb-2">
          {release_year && <span>{release_year}</span>}
          {duration && release_year && <span> • </span>}
          {duration && <span>{duration}</span>}
        </div>
        
        {description && (
          <p 
            className="card-text small text-muted flex-grow-1" 
            style={{ 
              fontSize: '0.8rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
            title={description}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default CardComponent;