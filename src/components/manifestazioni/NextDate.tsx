import { Alert } from "react-bootstrap";
import { IArticleApiResponse } from "../../interfaces/IArticleApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "../shared-components/ArticleCard";
import UltimiEventi from "../home/UltimiEventi";

export default function NextDate() {
  const params = useParams();
  const [nextEvent, setNextEvent] = useState<IArticleApiResponse | null>(null);
  const fetchNextDate = async () => {
    const re = await fetch(`${process.env.REACT_APP_API_URL}/articoli/coming-up?sectionName=${params.section}&size=1`);
    const nextEventData = await re.json();
    setNextEvent(nextEventData.content[0]);
  };
  useEffect(() => {
    fetchNextDate();
  }, [params.section]);
  const formatNextEventDate = (date: string) => {
    // learn
    const dateObj = new Date(date);

    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("it-IT", options).format(dateObj);

    return formattedDate;
  };
  return (
    <div className="manifestazione">
      <h2 className="h3">{`Prossima data: ${nextEvent ? formatNextEventDate(nextEvent.eventDate) : ""}`}</h2>
      {nextEvent ? (
        <>
          <div className="big-card">
            <ArticleCard
              imgSrc={nextEvent.img[0] ? nextEvent.img[0] : "big-card-no-image"}
              date={nextEvent.date}
              author={nextEvent.author.signature}
              tags={nextEvent.tags.map(tag => tag.name)}
              categories={nextEvent.categories.map(category => category.name)}
              title={nextEvent.title}
              content={nextEvent.content}
              articleId={nextEvent.id}
            />
          </div>
        </>
      ) : (
        <Alert variant="light">
          <Alert.Heading>Nessun evento in programma</Alert.Heading>
          <p>La data della prossima manifestazione non è ancora stata stabilita.</p>
        </Alert>
      )}
    </div>
  );
}
