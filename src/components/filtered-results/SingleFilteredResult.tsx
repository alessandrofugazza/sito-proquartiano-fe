import { Button, Card, Col, Row } from "react-bootstrap";
import { IArticleProps } from "../../interfaces/IArticleProps";
import ArticleCategories from "../shared-components/ArticleCategories";
import ArticleDateAuthorTag from "../shared-components/ArticleDateAuthorTag";
import { Link, useNavigate } from "react-router-dom";
// import defaultImg from "../../assets/img/logo.png";
import defaultImg from "../../logo.png";
import "../../styles/SingleFilteredResult.scss";

// todo understand wtf is going on here
const stripHtml = (htmlString: string) => {
  const strippedString = htmlString
    .replace(/<\/h[1-6]>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<p>/gi, "")
    .replace(/<[^>]+>/g, "");

  return strippedString;
};

export default function SingleFilteredResult({
  imgSrc,
  categories,
  title,
  date,
  author,
  tags,
  description,
  articleId,
}: IArticleProps) {
  const navigate = useNavigate();
  if (!imgSrc) {
    imgSrc = defaultImg;
  }

  // ? link or navigate
  return (
    <Col xs={12}>
      {/* // todo responsive cahnges to img top */}
      <Row>
        <Card className="flex-row shadow single-filtered-result" style={{ height: "200px" }}>
          <Col className="d-flex" xs={2}>
            <Link className="d-flex" to={`/articoli/${articleId}`}>
              <Card.Img
                variant="top"
                src={imgSrc}
                className="img-fluid "
                style={{ objectFit: "contain", padding: "10px" }}
                // style={{ objectFit: "contain", padding: "10px", width: "18%" }}
              />
            </Link>
          </Col>
          <Col xs={10} className="d-flex">
            <Card.Body className="d-flex flex-column ">
              <Card.Title>
                <Link to={`/articoli/${articleId}`}>{title}</Link>
              </Card.Title>
              <ArticleCategories categories={categories} />
              <ArticleDateAuthorTag date={date} author={author} tags={tags} />
              <Card.Text as="div">
                {/* todo understand what this style does */}
                <div style={{ whiteSpace: "pre-line" }}>{stripHtml(description)}</div>
              </Card.Text>
              <div className="mt-auto text-end">
                <Link to={`/articoli/${articleId}`}>
                  <Button variant="danger" size="sm">
                    Leggi tutto
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Col>
        </Card>
      </Row>
    </Col>
  );
}
