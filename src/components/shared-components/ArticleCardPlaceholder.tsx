import { Card, Placeholder, PlaceholderButton } from "react-bootstrap";
import placeholder from "../../assets/img/placeholder.png";
import ArticleCategoriesPlaceholder from "./ArticleCategoriesPlaceholder";
import ArticleDateAuthorTagPlaceholder from "./ArticleDateAuthorTagPlaceholder";

export default function ArticleCardPlaceholder() {
  return (
    <Card className="shadow h-100 article-card placeholder-container">
      <Placeholder animation="glow" className="img-fluid p-2 border-bottom">
        <Placeholder xs={12} className=" placeholder-img" />
      </Placeholder>
      <Card.Body className="d-flex flex-column">
        <ArticleCategoriesPlaceholder />
        <Placeholder as={Card.Title} className="my-2" animation="glow">
          {/* // ^ tf are all these xs, are they necessary? */}
          <Placeholder xs={6} />
        </Placeholder>
        <ArticleDateAuthorTagPlaceholder />
        <Placeholder as={Card.Text} animation="glow" className="mt-3 mb-4">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
          <Placeholder xs={8} />
        </Placeholder>
        <div className="text-end mt-auto">
          <Placeholder.Button variant="danger" className="navigation-button btn-sm" style={{ width: "86px" }} />
        </div>
      </Card.Body>
    </Card>
  );
}
