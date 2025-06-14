import React from 'react';

function SecCard({ image, title, subtitle }) {
  return (
    <div className="card bg-secondary text-white p-3" style={{ minWidth: '250px', flex: '1 1 auto' }}>
      <div className="card-body">
        <i className={`${image} fa-2x mb-3`}></i> {/* Font Awesome icon */}
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{subtitle}</p>
      </div>
    </div>
  );
}

export default SecCard;
