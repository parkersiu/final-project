import React from 'react';
import Navbar from '../components/navbar';

export default function About(props) {
  return (
    <div>
      <Navbar userId={props.userId} />
      <div className="d-flex align-items-center justify-content-center mt-3">
        <div className="text-center">
          <h1 className="display-1 fw-bold">About</h1>
          <p className="lead">
            Milestone is a full stack React application created by <a className='about-link' target="_blank" href='https://www.linkedin.com/in/parkersiu/' rel="noreferrer">Parker Siu</a>.
            Please view the source on <a className='about-link' target="_blank" href='https://github.com/parkersiu/milestone' rel="noreferrer">GitHub</a>.
          </p>
          <a href="#" className="btn btn-primary">Return Home</a>
        </div>
      </div>
    </div>
  );
}
