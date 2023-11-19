import React, { useState } from "react";
import { CloseButton, Col, InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function AddArticle() {
  const [selectedDate, setSelectedDate] = useState("");
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState({
    associazione: false,
    concorsoCori: false,
    manifestazioni: false,
    rassegnaStampa: false,
  });

  const handleCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategories({
      ...categories,
      [e.target.id]: e.target.checked,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleNewTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const addNewTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: String) => {
    // e.stopPropagation();

    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
  };

  return (
    <Form onSubmit={handleFormSubmit} className="">
      <Row>
        <Col lg="6">
          <InputGroup className="mb-3">
            <InputGroup.Text id="title">Titolo</InputGroup.Text>
            <Form.Control placeholder="Inserisci un titolo" type="text" aria-label="Titolo" aria-describedby="title" />
          </InputGroup>
          <Form.Group className="mb-3 d-flex flex-column" controlId="title">
            <Form.Label>Data dell'evento</Form.Label>
            <input type="date" value={selectedDate} onChange={handleDateChange} />
          </Form.Group>
        </Col>
        <Col lg="3">
          <Form.Group className="mb-3" controlId="categories">
            <Form.Label>Categorie</Form.Label>
            <Form.Check
              type="checkbox"
              label="Associazione"
              id="associazione"
              checked={categories.associazione}
              onChange={handleCategoriesChange}
            />
            <Form.Check
              type="checkbox"
              label="Concorso cori"
              id="concorsoCori"
              checked={categories.concorsoCori}
              onChange={handleCategoriesChange}
            />
            <Form.Check
              type="checkbox"
              label="Manifestazioni"
              id="manifestazioni"
              checked={categories.manifestazioni}
              onChange={handleCategoriesChange}
            />
            <Form.Check
              type="checkbox"
              label="Rassegna stampa"
              id="rassegnaStampa"
              checked={categories.rassegnaStampa}
              onChange={handleCategoriesChange}
            />
          </Form.Group>
        </Col>
        <Col lg="3">
          <Form.Group className="mb-3" controlId="tags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              placeholder="Inserisci un nuovo tag"
              type="text"
              aria-label="Tag"
              aria-describedby="tag"
              value={newTag}
              onChange={handleNewTagChange}
              onKeyDown={addNewTag}
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
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Contenuto</Form.Label>
            <Form.Control className="w-100" as="textarea" rows={10} value={content} onChange={handleContentChange} />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="danger" type="submit">
        Aggiungi articolo
      </Button>
    </Form>
  );
}
