import { Button } from "react-bootstrap";

interface IArticleCategoriesProps {
  categories: string[];
}

export default function ArticleCategories({ categories }: IArticleCategoriesProps) {
  return (
    <>
      {categories.map(category => (
        <Button key={category} variant="danger" size="sm" className="category me-1 mb-2 py-0">
          {category}
        </Button>
      ))}
    </>
  );
}
