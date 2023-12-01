import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.scss";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { IArticleApiResponse } from "../interfaces/IArticleApi";
import { Col, ListGroup, Row } from "react-bootstrap";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function TestPage() {
  const [comingUpData, setComingUpData] = useState<IArticleApiResponse[] | null>(null);
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
    <div className="d-flex gap-5">
      <div>
        <Calendar
          onChange={onChange}
          value={value}
          locale="it-IT"
          minDate={new Date()}
          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
          minDetail="month"
        />
      </div>
      <div className="d-flex flex-column ">
        <h5 className="fw-bold">Eventi in arrivo: </h5>
        <ListGroup as="div" className="d-flex flex-column gap-2 flex-grow-1 justify-content-between my-2">
          {comingUpData?.map(event => {
            return (
              <ListGroup.Item
                key={event.id}
                className="d-flex justify-content-between align-items-start "
                style={{ borderTopWidth: "1px" }}
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
      </div>
    </div>
  );
}
