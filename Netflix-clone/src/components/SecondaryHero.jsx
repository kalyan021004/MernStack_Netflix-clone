import React from 'react';
import SecCard from './SecCard';
import reasons from '../../data/reason';

function SecondaryHero() {
  return (
    <section className="py-4 bg-dark text-white">
      <div className="container">
        <h3 className="mb-4">More to Explore</h3>

        {/* flex-lg-row means horizontal on large screens, vertical on small */}
        <div className="d-flex flex-column flex-lg-row flex-wrap gap-3 justify-content-center">
          {reasons.map((reason, idx) => (
            <SecCard
              key={idx}
              image={reason.icon}
              title={reason.title}
              subtitle={reason.description}
              alt={reason.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SecondaryHero;
