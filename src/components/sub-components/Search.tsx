import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { IArticlesApiResponse } from "../../interfaces/IArticleApi";

export default function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [foundArticles, setFoundArticles] = useState<IArticlesApiResponse | null>(null);
  const [lgShow, setLgShow] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSearch(query);
    const fetchUrl = `http://localhost:3001/articles/search?q=${query}`;
    try {
      const re = await fetch(fetchUrl);
      if (re.ok) {
        const data = await re.json();
        setFoundArticles(data);
        setLgShow(true);
      } else {
        setHasError(true);
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form className="ms-auto" onSubmit={handleSubmit}>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="Cerca qualcosa ..."
              className=" mr-sm-2"
            />
          </Col>
          {/* <Col xs="auto">
                  <Button type="submit" variant='danger'>Cerca</Button>
                </Col> */}
        </Row>
      </Form>
      <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">{`Risultati per "${search}"`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {foundArticles?.content.map(article => {
            return <p key={article.id}>{article.title}</p>;
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}
