import { Placeholder } from "react-bootstrap";

export default function ArticleDateAuthorTagPlaceholder() {
  return (
    <div className="d-flex flex-wrap  date-author-tags">
      <Placeholder as="p" animation="glow" className="mb-0">
        <Placeholder style={{ width: "18em" }} />
      </Placeholder>
    </div>
  );
}
