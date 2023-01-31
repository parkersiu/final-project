import React from 'react';
import Navbar from '../components/navbar';

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="d-flex align-items-center justify-content-center mt-3">
        <div className="text-center">
          <h1 className="display-1 fw-bold">About</h1>
          <p className="lead">
            Thank you for visiting my first full stack React application, Milestone.
          </p>
          <a href="#" className="btn btn-primary">Go Home</a>
        </div>
      </div>
    </div>
  );
}
