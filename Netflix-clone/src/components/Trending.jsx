import React, { useRef } from 'react';
import Card from './Card';  // your card component
import movies from '../../data/movies';

function Trending() {
  const scrollRef = useRef(null);

  // Scroll handler: direction can be 'left' or 'right'
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // pixels to scroll
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="trending-section py-4 bg-dark text-white position-relative">
      <div className="container">
        <h3 className="mb-3 fw-bold">Trending Now</h3>

        {/* Scroll Buttons */}
        <button
          className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
          style={{ zIndex: 10 }}
          onClick={() => scroll('left')}
          aria-label="Scroll Left"
        >
          &#8249; {/* Left arrow */}
        </button>

        <button
          className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
          style={{ zIndex: 10 }}
          onClick={() => scroll('right')}
          aria-label="Scroll Right"
        >
          &#8250; {/* Right arrow */}
        </button>

        {/* Scrollable cards container */}
        <div
          ref={scrollRef}
          className="d-flex overflow-auto trending-scroll pb-2"
          style={{ gap: '15px', scrollBehavior: 'smooth', padding: '0 40px' }} 
          // padding added to avoid arrow overlap
        >
          {movies.map((movie, idx) => (
            <Card
              key={idx}
              image={movie.image}
              title={movie.title}
              alt={movie.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Trending;
