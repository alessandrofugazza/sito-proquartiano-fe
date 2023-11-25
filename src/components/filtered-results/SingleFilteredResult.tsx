import { Button, Card, Col } from "react-bootstrap";
import { IArticleProps } from "../../interfaces/IArticleProps";
import ArticleCategories from "../shared-components/ArticleCategories";
import ArticleDateAuthorTag from "../shared-components/ArticleDateAuthorTag";
import { useNavigate } from "react-router-dom";
// import defaultImg from "../../assets/img/logo.png";
import defaultImg from "../../logo.png";

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
      <Card className="flex-row shadow " style={{ height: "200px" }}>
        <Card.Img
          variant="top"
          src={imgSrc}
          className="img-fluid w-25"
          style={{ objectFit: "contain", paddingBlock: "10px" }}
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title>{title}</Card.Title>
          <ArticleCategories categories={categories} />
          <ArticleDateAuthorTag date={date} author={author} tags={tags} />
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
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
