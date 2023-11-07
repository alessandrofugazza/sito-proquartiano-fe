import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function AddArticle() {
  const [selectedDate, setSelectedDate] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };
  return (
    <>
      <Form>
        {/* <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titolo</Form.Label>
          <Form.Control type="text" placeholder="Inserisci un titolo" />
        </Form.Group> */}
        <InputGroup className="mb-3">
          <InputGroup.Text id="title">Titolo</InputGroup.Text>
          <Form.Control placeholder="Inserisci un titolo" aria-label="Titolo" aria-describedby="title" />
        </InputGroup>
        <Form.Group className="mb-3 d-flex flex-column" controlId="title">
          <Form.Label>Data e ora</Form.Label>
          <input type="datetime-local" value={selectedDate} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="categories">
          <Form.Label>Categorie</Form.Label>
          <Form.Check type="checkbox" id="associazione" label="Associazione" />
          <Form.Check type="checkbox" label="Concorso cori" id="concorso-cori" />
          <Form.Check type="checkbox" label="Manifestazioni" id="manifestazioni" />
          <Form.Check type="checkbox" label="Rassegna stampa" id="rassegna-stampa" />
        </Form.Group>
      </Form>
    </>
  );
}
