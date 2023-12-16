import { Placeholder } from "react-bootstrap";

export default function ArticleCategoriesPlaceholder() {
  return (
    <div className="d-flex">
      <Placeholder.Button
        variant="warning"
        size="sm"
        className="category me-1 mb-2"
        style={{ fontSize: "0.65rem", width: "10em" }}
      />
    </div>
  );
}
