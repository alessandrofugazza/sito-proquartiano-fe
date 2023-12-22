import { ListGroup, Placeholder } from "react-bootstrap";

// todo why cant change 2nd placeholder width
export default function UpcomingEventPlaceholder() {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-start " style={{ borderTopWidth: "1px" }}>
      <div className="ms-2 me-auto">
        <div className="d-flex gap-2">
          <Placeholder as="span" className="upcoming-event-title" style={{ width: "8em" }} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
        </div>
        <Placeholder as="span" className="upcoming-event-title" style={{ width: "15em" }} animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      </div>
    </ListGroup.Item>
  );
}
