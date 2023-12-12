import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/ArticleCard.scss";
import ArticleDateAuthorTag from "../shared-components/ArticleDateAuthorTag";
import ArticleCategories from "../shared-components/ArticleCategories";
import { useNavigate } from "react-router-dom";
import { IArticlePreviewProps } from "../../interfaces/IArticlePreviewProps";
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

function ArticleCard({ imgSrc, categories, title, date, author, tags, content, articleId }: IArticlePreviewProps) {
  const navigate = useNavigate();
  if (!imgSrc) {
    imgSrc = defaultImg;
  }
  return (
    <Card className={`shadow h-100 article-card `} onClick={() => navigate(`/articoli/${articleId}`)}>
      <Card.Img
        variant="top"
        src={imgSrc}
        className={`img-fluid p-2 border-bottom ${imgSrc === defaultImg ? "default-img" : ""}`}
      />
      <Card.Body className="d-flex flex-column">
        <ArticleCategories categories={categories} />
        <Card.Title className="my-2">{title}</Card.Title>
        <ArticleDateAuthorTag date={date} author={author} tags={tags} />
        <Card.Text as="div" className="mt-3 mb-4">
          <div style={{ whiteSpace: "pre-line" }}>{stripHtml(content).trim()}</div>
        </Card.Text>
        <div className="text-end mt-auto">
          <Button
            variant="danger"
            className="navigation-button"
            size="sm"
            onClick={() => navigate(`/articoli/${articleId}`)}
          >
            Leggi tutto
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ArticleCard;
