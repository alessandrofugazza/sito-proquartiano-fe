import React, { useEffect, useRef, useState } from "react";
import { Alert, CloseButton, Col, Collapse, Image, InputGroup, ListGroup, Modal, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Article from "../Article";
import OutcomeToast from "../shared-components/OutcomeToast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/AddArticle.scss";
import { IArticlePostBody } from "../../interfaces/IArticlePostBody";
import { useParams } from "react-router";
import placeholder from "../../assets/img/placeholder.png";
import { useDispatch } from "react-redux";
import { SET_PREVIEW } from "../../redux/actions";
import PdfPreview from "../helpers/PdfPreview";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import it from "date-fns/locale/it";
import Compressor from "compressorjs";

import "react-datepicker/dist/react-datepicker.css";
import FacebookShare from "./FacebookShare";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
registerLocale("it", it);
setDefaultLocale("it");

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

interface IArticlePostBodyAndFiles extends IArticlePostBody {
  img: File[];
  pdf: File[];
}

// ^ this component is a mess
// todo fix validation
// todo fix validation clear
export default function AddArticle() {
  // const handleAddImg = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newFiles = Array.from(e.target.files);
  //   const updatedFiles = [...img, ...newFiles];
  //   setImg(updatedFiles);
  // };
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const handleRemoveImg = (index: number) => {
    const updatedImages = img.filter((_, i) => i !== index);
    setImg(updatedImages);
  };
  const handleRemovePdf = (index: number) => {
    const updatedPdfs = pdf.filter((_, i) => i !== index);
    setPdf(updatedPdfs);
  };

  // let hasAttemptedSubmit = false;
  const params = useParams();
  const [newArticleId, setNewArticleId] = useState("");
  const [hasError, setHasError] = useState(false);
  const [incomingArticle, setIncomingArticle] = useState<IArticlePostBodyAndFiles>({
    title: "",
    eventDate: null,
    content: "",
    categories: [],
    tags: [],
    section: "",
    img: [],
    pdf: [],
  });
  async function fetchImageAsBlob(imageUrl: string) {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const imageBlob = await response.blob();
      return imageBlob;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  }
  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const re = await fetch(`${process.env.REACT_APP_API_URL}/articoli/` + params.id);
        if (re.ok) {
          const data = await re.json();
          const categoryNames = data.categories.map((category: { id: string; name: string }) => category.name);
          const tagNames = data.tags.map((tag: { id: string; name: string }) => tag.name);

          const imgBlobs = data.img
            ? await Promise.all(data.img.map((imgUrl: string) => fetchImageAsBlob(imgUrl)))
            : [];

          const imgFiles = imgBlobs.map((blob, index) => {
            // if (blob) {
            return new File([blob], `image-${index}`, { type: blob.type });
            // }
            // return null;
          });
          // .filter(file => file !== null);
          const pdfBlobs = data.pdf
            ? await Promise.all(data.pdf.map((pdfUrl: string) => fetchImageAsBlob(pdfUrl)))
            : [];

          const pdfFiles = pdfBlobs.map((blob, index) => {
            // if (blob) {
            return new File([blob], `pdf-${index}`, { type: blob.type });
            // }
            // return null;
          });
          // .filter(file => file !== null);

          // const imgFiles = await data.img.map((imgUrl: string) => {
          //   const imgBlob = fetchImageAsBlob(imgUrl);
          //   const imgFile = new File([imgBlob!], imgUrl, { type: imgBlob!.type });
          //   return imgFile;
          // });

          setIncomingArticle({
            title: data.title || "",
            eventDate: new Date(data.eventDate) || null,
            content: data.content || "",
            categories: categoryNames || [],
            tags: tagNames || [],
            section: data.section || "",
            img: imgFiles || [],
            pdf: pdfFiles || [],
          });
        } else {
          setHasError(true);
        }
      } catch (error) {
        console.log(error);
        setHasError(true);
      } finally {
        // setIsLoading(false);
      }
    };
    if (params.id) {
      fetchArticleData();
    }
  }, [params.id]);
  const dispatch = useDispatch();
  const setPreview = () => {
    console.log(img);
    dispatch({
      type: SET_PREVIEW,
      payload: {
        title: article.title,
        author: localStorage.getItem("username"),
        date: new Date().toISOString(),
        eventDate: article.eventDate,
        content: article.content,
        section: article.section,
        categories: article.categories,
        tags: article.tags,
        img: img.map(img => URL.createObjectURL(img)),
        pdf: pdf.map(pdf => URL.createObjectURL(pdf)),
      },
    });
  };
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [hasAlert, setHasAlert] = useState(false);
  const [alert, setAlert] = useState({ message: "", status: "", variant: "success" });
  const [showPreview, setShowPreview] = useState(false);
  const [article, setArticle] = useState<IArticlePostBody>({
    title: "",
    eventDate: null,
    content: "",
    categories: [],
    tags: [],
    section: "",
  });
  const [img, setImg] = useState<File[]>([]);
  const [pdf, setPdf] = useState<File[]>([]);
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

  const handleInputChange = (propertyName: string, propertyValue: string | string[] | Date | null) => {
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
    if (e.target.files && e.target.files.length === 0) {
      return;
    }
    if (e.target.files && e.target.files.length > 0) {
      if (hasAttemptedSubmit && validated.content === false) {
        setValidated({ ...validated, content: true });
      }
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...img, ...newFiles];
      setImg(updatedFiles);
    } else {
      if (hasAttemptedSubmit && validated.content === true && stripHtml(article.content).length === 0 && pdf === null) {
        setValidated({ ...validated, content: false });
      }
      setImg([]);
    }
  };
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasAttemptedSubmit && validated.content === false) {
      setValidated({ ...validated, content: true });
    }
    if (e.target.files && e.target.files.length > 0) {
      if (hasAttemptedSubmit && validated.content === false) {
        setValidated({ ...validated, content: true });
      }
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...pdf, ...newFiles];
      setPdf(updatedFiles);
    } else {
      if (hasAttemptedSubmit && validated.content === true && stripHtml(article.content).length === 0 && img === null) {
        setValidated({ ...validated, content: false });
      }
      setPdf([]);
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

    // learn
    // todo dont compress if editing article. is it even worth it tho.
    const compressImage = (file: File): Promise<void> => {
      return new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.8,
          success: compressedResult => {
            formData.append("img", compressedResult);
            resolve();
          },
          error: reject,
        });
      });
    };
    const method = params.id ? "PUT" : "POST";

    if (img && img.length > 0) {
      await Promise.all(img.map(file => compressImage(file)));
    }

    // if (img && img.length > 0) {
    //   img.forEach(file => {
    //     // learn
    //     new Compressor(file, {
    //       quality: 0.8,
    //       // convertSize: 0,
    //       success: compressedResult => {
    //         // console.log(img);
    //         // todo handle error?
    //         // setCompressedFile(compressedResult);
    //         formData.append("img", compressedResult);
    //         console.log(compressedResult);
    //       },
    //     });
    //   });
    // }
    if (pdf && pdf.length > 0) {
      pdf.forEach(file => {
        formData.append("pdf", file);
      });
    }

    setShowOutcome(false);
    setIsLoading(true);
    setError({ hasError: false, errorMessage: "" });
    const fetchUrl = `${process.env.REACT_APP_API_URL}/articoli${params.id ? `/${params.id}` : ""}`;
    try {
      // console.log(formData);
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const re = await fetch(fetchUrl, {
        method: `${method}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
        body: formData,
      });
      if (re.ok) {
        const data = await re.json();
        setNewArticleId(data.id);
        // setShowOutcomeToast(true);
        // setTimeout(() => setShowOutcomeToast(false), 3000);
        // todo fix form reset. I HATE THIS
        setArticle({
          title: "",
          content: "",
          eventDate: null,
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
      }, 200);
    } else if (i === 1) {
      setTimeout(() => {
        setArticle(prevArticle => ({
          ...prevArticle,
          categories: incomingArticle.categories,
        }));
        setI(2);
      }, 200);
    } else if (i === 2) {
      setTimeout(() => {
        setArticle(prevArticle => ({
          ...prevArticle,
          tags: incomingArticle.tags,
        }));
        setI(3);
      }, 200);
    } else if (i === 3) {
      setTimeout(() => {
        setArticle(prevArticle => ({
          ...prevArticle,
          eventDate: incomingArticle.eventDate,
        }));
        setI(4);
      }, 200);
    } else if (i === 4) {
      setTimeout(() => {
        setArticle(prevArticle => ({
          ...prevArticle,
          section: incomingArticle.section,
        }));
        setI(5);
      }, 200);
    } else if (i === 5) {
      setTimeout(() => {
        setArticle(prevArticle => ({
          ...prevArticle,
          content: incomingArticle.content,
        }));
        setI(6);
      }, 200);
    } else if (i === 6) {
      setTimeout(() => {
        setImg(incomingArticle.img);
        setI(7);
      }, 200);
    } else if (i === 7) {
      setTimeout(() => {
        setPdf(incomingArticle.pdf);
        setI(8);
      }, 200);
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
          console.log(img);
        }}
      >
        a
      </Button> */}
      <Form onSubmit={handleSubmit} className="">
        <Row className="mb-5">
          <Col lg="6" className="d-flex flex-column gap-2">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="form-title" className="fw-semibold" id="title">
                Titolo
              </Form.Label>
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
            </Form.Group>
            <hr className="my-0" />
            {/* // todo an overly complicated date picker or at least fix border*/}
            <Form.Group className="my-3 d-flex flex-column" controlId="form-date">
              <Form.Label>
                <span className="fw-semibold">Data dell'evento</span> (opzionale)
              </Form.Label>
              {/* <input
                type="date"
                value={article.eventDate}
                onChange={e => handleInputChange("eventDate", e.target.value)}
                id="form-date"
              /> */}
              <DatePicker
                value={article.eventDate?.toLocaleDateString("it-IT", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
                minDate={new Date()}
                selected={article.eventDate}
                onChange={date => handleInputChange("eventDate", date)}
                className="w-100"
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
          <Form.Group className="mb-4">
            <Form.Label
              className={`fw-semibold ${hasAttemptedSubmit ? (validated.content ? "validated" : "invalid") : ""}`}
            >
              Aggiungi un'immagine
            </Form.Label>
            <Form.Control
              accept=".jpeg, .jpg, .png"
              type="file"
              style={{ width: "auto" }}
              onChange={handleImgChange}
              className="d-none"
              id="custom-img-input"
            />
            <div className="d-flex gap-4 flex-wrap img-input-label" style={{ width: "fit-content" }}>
              {/* <i className="bi bi-plus-circle-fill text-success"></i> */}
              {img.map((file, index) => (
                <label
                  onClick={e => {
                    e.stopPropagation();
                    handleRemoveImg(index);
                  }}
                  key={file.lastModified}
                  className="file-wrapper"
                >
                  <div className="added-file">
                    <Image
                      src={URL.createObjectURL(file)}
                      thumbnail
                      style={{ height: "250px", width: "190px", objectFit: "contain" }}
                    />
                  </div>
                  <i
                    className="bi bi-dash-circle-fill text-danger fs-2 d-none"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  ></i>
                </label>
              ))}
              <label htmlFor="custom-img-input" className="file-wrapper">
                <div className="placeholder">
                  <Image
                    src={placeholder}
                    thumbnail
                    style={{ height: "250px", width: "190px", borderStyle: "dashed" }}
                  />
                </div>
                {/* // todo ::after? and center this */}
                <i
                  className="bi bi-plus-circle-fill text-success fs-2"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                ></i>
              </label>
            </div>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label
              className={`fw-semibold ${hasAttemptedSubmit ? (validated.content ? "validated" : "invalid") : ""}`}
            >
              Aggiungi un file pdf
            </Form.Label>
            <Form.Control
              className="d-none"
              accept=".pdf"
              type="file"
              style={{ width: "auto" }}
              onChange={handlePdfChange}
              id="custom-pdf-input"
            />
            <div className="d-flex gap-4 flex-wrap img-input-label" style={{ width: "fit-content" }}>
              {pdf.map((file, index) => (
                // <Image
                //   key={URL.createObjectURL(file)}
                //   src={URL.createObjectURL(file)}
                //   alt={`preview-${index}`}
                //   thumbnail
                //   style={{ height: "250px", width: "auto" }}
                // />
                <label
                  onClick={e => {
                    e.stopPropagation();
                    handleRemovePdf(index);
                  }}
                  key={file.lastModified}
                  className="img-thumbnail file-wrapper "
                  style={{ height: "250px", width: "190px" }}
                >
                  <div className="added-file">
                    <PdfPreview file={file} />
                  </div>
                  <i
                    className="bi bi-dash-circle-fill text-danger fs-2 d-none"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  ></i>
                </label>
              ))}
              <label htmlFor="custom-pdf-input" className="file-wrapper">
                <div className="placeholder">
                  <Image
                    src={placeholder}
                    thumbnail
                    style={{ height: "250px", width: "190px", borderStyle: "dashed" }}
                  />
                </div>
                <i
                  className="bi bi-plus-circle-fill text-success fs-2"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                ></i>
              </label>
            </div>
          </Form.Group>
        </Row>

        <div className="mt-3 d-flex gap-2">
          <Button
            variant="danger"
            type="button"
            className="navigation-button"
            onClick={() => {
              setPreview();
              window.open("/articoli/preview", "_blank");
              // setShowPreview(true);
            }}
          >
            Anteprima
          </Button>
          {/* // todo add confirm */}
          {/* // todo style the btn */}
          {
            <Button variant="danger" type="submit" className="navigation-button">
              {params.id ? "Salva modifiche" : "Aggiungi articolo"}
            </Button>
          }
        </div>
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
        <>
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
          {!error.hasError && (
            <div className="text-center">
              {/* // todo is this even working */}
              <FacebookShare shareUrl={`${process.env.REACT_APP_API_URL}/articoli/${newArticleId}`} />
            </div>
          )}
        </>
      )}
      {/* <OutcomeToast showToast={showOutcomeToast} isSuccess={true} /> */}
    </>
  );
}
