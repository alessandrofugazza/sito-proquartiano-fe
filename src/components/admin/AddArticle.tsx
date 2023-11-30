import React, { useEffect, useRef, useState } from "react";
import { CloseButton, Col, InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Article from "../Article";
import OutcomeToast from "../shared-components/OutcomeToast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/AddArticle.scss";

interface IArticlePostBody {
  title: string;
  eventDate: string;
  content: string;
  categories: string[];
  tags: string[];
  section: string;
}

interface IValidation {
  title: boolean;
  // date: boolean;
  content: boolean;
  categories: boolean;
}

export default function AddArticle() {
  const [hasAlert, setHasAlert] = useState(false);
  const [alert, setAlert] = useState({ message: "", status: "", variant: "success" });
  const [showPreview, setShowPreview] = useState(false);
  const [article, setArticle] = useState<IArticlePostBody>({
    title: "",
    eventDate: "",
    content: "",
    categories: [],
    tags: [],
    section: "",
  });
  const [img, setImg] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [newTag, setNewTag] = useState("");
  const [validated, setValidated] = useState<IValidation>({
    title: false,
    content: false,
    categories: false,
  });
  const [showOutcomeToast, setShowOutcomeToast] = useState(false);

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

  const validationCheck = () => {
    const isTitleBlank = article.title.trim().length === 0;
    if (isTitleBlank) {
      window.alert("title ng");
      setValidated({ ...validated, title: false });
      return;
    }
    setValidated({ ...validated, title: true });
    const isContentValid = article.content.trim().length > 0 || img !== null || pdf !== null;
    if (!isContentValid) {
      window.alert("content ng");
      setValidated({ ...validated, content: false });
      return;
    }
    setValidated({ ...validated, content: true });
    const isCategoriesEmpty = article.categories.length === 0;
    if (isCategoriesEmpty) {
      window.alert("categories ng");
      setValidated({ ...validated, categories: false });
      return;
    }
    setValidated({ ...validated, categories: true });
  };

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

  // todo multiple images handling
  // todo same function for both
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0]);
    } else {
      setImg(null);
    }
  };
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPdf(e.target.files[0]);
    } else {
      setPdf(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    validationCheck();

    console.log("saved");

    const formData = new FormData();
    formData.append("article", JSON.stringify(article));
    if (img) {
      formData.append("img", img);
    }
    if (pdf) {
      formData.append("pdf", pdf);
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
        setShowOutcomeToast(true);
        setTimeout(() => setShowOutcomeToast(false), 3000);
        setArticle({
          title: "",
          content: "",
          eventDate: "",
          categories: [],
          tags: [],
          section: "",
        });
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
      <Form onSubmit={handleSubmit} className="">
        <Row className="mb-5">
          <Col lg="6" className="d-flex flex-column gap-2">
            <InputGroup className="mb-3">
              <InputGroup.Text id="title">Titolo</InputGroup.Text>
              <Form.Control
                placeholder="Inserisci un titolo"
                type="text"
                aria-label="Titolo"
                aria-describedby="title"
                value={article.title}
                onChange={e => handleInputChange("title", e.target.value)}
                id="form-title"
                className={validated.title ? "validated" : "invalid"}
              />
            </InputGroup>
            <Form.Group className="mb-3 d-flex flex-column" controlId="title">
              <Form.Label>Data dell'evento (opzionale)</Form.Label>
              <input
                type="date"
                value={article.eventDate}
                onChange={e => handleInputChange("eventDate", e.target.value)}
              />
            </Form.Group>
            <Form.Label className="m-0">Sezione (opzionale)</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={article.section}
              onChange={e => handleInputChange("section", e.target.value)}
            >
              <option>Nessuna</option>
              <option>Mercatino dei libri</option>
              <option>Sagra di Quartiano</option>
              <option>Concorso corale</option>
            </Form.Select>
          </Col>
          <Col lg="3">
            <Form.Group className="mb-3 mt-md-3" controlId="categories">
              <Form.Label>Categorie</Form.Label>
              {/* TODO: get these from backend */}
              <Form.Check
                type="checkbox"
                label="Associazione"
                id="associazione"
                checked={article.categories.includes("associazione")}
                onChange={e => handleCategoriesChange("associazione", e.target.checked)}
                className={validated.categories ? "validated" : "invalid"}
              />
              <Form.Check
                type="checkbox"
                label="Concorso cori"
                id="concorsoCori"
                checked={article.categories.includes("concorso cori")}
                onChange={e => handleCategoriesChange("concorso cori", e.target.checked)}
                className={validated.categories ? "validated" : "invalid"}
              />
              <Form.Check
                type="checkbox"
                label="Manifestazioni"
                id="manifestazioni"
                checked={article.categories.includes("manifestazioni")}
                onChange={e => handleCategoriesChange("manifestazioni", e.target.checked)}
                className={validated.categories ? "validated" : "invalid"}
              />
              <Form.Check
                type="checkbox"
                label="Rassegna stampa"
                id="rassegnaStampa"
                checked={article.categories.includes("rassegna stampa")}
                onChange={e => handleCategoriesChange("rassegna stampa", e.target.checked)}
                className={validated.categories ? "validated" : "invalid"}
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
                  <CloseButton className="ms-2" onClick={() => handleRemoveTag(tag)} />
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
                <ReactQuill
                  value={article.content}
                  onChange={content => handleInputChange("content", content)}
                  modules={modules}
                  className={validated.content ? "validated" : "invalid"}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Aggiungi un'immagine</Form.Label>
            <Form.Control
              type="file"
              style={{ width: "auto" }}
              onChange={handleImgChange}
              className={validated.content ? "validated" : "invalid"}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Aggiungi un file pdf</Form.Label>
            <Form.Control
              type="file"
              style={{ width: "auto" }}
              onChange={handlePdfChange}
              className={validated.content ? "validated" : "invalid"}
            />
          </Form.Group>
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
