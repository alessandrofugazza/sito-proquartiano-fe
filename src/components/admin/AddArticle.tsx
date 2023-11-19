import React, { useState } from "react";
import { CloseButton, Col, InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface Article {
  title: string;
  date: string;
  content: string;
  categories: {
    associazione: boolean;
    concorsoCori: boolean;
    manifestazioni: boolean;
    rassegnaStampa: boolean;
  };
  tags: string[];
  img: File | null;
  pdf: File | null;
}

export default function AddArticle() {
  const [hasAlert, setHasAlert] = useState(false);
  const [alert, setAlert] = useState({ message: "", status: "", variant: "success" });
  const [article, setArticle] = useState<Article>({
    title: "",
    date: "",
    content: "",
    categories: {
      associazione: false,
      concorsoCori: false,
      manifestazioni: false,
      rassegnaStampa: false,
    },
    tags: [],
    img: null,
    pdf: null,
  });
  // const [selectedDate, setSelectedDate] = useState("");
  const [newTag, setNewTag] = useState("");
  // const [tags, setTags] = useState<string[]>([]);
  // const [content, setContent] = useState("");
  // const [categories, setCategories] = useState({
  //   associazione: false,
  //   concorsoCori: false,
  //   manifestazioni: false,
  //   rassegnaStampa: false,
  // });

  const handleInputChange = (propertyName: string, propertyValue: string | string[]) => {
    setArticle({ ...article, [propertyName]: propertyValue });
  };

  const handleCategoriesChange = (propertyName: string, propertyValue: boolean) => {
    setArticle({
      ...article,
      categories: {
        ...article.categories,
        [propertyName]: propertyValue,
      },
    });
  };

  const handleNewTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  // const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedDate(e.target.value);
  // };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(article);
  };

  // const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setContent(e.target.value);
  // };

  const addNewTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setArticle({
        ...article,
        tags: [...article.tags, newTag],
      });
      // setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: String) => {
    // e.stopPropagation();
    setArticle({
      ...article,
      tags: article.tags.filter(tag => tag !== tagToRemove),
    });
    // const newTags = tags.filter(tag => tag !== tagToRemove);
    // setTags(newTags);
  };

  return (
    <Form onSubmit={handleFormSubmit} className="">
      <Row>
        <Col lg="6">
          <InputGroup className="mb-3">
            <InputGroup.Text id="title">Titolo</InputGroup.Text>
            <Form.Control
              placeholder="Inserisci un titolo"
              type="text"
              aria-label="Titolo"
              aria-describedby="title"
              value={article.title}
              onChange={e => handleInputChange("title", e.target.value)}
            />
          </InputGroup>
          <Form.Group className="mb-3 d-flex flex-column" controlId="title">
            <Form.Label>Data dell'evento</Form.Label>
            <input type="date" value={article.date} onChange={e => handleInputChange("date", e.target.value)} />
          </Form.Group>
        </Col>
        <Col lg="3">
          <Form.Group className="mb-3" controlId="categories">
            <Form.Label>Categorie</Form.Label>
            <Form.Check
              type="checkbox"
              label="Associazione"
              id="associazione"
              checked={article.categories.associazione}
              onChange={e => handleCategoriesChange("associazione", e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="Concorso cori"
              id="concorsoCori"
              checked={article.categories.concorsoCori}
              onChange={e => handleCategoriesChange("concorsoCori", e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="Manifestazioni"
              id="manifestazioni"
              checked={article.categories.manifestazioni}
              onChange={e => handleCategoriesChange("manifestazioni", e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="Rassegna stampa"
              id="rassegnaStampa"
              checked={article.categories.rassegnaStampa}
              onChange={e => handleCategoriesChange("rassegnaStampa", e.target.checked)}
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
            {article.tags.map(tag => (
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
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Contenuto</Form.Label>
            <Form.Control
              className="w-100"
              as="textarea"
              rows={10}
              value={article.content}
              onChange={e => handleInputChange("content", e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Aggiungi un'immagine</Form.Label>
          <Form.Control
            type="file"
            style={{ width: "auto" }}
            onChange={e => handleInputChange("img", e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Aggiungi un file pdf</Form.Label>
          <Form.Control
            type="file"
            style={{ width: "auto" }}
            onChange={e => handleInputChange("pdf", e.target.value)}
          />
        </Form.Group>
      </Row>
      <Button variant="danger" type="submit">
        Aggiungi articolo
      </Button>
    </Form>
  );
}
