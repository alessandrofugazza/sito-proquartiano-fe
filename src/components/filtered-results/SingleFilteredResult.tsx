import { Button, Card, Col, Row } from "react-bootstrap";
import { IArticlePreviewProps } from "../../interfaces/IArticlePreviewProps";
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
}: IArticlePreviewProps) {
  if (!imgSrc) {
    imgSrc = defaultImg;
  }
  const navigate = useNavigate();
  // ? link or navigate
  return (
    <Col xs={12}>
      {/* // todo responsive cahnges to img top */}
      <Card
        className="flex-row shadow single-filtered-result"
        style={{ height: "210px" }}
        onClick={() => navigate(`${articleId}`)}
      >
        <Col className="d-flex" xs={2}>
          <Card.Img
            variant="top"
            src={imgSrc}
            className="img-fluid "
            style={{ objectFit: "contain", padding: "10px" }}
            // style={{ objectFit: "contain", padding: "10px", width: "18%" }}
          />
        </Col>
        <Col xs={10} className="d-flex">
          <Card.Body className="d-flex flex-column ">
            <Card.Title>{title}</Card.Title>
            <ArticleCategories categories={categories} />
            <ArticleDateAuthorTag date={date} author={author} tags={tags} />
            <Card.Text as="div" className="my-1">
              {/* // todo understand what this style does */}
              <div style={{ whiteSpace: "pre-line" }}>{stripHtml(description)}</div>
            </Card.Text>
            <div className="mt-auto text-end">
              <Button variant="danger" size="sm" className="navigation-button">
                Leggi tutto
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Card>
    </Col>
  );
}
