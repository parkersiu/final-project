import React, { useState } from 'react';
import RegisterModal from './registermodal';

export default function Navbar(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <RegisterModal show={show} onClose={handleClose} />
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">Milestone</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link nav-text" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-text" href='#'>Projects</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link nav-text" href='#'>
                  Alerts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-text" href='#'>About</a>
              </li>
            </ul>
            <button className="btn btn-outline-primary me-2 nav-button" type="button" onClick={handleShow}>Register</button>
            <button className="btn btn-outline-success ms-2 nav-button" type="button">Log In</button>
          </div>
        </div>
      </nav>
    </div>
  );
}
