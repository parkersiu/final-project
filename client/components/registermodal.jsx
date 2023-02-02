import React, { useState } from 'react';
// eslint-disable-next-line
import { InputGroup, Modal, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function RegisterModal(props) {
  const [username, setUsername] = useState('demo@user.com');
  const [password, setPassword] = useState('demouserpw');
  const [validated, setValidated] = useState(false);
  const { show, onClose, setToken } = props;

  const fetchRegister = newUser => {
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .catch(err => console.error('Error:', err));
  };

  async function fetchLogin(user) {
    return fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .catch(err => console.error('Error:', err));
  }

  const handleSubmit = async event => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
    }
    if (form.checkValidity()) {
      setValidated(true);
      onClose();
    }
    if (props.type === 'Register') {
      const newUser = { username, password };
      await fetchRegister(newUser);
    }
    if (props.type === 'Login') {
      const user = { username, password };
      const response = await fetchLogin(user);
      setToken(response.signedToken);
    }
  };

  if (props.type === 'Register') {
    return (
      <Modal show={show} onHide={onClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <fieldset disabled>
            <Modal.Header closeButton>
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
            required
            type="email"
            id="email"
            placeholder="email@example.com"
            onChange={event => setUsername(event.target.value)}
            />
              </Form.Group>
              <Form.Group className='mt-1'>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
            required
            type="password"
            id="password"
            minLength={8}
            maxLength={20}
            onChange={event => setPassword(event.target.value)}
            />
                <Form.Text id="password" muted>
                  Your password must be 8-20 characters long.
                </Form.Text>
              </Form.Group>
            </Modal.Body>
          </fieldset>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Disabled for demo</Tooltip>}>
              <span className='d-inline-block'>
                <Button type="submit" variant="primary" disabled style={{ pointerEvents: 'none' }}>
                  Register
                </Button>
              </span>
            </OverlayTrigger>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
  if (props.type === 'Login') {
    return (
      <Modal show={show} onHide={onClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <fieldset disabled>
            <Modal.Header closeButton>
              <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                required
                type="email"
                id="email"
                placeholder="email@example.com"
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
              </Form.Group>
              <Form.Group className='mt-1'>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                required
                type="password"
                id="password"
                value={password}
                minLength={8}
                maxLength={20}
                onChange={event => setPassword(event.target.value)}
              />
                <Form.Text id="password" muted>
                  Your password must be 8-20 characters long.
                </Form.Text>
              </Form.Group>
            </Modal.Body>
          </fieldset>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Log In
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
