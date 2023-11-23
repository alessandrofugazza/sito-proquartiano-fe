import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/HomeCard.scss";
import ArticleDateAuthorTag from "../shared-components/ArticleDateAuthorTag";
import ArticleCategories from "../shared-components/ArticleCategories";
import { useNavigate } from "react-router-dom";

interface HomeCardProps {
  imgSrc: string;
  categories: string[];
  title: string;
  date: string;
  author: string;
  tags: string[];
  description: string;
  articleId: string;
}

function HomeCard({ imgSrc, categories, title, date, author, tags, description, articleId }: HomeCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="shadow">
      <Card.Img variant="top" src={imgSrc} className="img-fluid" style={{ maxHeight: "400px", objectFit: "contain" }} />
      <Card.Body>
        <ArticleCategories categories={categories} />
        <Card.Title className="my-2">{title}</Card.Title>
        <ArticleDateAuthorTag date={date} author={author} tags={tags} />
        <Card.Text className="my-4">{description}</Card.Text>
        <div className="text-end">
          <Button variant="danger" size="sm" onClick={() => navigate(`/articles/${articleId}`)}>
            Leggi tutto
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;
