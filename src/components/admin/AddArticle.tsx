import { useState } from "react";
import { CloseButton, Col, InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function AddArticle() {
  const [selectedDate, setSelectedDate] = useState("");
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleNewTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const addNewTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTags([...tags, newTag]);
    setNewTag("");
  };

  const handleRemoveTag = (tagToRemove: String) => {
    // e.stopPropagation();

    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
  };

  return (
    <Row>
      <Col lg="6">
        <Form onSubmit={handleFormSubmit} className="">
          {/* <Form.Group className="mb-3" controlId="title">
            <Form.Label>Titolo</Form.Label>
            <Form.Control type="text" placeholder="Inserisci un titolo" />
          </Form.Group> */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="title">Titolo</InputGroup.Text>
            <Form.Control placeholder="Inserisci un titolo" type="text" aria-label="Titolo" aria-describedby="title" />
          </InputGroup>
          <Form.Group className="mb-3 d-flex flex-column" controlId="title">
            <Form.Label>Data e ora</Form.Label>
            <input type="datetime-local" value={selectedDate} onChange={handleDateChange} />
          </Form.Group>
        </Form>
      </Col>
      <Col lg="3">
        <Form>
          <Form.Group className="mb-3" controlId="categories">
            <Form.Label>Categorie</Form.Label>
            <Form.Check type="checkbox" id="associazione" label="Associazione" />
            <Form.Check type="checkbox" label="Concorso cori" id="concorso-cori" />
            <Form.Check type="checkbox" label="Manifestazioni" id="manifestazioni" />
            <Form.Check type="checkbox" label="Rassegna stampa" id="rassegna-stampa" />
          </Form.Group>
        </Form>
      </Col>
      <Col lg="3">
        <Form onSubmit={addNewTag}>
          <Form.Group className="mb-3" controlId="tags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              placeholder="Inserisci un nuovo tag"
              type="text"
              aria-label="Tag"
              aria-describedby="tag"
              value={newTag}
              onChange={handleNewTagChange}
            />
          </Form.Group>
          <div className="d-flex gap-2 flex-wrap">
            {tags.map(tag => (
              <Button
                as="div"
                variant="light"
                className="border border-dark d-flex align-items-center"
                size="sm"
                key={tag}
              >
                {tag}
                <CloseButton onClick={() => handleRemoveTag(tag)} />
              </Button>
            ))}
          </div>
        </Form>
      </Col>
      <Col>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={10} />
        </Form.Group>
      </Col>
    </Row>
  );
}
