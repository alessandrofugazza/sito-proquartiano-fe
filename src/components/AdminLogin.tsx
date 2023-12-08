import { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

export default function AdminLogin() {
  const [validated, setValidated] = useState(false);
  const [showOutcome, setShowOutcome] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (propertyName: string, propertyValue: string) => {
    setLoginForm({ ...loginForm, [propertyName]: propertyValue });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);
    setShowOutcome(false);
    setIsLoading(true);
    setHasError(false);

    try {
      const re = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(loginForm),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (re.ok) {
        const rePayload = await re.json();
        localStorage.setItem("loginToken", rePayload.accessToken);
        localStorage.setItem("username", rePayload.username);
      } else {
        setHasError(true);
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
      setShowOutcome(true);
    }
  };

  return (
    <>
      <Alert variant="warning">Questa funzionalità è attualmente riservata agli amministratori del sito.</Alert>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-semibold">Indirizzo email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Inserisci l'email"
            value={loginForm.email}
            onChange={e => handleChange("email", e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="fw-semibold">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Inserisci la password"
            value={loginForm.password}
            onChange={e => handleChange("password", e.target.value)}
            required
          />
        </Form.Group>
        <div className="mt-4 ">
          <Button variant="danger" className="navigation-button " type="submit">
            Login
          </Button>
        </div>
      </Form>
      {isLoading && (
        <div className="d-flex justify-content-center mt-5 mb-3">
          <Spinner variant="danger" />
        </div>
      )}
      {showOutcome && (
        <Alert
          variant={`${hasError ? "danger" : "success"}`}
          className="mt-5"
          onClose={() => setShowOutcome(false)}
          dismissible
        >
          <Alert.Heading className="d-flex align-items-center">
            <i className={`bi ${hasError ? "bi-x" : "bi-check2"} fs-1 me-3`}></i>
            <span>{hasError ? "Errore!" : "Successo!"}</span>
          </Alert.Heading>
          <p>{hasError ? "L'operazione non è andata a buon fine" : "Operazione effettuata con successo."}</p>
        </Alert>
      )}
    </>
  );
}
