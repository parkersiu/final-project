import React, { useState } from 'react';
// eslint-disable-next-line
import { InputGroup, Modal, Button, Form } from 'react-bootstrap';

export default function RegisterModal(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const { show, onClose } = props;

  const fetchRegister = newUser => {
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .catch(err => console.error('Error:', err));
  };

  const handleInput = event => {
    if (event.target.id === 'email') {
      setUsername(event.target.value);
    }
    if (event.target.id === 'password') {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
    }
    setValidated(true);
    const newUser = { username, password };
    fetchRegister(newUser);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
            onChange={handleInput}
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
            onChange={handleInput}
            />
            <Form.Text id="password" muted>
              Your password must be 8-20 characters long.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Register
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
