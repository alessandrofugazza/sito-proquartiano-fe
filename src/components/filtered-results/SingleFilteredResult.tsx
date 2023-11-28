import { Button, Card, Col } from "react-bootstrap";
import { IArticleProps } from "../../interfaces/IArticleProps";
import ArticleCategories from "../shared-components/ArticleCategories";
import ArticleDateAuthorTag from "../shared-components/ArticleDateAuthorTag";
import { useNavigate } from "react-router-dom";
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

  return (
    <Col xs={12}>
      {/* todo responsive */}
      <Card
        className="flex-row shadow single-filtered-result"
        style={{ height: "200px" }}
        onClick={() => navigate(`/articoli/${articleId}`)}
      >
        <Card.Img
          variant="top"
          src={imgSrc}
          className="img-fluid"
          style={{ objectFit: "contain", padding: "10px" }}
          // style={{ objectFit: "contain", padding: "10px", width: "18%" }}
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title>{title}</Card.Title>
          <ArticleCategories categories={categories} />
          <ArticleDateAuthorTag date={date} author={author} tags={tags} />
          <Card.Text as="div">
            {/* todo understand what this style does */}
            <div style={{ whiteSpace: "pre-line" }}>{stripHtml(description)}</div>
          </Card.Text>
          <div className="mt-auto text-end">
            <Button variant="danger" size="sm" onClick={() => navigate(`/articoli/${articleId}`)}>
              Leggi tutto
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
