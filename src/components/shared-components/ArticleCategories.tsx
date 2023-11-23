import { Button } from "react-bootstrap";
import { useNavigate, useNavigation } from "react-router-dom";

interface IArticleCategoriesProps {
  categories: string[];
}

export default function ArticleCategories({ categories }: IArticleCategoriesProps) {
  const navigate = useNavigate();
  return (
    <>
      {categories.map(category => (
        <Button
          key={category}
          variant="danger"
          size="sm"
          className="category me-1 mb-2"
          style={{ fontSize: "0.7rem", paddingBlock: "2.5px" }}
          onClick={() => navigate(`/articles/category/${category}`)}
        >
          {category.toUpperCase()}
        </Button>
      ))}
    </>
  );
}
