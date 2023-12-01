import "react-calendar/dist/Calendar.css";
import "../../styles/UpcomingEvents.scss";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { IArticleApiResponse } from "../../interfaces/IArticleApi";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function UpcomingEvents() {
  const [comingUpData, setComingUpData] = useState<IArticleApiResponse[] | null>(null);
  const navigate = useNavigate();
  const [value, onChange] = useState<Value>(new Date());
  const fetchComingUp = async () => {
    const re = await fetch("http://localhost:3001/articoli/coming-up");
    const data = await re.json();
    setComingUpData(data.content);
  };
  useEffect(() => {
    fetchComingUp();
  }, []);
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };
  return (
    <Row className="calendar">
      <Col xs="auto" className="mx-auto mx-lg-0 d-none d-lg-block">
        <Calendar
          onChange={onChange}
          value={value}
          locale="it-IT"
          minDate={new Date()}
          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
          minDetail="month"
        />
      </Col>
      <Col xs={12} lg="auto" className="d-flex flex-column order-first order-lg-0 mb-4 mb-lg-0">
        <h3 className="h5 d-none d-lg-block">Eventi in arrivo:</h3>
        <h3 className="d-lg-none mx-auto">Eventi in arrivo</h3>
        <ListGroup as="div" className="d-flex flex-column gap-2 flex-grow-1 justify-content-between my-2">
          {comingUpData?.map(event => {
            return (
              <ListGroup.Item
                key={event.id}
                className="d-flex justify-content-between align-items-start "
                style={{ borderTopWidth: "1px" }}
                onClick={() => navigate(`articoli/${event.id}`)}
              >
                <div className="ms-2 me-auto">
                  <div className="d-flex gap-2">
                    <i className="bi bi-calendar-event"></i>
                    <span className="fw-semibold">{formatDate(event.eventDate)}</span>
                  </div>
                  {event.title}
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Col>
    </Row>
  );
}
