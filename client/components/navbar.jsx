import React, { useState } from 'react';
import RegisterModal from './registermodal';

export default function Navbar(props) {
  const [show, setShow] = useState(false);
  const [type, setType] = useState('');
  // eslint-disable-next-line
  const [userToken, setUserToken] = useState();

  const handleShowRegister = () => {
    setShow(true);
    setType('Register');
  };
  const handleShowLogin = () => {
    setShow(true);
    setType('Login');
  };
  const handleClose = () => setShow(false);

  const setToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setUserToken(userToken);
  };

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const token = getToken();

  const logout = () => {
    sessionStorage.clear();
    setUserToken();
    props.setUser(null);
  };

  return (
    <div>
      <RegisterModal show={show} type={type} onClose={handleClose} setToken={setToken} setUser={props.setUser} />
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
                <a className="nav-link nav-text" href='#projects'>Projects</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-text" href='#about'>About</a>
              </li>
            </ul>
            {token
              ? <button className='btn btn-outline-primary nav-button p-2' type='button' onClick={logout}>Sign Out</button>
              : <div>
                <button className="btn btn-outline-primary me-2 nav-button" type="button" onClick={handleShowRegister}>Register</button>
                <button className="btn btn-outline-success ms-2 nav-button" type="button" onClick={handleShowLogin}>Log In</button>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}
