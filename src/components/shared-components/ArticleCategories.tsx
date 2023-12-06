import { Button } from "react-bootstrap";
import { useNavigate, useNavigation } from "react-router-dom";

interface IArticleCategoriesProps {
  categories: string[];
}

const categoryToVariant = (category: string) => {
  switch (category.toLowerCase()) {
    case "concorso cori":
      return "primary";
    case "rassegna stampa":
      return "success";
    case "manifestazioni":
      return "warning";
    case "associazione":
      return "danger";
    default:
      return "danger";
  }
};

export default function ArticleCategories({ categories }: IArticleCategoriesProps) {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      {categories.map(category => (
        <Button
          key={category}
          variant={categoryToVariant(category)}
          size="sm"
          className="category me-1 mb-2"
          style={{ fontSize: "0.65rem", width: "fit-content" }}
          onClick={e => {
            e.stopPropagation();
            navigate(`/articoli?categoria=${category}`);
          }}
        >
          {category.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
