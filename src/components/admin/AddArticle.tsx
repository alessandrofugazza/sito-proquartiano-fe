import React, { useEffect, useRef, useState } from "react";
import { Alert, CloseButton, Col, Collapse, InputGroup, ListGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Article from "../Article";
import OutcomeToast from "../shared-components/OutcomeToast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/AddArticle.scss";
import { IArticlePostBody } from "../../interfaces/IArticlePostBody";
import { useParams } from "react-router";

interface IValidation {
  title: boolean;
  // date: boolean;
  content: boolean;
  categories: boolean;
}

const stripHtml = (html: string) => {
  // const temporalDivElement = document.createElement("div");
  // temporalDivElement.innerHTML = html;
  // const textOnly = temporalDivElement.textContent || temporalDivElement.innerText || "";
  // return textOnly.replace(/\s+/g, " ").trim();
  const strippedContent = html.replace(/<[^>]*>?/gm, "");

  // Check if the remaining string is just whitespace or empty
  return strippedContent.trim();
};

// ^ this component is a mess
export default function AddArticle() {
  // let hasAttemptedSubmit = false;
  const params = useParams();
  const [hasError, setHasError] = useState(false);
  const [incomingArticle, setIncomingArticle] = useState<IArticlePostBody>({
    title: "",
    eventDate: "",
    content: "",
    categories: [],
    tags: [],
    section: "",
  });
  // ! sometimes input fields get emptied on load
  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const re = await fetch(`${process.env.REACT_APP_API_URL}/articoli/` + params.id);
        if (re.ok) {
          const data = await re.json();
          const categoryNames = data.categories.map((category: { id: string; name: string }) => category.name);
          const tagNames = data.tags.map((tag: { id: string; name: string }) => tag.name);
          setIncomingArticle({
            title: data.title || "",
            eventDate: data.eventDate || "",
            content: data.content || "",
            categories: categoryNames || [],
            tags: tagNames || [],
            section: data.section || "",
          });
        } else {
          setHasError(true);
        }
      } catch (error) {
        setHasError(true);
      } finally {
        // setIsLoading(false);
      }
    };
    if (params.id) {
      fetchArticleData();
    }
  }, [params.id]);

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
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
  // const [showOutcomeToast, setShowOutcomeToast] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      // [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ],
  };

  const titleValidationCheck = () => {
    const isTitleBlank = article.title.trim().length === 0;
    if (isTitleBlank) {
      setValidated({ ...validated, title: false });
      return false;
    }
    setValidated({ ...validated, title: true });
    return true;
  };

  const contentValidationCheck = () => {
    const isContentValid = article.content.trim().length > 0 || img !== null || pdf !== null;
    if (!isContentValid) {
      setValidated({ ...validated, content: false });
      return false;
    }
    setValidated({ ...validated, content: true });
    return true;
  };

  const categoriesValidationCheck = () => {
    const isCategoriesEmpty = article.categories.length === 0;
    if (isCategoriesEmpty) {
      setValidated({ ...validated, categories: false });
      return false;
    }
    setValidated({ ...validated, categories: true });
    return true;
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
      if (hasAttemptedSubmit && validated.content === false) {
        setValidated({ ...validated, content: true });
      }
      setImg(e.target.files[0]);
    } else {
      if (hasAttemptedSubmit && validated.content === true && stripHtml(article.content).length === 0 && pdf === null) {
        setValidated({ ...validated, content: false });
      }
      setImg(null);
    }
  };
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (hasAttemptedSubmit && validated.content === false) {
        setValidated({ ...validated, content: true });
      }
      setPdf(e.target.files[0]);
    } else {
      if (hasAttemptedSubmit && validated.content === true && stripHtml(article.content).length === 0 && img === null) {
        setValidated({ ...validated, content: false });
      }
      setPdf(null);
    }
  };

  const [mostUsedTags, setMostUsedTags] = useState([]);

  // todo fetch with pagination
  const fetchMostUsedTags = async () => {
    const re = await fetch(`${process.env.REACT_APP_API_URL}/tags/most-used`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
      },
    });
    const data = await re.json();
    setMostUsedTags(data);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    hasError: false,
    errorMessage: "",
  });
  useEffect(() => {
    fetchMostUsedTags();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hasAttemptedSubmit) {
      setHasAttemptedSubmit(true);
    }

    const isTitleValid = titleValidationCheck();
    const isContentValid = contentValidationCheck();
    const areCategoriesValid = categoriesValidationCheck();

    setValidated({
      title: isTitleValid,
      content: isContentValid,
      categories: areCategoriesValid,
    });

    if (!isTitleValid || !isContentValid || !areCategoriesValid) {
      setError({ hasError: true, errorMessage: "" });
      setShowOutcome(true);
      return;
    }

    const formData = new FormData();
    formData.append("article", JSON.stringify(article));
    if (img) {
      formData.append("img", img);
    }
    if (pdf) {
      formData.append("pdf", pdf);
    }
    setShowOutcome(false);
    setIsLoading(true);
    setError({ hasError: false, errorMessage: "" });
    try {
      const re = await fetch(`${process.env.REACT_APP_API_URL}/articoli`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
        body: formData,
      });
      if (re.ok) {
        console.log("done");
        // setShowOutcomeToast(true);
        // setTimeout(() => setShowOutcomeToast(false), 3000);
        // todo fix form reset. I HATE THIS
        setArticle({
          title: "",
          content: "",
          eventDate: "",
          categories: [],
          tags: [],
          section: "",
        });
        setHasAttemptedSubmit(false);
      } else {
        setError({
          hasError: true,
          errorMessage: `Error ${re.status}: ${re.statusText}`,
        });
      }
    } catch (error) {
      setError({
        hasError: true,
        errorMessage: "Errore nel reperimento dati.",
      });
    } finally {
      setIsLoading(false);
      setShowOutcome(true);
    }
  };
  const [showOutcome, setShowOutcome] = useState(false);

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

  // todo im going to hell for this
  const [i, setI] = useState(0);
  useEffect(() => {
    load();
  }, [incomingArticle, i]);

  const load = () => {
    if (i === 0) {
      setTimeout(() => {
        setArticle(prevArticle => ({
          ...prevArticle,
          title: incomingArticle.title,
        }));
        setI(1);
      }, 500);
    } else if (i === 1) {
      setTimeout(() => {
        setArticle(prevArticle => ({
          ...prevArticle,
          categories: incomingArticle.categories,
        }));
        setI(2);
      }, 500);
    } else if (i === 2) {
      setTimeout(() => {
        setArticle(prevArticle => ({
          ...prevArticle,
          tags: incomingArticle.tags,
        }));
        setI(3);
      }, 500);
    } else if (i === 3) {
      setTimeout(() => {
        setArticle(prevArticle => ({
          ...prevArticle,
          eventDate: incomingArticle.eventDate,
        }));
        setI(4);
      }, 500);
    } else if (i === 4) {
      setTimeout(() => {
        setArticle(prevArticle => ({
          ...prevArticle,
          section: incomingArticle.section,
        }));
        setI(5);
      }, 500);
    } else if (i === 5) {
      setTimeout(() => {
        setArticle(prevArticle => ({
          ...prevArticle,
          content: incomingArticle.content,
        }));
        setI(6);
      }, 500);
    }
  };

  return (
    <>
      {/* <Button
        onClick={() => {
          // console.log(incomingArticle);
          // load();
          // console.log(i);
          // console.log(article);
        }}
      >
        a
      </Button> */}
      <Form onSubmit={handleSubmit} className="">
        <Row className="mb-5">
          <Col lg="6" className="d-flex flex-column gap-2">
            <InputGroup className="mb-3">
              <InputGroup.Text as="label" htmlFor="form-title" className="fw-semibold" id="title">
                Titolo
              </InputGroup.Text>
              <Form.Control
                placeholder="Inserisci un titolo"
                type="text"
                aria-label="title"
                aria-describedby="title"
                value={article.title}
                onChange={e => {
                  // ^ functions?
                  if (hasAttemptedSubmit && validated.title === false && e.target.value.trim().length > 0) {
                    setValidated({ ...validated, title: true });
                  } else if (hasAttemptedSubmit && validated.title === true && e.target.value.trim().length === 0) {
                    setValidated({ ...validated, title: false });
                  }
                  handleInputChange("title", e.target.value);
                }}
                id="form-title"
                className={hasAttemptedSubmit ? (validated.title ? "validated" : "invalid") : ""}
                autoComplete="off"
              />
            </InputGroup>
            <hr className="my-0" />
            <Form.Group className="my-3 d-flex flex-column" controlId="form-date">
              <Form.Label>
                <span className="fw-semibold">Data dell'evento</span> (opzionale)
              </Form.Label>
              <input
                type="date"
                value={article.eventDate}
                onChange={e => handleInputChange("eventDate", e.target.value)}
                id="form-date"
              />
            </Form.Group>
            <hr className="my-0" />
            <div className="my-3">
              <Form.Label htmlFor="form-section">
                <span className="fw-semibold">Sezione</span> (opzionale)
              </Form.Label>
              <Form.Select
                value={article.section}
                onChange={e => handleInputChange("section", e.target.value)}
                id="form-section"
              >
                <option>Nessuna</option>
                <option>Mercatino dei libri</option>
                <option>Sagra di Quartiano</option>
                <option>Concorso corale</option>
              </Form.Select>
            </div>
            <hr className="d-lg-none my-0" />
          </Col>
          <Col lg="3">
            <Form.Group className="mb-3 mt-3 mt-lg-0" controlId="categories">
              <Form.Label className="fw-semibold">Categorie</Form.Label>
              {/* // TODO: get these from backend */}
              {/* // todo map */}
              <Form.Check
                type="checkbox"
                label="Associazione"
                id="associazione"
                checked={article.categories.includes("associazione")}
                onChange={e => {
                  if (hasAttemptedSubmit && validated.categories === false && e.target.checked === true) {
                    setValidated({ ...validated, categories: true });
                  } else if (
                    hasAttemptedSubmit &&
                    validated.categories === true &&
                    e.target.checked === false &&
                    article.categories.length === 1
                  ) {
                    setValidated({ ...validated, categories: false });
                  }
                  handleCategoriesChange("associazione", e.target.checked);
                }}
                className={`form-category ${
                  hasAttemptedSubmit ? (validated.categories ? "validated" : "invalid") : ""
                }`}
              />
              <Form.Check
                type="checkbox"
                label="Concorso cori"
                id="concorsoCori"
                checked={article.categories.includes("concorso cori")}
                onChange={e => {
                  if (hasAttemptedSubmit && validated.categories === false && e.target.checked === true) {
                    setValidated({ ...validated, categories: true });
                  } else if (
                    hasAttemptedSubmit &&
                    validated.categories === true &&
                    e.target.checked === false &&
                    article.categories.length === 1
                  ) {
                    setValidated({ ...validated, categories: false });
                  }
                  handleCategoriesChange("concorso cori", e.target.checked);
                }}
                className={`form-category ${
                  hasAttemptedSubmit ? (validated.categories ? "validated" : "invalid") : ""
                }`}
              />
              <Form.Check
                type="checkbox"
                label="Manifestazioni"
                id="manifestazioni"
                checked={article.categories.includes("manifestazioni")}
                onChange={e => {
                  if (hasAttemptedSubmit && validated.categories === false && e.target.checked === true) {
                    setValidated({ ...validated, categories: true });
                  } else if (
                    hasAttemptedSubmit &&
                    validated.categories === true &&
                    e.target.checked === false &&
                    article.categories.length === 1
                  ) {
                    setValidated({ ...validated, categories: false });
                  }
                  handleCategoriesChange("manifestazioni", e.target.checked);
                }}
                className={`form-category ${
                  hasAttemptedSubmit ? (validated.categories ? "validated" : "invalid") : ""
                }`}
              />
              <Form.Check
                type="checkbox"
                label="Rassegna stampa"
                id="rassegnaStampa"
                checked={article.categories.includes("rassegna stampa")}
                onChange={e => {
                  if (hasAttemptedSubmit && validated.categories === false && e.target.checked === true) {
                    setValidated({ ...validated, categories: true });
                  } else if (
                    hasAttemptedSubmit &&
                    validated.categories === true &&
                    e.target.checked === false &&
                    article.categories.length === 1
                  ) {
                    setValidated({ ...validated, categories: false });
                  }
                  handleCategoriesChange("rassegna stampa", e.target.checked);
                }}
                className={`form-category ${
                  hasAttemptedSubmit ? (validated.categories ? "validated" : "invalid") : ""
                }`}
              />
            </Form.Group>
            <hr className="d-lg-none mt-4 mb-3" />
          </Col>
          <Col lg="3">
            <Form.Group className="mb-3 position-relative" controlId="tags">
              <Form.Label>
                <span className="fw-semibold">Tags</span> (opzionale)
              </Form.Label>
              <Form.Control
                placeholder="Inserisci un nuovo tag"
                type="text"
                aria-label="Tag"
                aria-describedby="tag"
                value={newTag}
                onChange={handleNewTagChange}
                onKeyDown={addNewTag}
                onClick={() => setShowDropdown(true)}
                onBlur={() => {
                  setTimeout(() => setShowDropdown(false), 50);
                }}
                autoComplete="off"
              />
              <Collapse in={showDropdown}>
                <ListGroup className="position-absolute z-3" style={{ top: "100%", width: "100%" }}>
                  <ListGroup.Item className="fw-semibold px-2 py-1 tag-suggestion-label" style={{ fontSize: "0.8rem" }}>
                    tags più usati &gt;&gt;&gt;
                  </ListGroup.Item>
                  {mostUsedTags.map(tag => (
                    <ListGroup.Item
                      style={{ fontSize: "0.8rem" }}
                      className={`px-2 py-1 tag-suggestion ${article.tags.includes(tag) ? "d-none" : ""}`}
                      key={tag}
                      onClick={() => {
                        setArticle({
                          ...article,
                          tags: [...article.tags, tag],
                        });
                      }}
                    >
                      {tag}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Collapse>
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
        {/* // todo file compression? */}
        <Row className="mb-3">
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="fw-semibold">Contenuto</Form.Label>
              <div className="w-100">
                {/* // ? semibold? */}
                <ReactQuill
                  value={article.content}
                  onChange={content => {
                    if (hasAttemptedSubmit && validated.content === false && stripHtml(content).length > 0) {
                      setValidated({ ...validated, content: true });
                    } else if (
                      hasAttemptedSubmit &&
                      validated.content === true &&
                      stripHtml(content).length === 0 &&
                      img === null &&
                      pdf === null
                    ) {
                      setValidated({ ...validated, content: false });
                    }
                    handleInputChange("content", content);
                  }}
                  modules={modules}
                  className={hasAttemptedSubmit ? (validated.content ? "validated" : "invalid") : ""}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group controlId="formFile" className="mb-4">
            <Form.Label className="fw-semibold">Aggiungi un'immagine</Form.Label>
            <Form.Control
              accept=".jpeg, .jpg, .png"
              type="file"
              style={{ width: "auto" }}
              onChange={handleImgChange}
              className={hasAttemptedSubmit ? (validated.content ? "validated" : "invalid") : ""}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-4">
            <Form.Label className="fw-semibold">Aggiungi un file pdf</Form.Label>
            <Form.Control
              accept=".pdf"
              type="file"
              style={{ width: "auto" }}
              onChange={handlePdfChange}
              className={hasAttemptedSubmit ? (validated.content ? "validated" : "invalid") : ""}
            />
          </Form.Group>
        </Row>
        {/* <Button variant="danger" type="button" onClick={() => setShowPreview(true)}>
          Anteprima
        </Button> */}
        {/* // todo add confirm */}
        {/* // todo style the btn */}
        <Button variant="danger" type="submit" className="mt-3 navigation-button">
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
      {/* // todo add placeholder */}
      {showOutcome && (
        <Alert
          variant={`${error.hasError ? "danger" : "success"}`}
          className="mt-5"
          onClose={() => setShowOutcome(false)}
          dismissible
        >
          <Alert.Heading className="d-flex align-items-center">
            <i className={`bi ${error.hasError ? "bi-x" : "bi-check2"} fs-1 me-3`}></i>
            <span>{error.hasError ? "Errore!" : "Successo!"}</span>
          </Alert.Heading>
          <p>{error.hasError ? "L'operazione non è andata a buon fine" : "Operazione effettuata con successo."}</p>
        </Alert>
      )}
      {/* <OutcomeToast showToast={showOutcomeToast} isSuccess={true} /> */}
    </>
  );
}
