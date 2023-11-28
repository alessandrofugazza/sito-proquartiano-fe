import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/HomeCard.scss";
import ArticleDateAuthorTag from "../shared-components/ArticleDateAuthorTag";
import ArticleCategories from "../shared-components/ArticleCategories";
import { useNavigate } from "react-router-dom";
import { IArticleProps } from "../../interfaces/IArticleProps";
import defaultImg from "../../logo.png";

function HomeCard({ imgSrc, categories, title, date, author, tags, description, articleId }: IArticleProps) {
  const navigate = useNavigate();
  if (!imgSrc) {
    imgSrc = defaultImg;
  }
  return (
    <Card className="shadow h-100">
      <Card.Img variant="top" src={imgSrc} className="img-fluid" style={{ maxHeight: "400px", objectFit: "contain" }} />
      <Card.Body>
        <ArticleCategories categories={categories} />
        <Card.Title className="my-2">{title}</Card.Title>
        <ArticleDateAuthorTag date={date} author={author} tags={tags} />
        <Card.Text className="my-4">
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </Card.Text>
        <div className="text-end">
          <Button variant="danger" size="sm" onClick={() => navigate(`/articoli/${articleId}`)}>
            Leggi tutto
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;
