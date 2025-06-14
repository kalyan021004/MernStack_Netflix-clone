import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a className="navbar-brand text-danger fw-bold" href="/">
        NETFLIX
      </a>

      <div className="ms-auto d-flex align-items-center gap-3">
        <select
          id="language"
          className="form-select bg-dark text-white border-secondary w-auto"
        >
          <option value="en" defaultValue>
            English
          </option>
          <option value="hi">हिन्दी</option>
        </select>

        {/* Use Link for client-side routing */}
        <Link to="/signin" className="btn btn-danger">
          Sign In
        </Link>
      </div>
    </nav>
  );
}

export default Header;
