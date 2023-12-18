import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { Collapse, InputGroup, ListGroup, Modal } from "react-bootstrap";
import { IArticlesApiResponse } from "../../interfaces/IArticleApi";
import SingleFilteredResult from "../filtered-results/SingleFilteredResult";
import { useLocation, useNavigate } from "react-router";
import withGet from "../helpers/withGet";
import { IWithGetProps } from "../../interfaces/IWithGetProps";

function Search({ isLoading, setIsLoading, error, setError }: IWithGetProps) {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [foundArticles, setFoundArticles] = useState<IArticlesApiResponse | null>(null);
  const [lgShow, setLgShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      return;
    }
    setIsLoading(true);
    setSearch(query);
    const fetchUrl = `${process.env.REACT_APP_API_URL}/articoli/search?q=${query}`;
    try {
      const re = await fetch(fetchUrl);
      if (re.ok) {
        const data = await re.json();
        setFoundArticles(data);
        setLgShow(true);
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
      setQuery("");
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setLgShow(false);
  }, [location.search]);
  return (
    <>
      <Form className="ms-auto mt-2 mb-3 my-md-0" onSubmit={handleSubmit}>
        <Row>
          <Col xs="auto">
            <InputGroup>
              {/* // todo advanced search */}
              <Form.Control
                type="search"
                value={query}
                onChange={handleChange}
                placeholder="Cerca qualcosa ..."
                className="mr-sm-2 navbar-search"
                // onClick={() => setShowDropdown(true)}
                // onBlur={() => setShowDropdown(false)}
              />
              {/* <Collapse in={showDropdown}>
                <ListGroup className="position-absolute" style={{ top: "100%", width: "100%" }}>
                  <ListGroup.Item>Ricerca avanzata</ListGroup.Item>
                </ListGroup>
              </Collapse> */}

              <InputGroup.Text className="search-icon" onClick={handleSubmit}>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
            </InputGroup>
          </Col>
          {/* <Col xs="auto">
                  <Button type="submit" variant='danger'>Cerca</Button>
                </Col> */}
        </Row>
      </Form>
      {/* // todo clicking on articletagcategories doesnt close modal if url doesnt change */}
      <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton className="px-4">
          <Modal.Title id="example-modal-sizes-title-lg">{`Risultati per "${search}"`}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4">
          {foundArticles?.content.map(article => {
            return (
              <div
                className="my-4"
                key={article.id}
                // todo aweful
                onClick={() => navigate(`articoli/${article.id}`)}
              >
                <SingleFilteredResult
                  key={article.id}
                  imgSrc={article.img[0]}
                  date={article.date}
                  author={article.author.signature}
                  tags={article.tags.map(tag => tag.name)}
                  categories={article.categories.map(category => category.name)}
                  title={article.title}
                  content={article.content}
                  articleId={article.id}
                />
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default withGet(Search);
