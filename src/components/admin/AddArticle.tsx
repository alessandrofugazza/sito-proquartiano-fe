import React, { useState } from "react";
import { CloseButton, Col, InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Article from "../Article";
import OutcomeToast from "../shared-components/OutcomeToast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/AddArticle.scss";

interface Article {
  authorId: string;
  title: string;
  // date: string;
  content: string;
  categories: string[];
  tags: string[];
  // img: File | null;
  // pdf: File | null;
}

export default function AddArticle() {
  const [hasAlert, setHasAlert] = useState(false);
  const [alert, setAlert] = useState({ message: "", status: "", variant: "success" });
  const [showPreview, setShowPreview] = useState(false);
  const [article, setArticle] = useState<Article>({
    authorId: "",
    title: "",
    // date: "",
    content: "",
    categories: [],
    tags: [],
  });
  const [img, setImg] = useState<File | null>(null);
  const [newTag, setNewTag] = useState("");
  const [validated, setValidated] = useState(false);
  const [showOutcomeToast, setShowOutcomeToast] = useState(false);

  // quill
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      // [{ font: [] }],
      // [{ align: [] }],

      ["clean"],
    ],
  };
  //

  const handleInputChange = (propertyName: string, propertyValue: string | string[]) => {
    setArticle({ ...article, [propertyName]: propertyValue });
  };

  const handleCategoriesChange = (propertyName: string, propertyValue: boolean) => {
    if (propertyValue === true) {
      setArticle({
        ...article,
        categories: [...article.categories, propertyName],
      });
    } else {
      setArticle({
        ...article,
        categories: [...article.categories.filter(category => category !== propertyName)],
      });
    }
  };

  const handleNewTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0]);
    } else {
      setImg(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowOutcomeToast(true);
    setTimeout(() => setShowOutcomeToast(false), 3000);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      console.log("invalid");
    }

    console.log("saved");
    setArticle({
      authorId: "",
      title: "",
      content: "",
      categories: [],
      tags: [],
    });
    setValidated(true);
    const formData = new FormData();
    formData.append("article", JSON.stringify(article));
    if (img) {
      formData.append("img", img);
    }

    try {
      const re = await fetch("http://localhost:3001/articoli", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
        body: formData,
      });
      if (re.ok) {
        console.log("done");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error");
    }
  };

  const addNewTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setArticle({
        ...article,
        tags: [...article.tags, newTag],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: String) => {
    setArticle({
      ...article,
      tags: article.tags.filter(tag => tag !== tagToRemove),
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="">
        <Row>
          <Col lg="6">
            <InputGroup hasValidation className="mb-3">
              <InputGroup.Text id="title">Titolo</InputGroup.Text>
              <Form.Control
                placeholder="Inserisci un titolo"
                type="text"
                aria-label="Titolo"
                aria-describedby="title"
                value={article.title}
                onChange={e => handleInputChange("title", e.target.value)}
                required
              />
            </InputGroup>
            {/* <Form.Group className="mb-3 d-flex flex-column" controlId="title">
              <Form.Label>formData dell'evento (opzionale)</Form.Label>
              <input type="date" value={article.date} onChange={e => handleInputChange("date", e.target.value)} />
            </Form.Group> */}
          </Col>
          <Col lg="3">
            <Form.Group className="mb-3" controlId="categories">
              <Form.Label>Categorie</Form.Label>
              {/* TODO: get these from backend */}
              <Form.Check
                type="checkbox"
                label="Associazione"
                id="associazione"
                checked={article.categories.includes("associazione")}
                onChange={e => handleCategoriesChange("associazione", e.target.checked)}
              />
              <Form.Check
                type="checkbox"
                label="Concorso cori"
                id="concorsoCori"
                checked={article.categories.includes("concorso cori")}
                onChange={e => handleCategoriesChange("concorso cori", e.target.checked)}
              />
              <Form.Check
                type="checkbox"
                label="Manifestazioni"
                id="manifestazioni"
                checked={article.categories.includes("manifestazioni")}
                onChange={e => handleCategoriesChange("manifestazioni", e.target.checked)}
              />
              <Form.Check
                type="checkbox"
                label="Rassegna stampa"
                id="rassegnaStampa"
                checked={article.categories.includes("rassegna stampa")}
                onChange={e => handleCategoriesChange("rassegna stampa", e.target.checked)}
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
              <div className="w-100">
                <ReactQuill value={article.content} onChange={content => handleInputChange("content", content)} />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Aggiungi un'immagine</Form.Label>
            <Form.Control type="file" style={{ width: "auto" }} onChange={handleImgChange} />
          </Form.Group>
          {/* <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Aggiungi un file pdf</Form.Label>
            <Form.Control
              type="file"
              style={{ width: "auto" }}
              onChange={e => handleInputChange("pdf", e.target.value)}
            />
          </Form.Group> */}
        </Row>
        {/* <Button variant="danger" type="button" onClick={() => setShowPreview(true)}>
          Anteprima
        </Button> */}

        <Button variant="danger" type="submit">
          Aggiungi articolo
        </Button>
      </Form>
      {/* {showPreview && (
        <Modal show={showPreview} fullscreen={true} onHide={() => setShowPreview(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Anteprima</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Article />
          </Modal.Body>
        </Modal>
      )} */}
      <OutcomeToast showToast={showOutcomeToast} />
    </>
  );
}
