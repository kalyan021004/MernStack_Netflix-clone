import React from 'react';

function Mainhero() {
  return (
    <>
      <section className="hero-section d-flex align-items-center justify-content-center text-center px-3">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <h1 className="display-4 fw-bold">Unlimited movies, TV shows and more</h1>
          <p className="fs-5 mt-3">Starts at ₹149. Cancel at any time.</p>
          <p className="fs-6">
            Ready to watch? Enter your email to create or restart your membership.
          </p>

          <form className="row g-2 justify-content-center mt-4">
            <div className="col-md-4 col-12">
              <input
                type="email"
                className="form-control email-input py-2"
                placeholder="Email address"
              />
            </div>
            <div className="col-md-auto col-12">
              <a href='/signup' type="submit" className="btn btn-danger btn-lg w-100">
                Get Started
              </a>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Mainhero;
