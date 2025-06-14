import React from 'react';

function Card({ image, title, alt }) {
  return (
    <div
      className="card bg-dark border-0"
      style={{ flex: '0 0 20%', maxWidth: '20%' }}
    >
      <img
        src={image}
        className="card-img-top rounded"
        alt={alt}
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <div className="card-body p-2">
        <h6 className="card-title text-white mb-0" style={{ fontSize: '0.85rem' }}>
          {title}
        </h6>
      </div>
    </div>
  );
}

export default Card;
