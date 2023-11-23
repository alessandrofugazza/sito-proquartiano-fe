import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function AdminLogin() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (propertyName: string, propertyValue: string) => {
    setLoginForm({ ...loginForm, [propertyName]: propertyValue });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const re = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      body: JSON.stringify(loginForm),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const rePayload = await re.json();
    localStorage.setItem("loginToken", rePayload.accessToken);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Indirizzo email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Inserisci l'email"
          value={loginForm.email}
          onChange={e => handleChange("email", e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Inserisci la password"
          value={loginForm.password}
          onChange={e => handleChange("password", e.target.value)}
        />
      </Form.Group>
      <Button variant="danger" type="submit">
        Login
      </Button>
    </Form>
  );
}
