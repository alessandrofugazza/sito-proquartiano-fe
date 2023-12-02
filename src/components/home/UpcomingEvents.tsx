import "react-calendar/dist/Calendar.css";
import "../../styles/UpcomingEvents.scss";
import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { IArticleApiResponse } from "../../interfaces/IArticleApi";
import { Col, ListGroup, Overlay, Popover, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import { hr } from "date-fns/locale";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function UpcomingEvents() {
  // todo organize this clusterfuck of a component
  const [comingUpData, setComingUpData] = useState<IArticleApiResponse[] | null>(null);
  const navigate = useNavigate();
  const [showPopover, setShowPopover] = useState(false);
  const [popoverTarget, setPopoverTarget] = useState<Element | null>(null);
  const popoverRef = useRef(null);

  const [value, onChange] = useState<Value>(new Date());
  const fetchComingUp = async () => {
    const re = await fetch("http://localhost:3001/articoli/coming-up/all");
    const data = await re.json();
    setComingUpData(data);
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
  function isSameDay(a: Date, b: Date) {
    return differenceInCalendarDays(a, b) === 0;
  }
  function tileClassName({ date, view }: { date: Date; view: string }) {
    if (view === "month") {
      if (comingUpData?.map(event => new Date(event.eventDate)).find(dDate => isSameDay(dDate, date))) {
        return "eventful-day";
      }
    }
  }

  const currentClickedDateRef = useRef<Date | null>(null);

  function handleDayClick(date: Date) {
    // ^ pass only date, id and title
    const eventsOnThisDay = comingUpData?.filter(event => isSameDay(new Date(event.eventDate), date));
    if (eventsOnThisDay && eventsOnThisDay.length > 0) {
      setSelectedDayEvents(eventsOnThisDay);

      currentClickedDateRef.current = date;

      // ? should apply to article validation?
      // learn this trick
      setTimeout(() => {
        setPopoverTarget(document.querySelector(".react-calendar__tile--active"));
        setShowPopover(true);
      }, 0);
    }
  }

  const [selectedDayEvents, setSelectedDayEvents] = useState<IArticleApiResponse[]>([]);

  const popover = (
    <Popover id="popover-basic" ref={popoverRef}>
      <Popover.Header as="h3">Dettagli evento</Popover.Header>
      <Popover.Body>
        {selectedDayEvents.map((event, index) => (
          <div key={event.id}>
            <Link to={`/articoli/${event.id}`}>
              <span className="fw-semibold">{event.title}</span>
            </Link>
            {index !== selectedDayEvents.length - 1 && <hr />}
          </div>
        ))}
      </Popover.Body>
    </Popover>
  );

  return (
    <Row className="calendar">
      <Col xs="auto" className="mx-auto mx-lg-0 d-none d-lg-block">
        <Calendar
          onChange={onChange}
          value={value}
          tileClassName={tileClassName}
          locale="it-IT"
          minDate={new Date()}
          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
          minDetail="month"
          onClickDay={handleDayClick}
        />
        <Overlay
          show={showPopover}
          target={popoverTarget}
          placement="right"
          container={popoverRef.current}
          rootClose={true}
          onHide={() => setShowPopover(false)}
        >
          {popover}
        </Overlay>
      </Col>
      <Col xs="12" lg="auto" className="d-flex flex-column order-first order-lg-0 mb-4 mb-lg-0 flex-grow-1">
        <h3 className="h5 d-none d-lg-block mb-2">Eventi in arrivo:</h3>
        <h3 className="d-lg-none mx-auto">Eventi in arrivo</h3>
        <ListGroup as="div" className="d-flex flex-column justify-content-between my-2 flex-grow-1">
          {comingUpData?.slice(0, 3).map(event => {
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
                  {/* // todo fix overflow */}
                  <span className="upcoming-event-title">{event.title}</span>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Col>
    </Row>
  );
}
