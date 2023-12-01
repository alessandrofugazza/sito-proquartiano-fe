import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/HomeCard.scss";
import ArticleDateAuthorTag from "../shared-components/ArticleDateAuthorTag";
import ArticleCategories from "../shared-components/ArticleCategories";
import { useNavigate } from "react-router-dom";
import { IArticleProps } from "../../interfaces/IArticleProps";
import defaultImg from "../../assets/img/default-img.png";

const stripHtml = (htmlString: string) => {
  const strippedString = htmlString
    .replace(/<\/h[1-6]>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<p>/gi, "")
    .replace(/<[^>]+>/g, "");

  return strippedString;
};

function HomeCard({ imgSrc, categories, title, date, author, tags, description, articleId }: IArticleProps) {
  const navigate = useNavigate();
  if (!imgSrc) {
    imgSrc = defaultImg;
  }
  return (
    <Card className="shadow h-100">
      <Card.Img
        variant="top"
        src={imgSrc}
        className={`img-fluid p-2 border-bottom ${imgSrc === defaultImg ? "default-img" : ""}`}
      />
      <Card.Body className="d-flex flex-column">
        <ArticleCategories categories={categories} />
        <Card.Title className="my-2">{title}</Card.Title>
        <ArticleDateAuthorTag date={date} author={author} tags={tags} />
        <Card.Text as="div" className="my-3">
          <div style={{ whiteSpace: "pre-line" }}>{stripHtml(description).trim()}</div>
        </Card.Text>
        <div className="text-end mt-auto">
          <Button variant="danger" size="sm" onClick={() => navigate(`/articoli/${articleId}`)}>
            Leggi tutto
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;
