import { useEffect, useState } from "react";
import { IArticleApiResponse } from "../../interfaces/IArticleApi";
import { Button, ButtonGroup, Modal, ModalProps } from "react-bootstrap";
import { useNavigate } from "react-router";
import "../../styles/PublishedArticles.scss";

export default function PublishedArticles() {
  const [articlesData, setArticlesData] = useState<IArticleApiResponse[] | null>(null);
  const [fetchPage, setFetchPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const navigate = useNavigate();
  const deleteArticle = async () => {
    const re = await fetch(`${process.env.REACT_APP_API_URL}/articoli/${selectedArticle}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
      },
    });
    if (re.ok) {
      setArticlesData(currentArticles =>
        currentArticles ? currentArticles.filter(article => article.id !== selectedArticle) : []
      );
    }
  };
  const fetchArticles = async () => {
    let fetchUrl = `${process.env.REACT_APP_API_URL}/articoli?autore=${localStorage.getItem(
      "username"
    )}&page=${fetchPage}`;

    const re = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
      },
    });
    const newData = await re.json();
    if (newData.last === true) {
      setIsLastPage(true);
    }
    setArticlesData(oldData => [...(oldData || []), ...newData.content]);
  };
  // useEffect(() => {
  //   fetchArticles();
  // }, []);
  const [selectedArticle, setSelectedArticle] = useState("");
  function MyVerticallyCenteredModal(props: ModalProps) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Conferma</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Sei sicuro di voler effettuare questa operazione?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.onHide}>
            Annulla
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteArticle();
              if (props.onHide) {
                props.onHide();
              }
            }}
          >
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    fetchArticles();
  }, [fetchPage]);
  return (
    <>
      <ButtonGroup className="flex-column">
        {articlesData?.map(article => (
          // todo add tooltips
          <Button
            onClick={() => navigate(`/articoli/${article.id}`)}
            variant="link"
            key={article.id}
            className="text-start d-flex gap-3 align-items-center"
            style={{ height: "2em" }} // ^ fuck
          >
            {article.title}
            <span className="edit-buttons d-flex gap-1 align-items-center">
              <i
                className="bi bi-pencil-square fs-5"
                onClick={e => {
                  e.stopPropagation();
                  navigate(`/admins/articoli/${article.id}`);
                }}
              ></i>
              <i
                className="bi bi-x fs-3"
                onClick={e => {
                  e.stopPropagation();
                  setSelectedArticle(article.id);
                  setModalShow(true);
                }}
              ></i>
            </span>
          </Button>
        ))}
      </ButtonGroup>
      {!isLastPage ? (
        <div className="d-flex mt-5">
          <Button
            className="recent-events-nav-btn mx-auto fs-5"
            variant="link"
            onClick={() => {
              setFetchPage(fetchPage + 1);
            }}
          >
            Carica altro
          </Button>
        </div>
      ) : (
        <div className="d-flex mt-5">
          <span className="recent-events-nav-btn mx-auto fs-5">Fine dei risultati</span>
        </div>
      )}
      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
