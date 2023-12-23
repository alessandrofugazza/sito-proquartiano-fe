import { Button, Card, Col, Placeholder, Row } from "react-bootstrap";
import { IArticlePreviewProps } from "../../interfaces/IArticlePreviewProps";
import ArticleCategories from "../shared-components/ArticleCategories";
import ArticleDateAuthorTag from "../shared-components/ArticleDateAuthorTag";
import { Link, useNavigate } from "react-router-dom";
// import defaultImg from "../../assets/img/logo.png";
import defaultImg from "../../logo.png";
import "../../styles/SingleFilteredResult.scss";
import ArticleCategoriesPlaceholder from "../shared-components/ArticleCategoriesPlaceholder";
import ArticleDateAuthorTagPlaceholder from "../shared-components/ArticleDateAuthorTagPlaceholder";

export default function SingleFilteredResultPlaceholder() {
  return (
    <Col xs={12} className="placeholder-container">
      <Card className="flex-row shadow single-filtered-result" style={{ height: "210px" }}>
        <Placeholder xs={2} animation="glow" className="img-fluid p-2 border-bottom" style={{ padding: "10px" }}>
          <Placeholder xs={12} className="placeholder-img h-100" />
        </Placeholder>
        <Col xs={10} className="d-flex">
          <Card.Body className="d-flex flex-column ">
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <ArticleCategoriesPlaceholder />
            <ArticleDateAuthorTagPlaceholder />
            <Placeholder as={Card.Text} animation="glow" className="mt-3 mb-4">
              <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
              <Placeholder xs={8} />
            </Placeholder>
            <div className="text-end mt-auto">
              <Placeholder.Button variant="danger" className="navigation-button btn-sm" style={{ width: "86px" }} />
            </div>
          </Card.Body>
        </Col>
      </Card>
    </Col>
  );
}
