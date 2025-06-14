import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-secondary py-4 mt-5">
      <div className="container" style={{ maxWidth: '720px' }}>
        <div className="mb-3">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => alert('Language selector (mock)')}
          >
            English
          </button>
        </div>

        <div className="row text-muted small">
          <div className="col-6 col-md-3 mb-3">
            <ul className="list-unstyled">
              <li><a href="#" className="text-secondary text-decoration-none">FAQ</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Investor Relations</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Privacy</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Speed Test</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <ul className="list-unstyled">
              <li><a href="#" className="text-secondary text-decoration-none">Help Center</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Jobs</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Cookie Preferences</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Legal Notices</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <ul className="list-unstyled">
              <li><a href="#" className="text-secondary text-decoration-none">Account</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Ways to Watch</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Corporate Information</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Only on Netflix</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <ul className="list-unstyled">
              <li><a href="#" className="text-secondary text-decoration-none">Media Center</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Terms of Use</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <p className="mt-4 text-muted small">&copy; 1997-2025 Netflix, Inc.</p>
      </div>
    </footer>
  );
}
