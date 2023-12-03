import HomeCard from "./HomeCard";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { IArticleApiResponse, IArticlesApiResponse } from "../../interfaces/IArticleApi";
import { useLocation, useParams } from "react-router-dom";
import HomePagination from "./HomePagination";

function UltimiEventi() {
  const [articlesData, setArticlesData] = useState<IArticleApiResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    hasError: false,
    errorMessage: "",
  });
  const ultimiEventiRef = useRef<HTMLDivElement>(null);
  const [fetchPage, setFetchPage] = useState(0);

  const fetchArticlesData = async () => {
    let fetchUrl = "http://localhost:3001/articoli?";
    // todo this is horrible, find a way to implement an offset
    fetchPage === 0 ? (fetchUrl += "size=11") : (fetchUrl += `size=11&page=${fetchPage}`);
    try {
      const re = await fetch(fetchUrl);
      if (re.ok) {
        const newData = await re.json();
        setArticlesData(oldData => [...(oldData || []), ...newData.content]);
      } else {
        setError({
          hasError: true,
          errorMessage: `Error ${re.status}: ${re.statusText}`,
        });
      }
    } catch (error) {
      setError({
        hasError: true,
        errorMessage: "Errore nel reperimento dati.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchArticlesData();
  }, [fetchPage]);
  return (
    <Col lg={{ span: 10, offset: 1 }} className="recent-events">
      {/* {fetchUrlPath && (
        <h1 className="text-center my-3 h2">{`Ultimi eventi con ${fetchUrlPath} "${params.categoryOrTagName}"`}</h1>
      )}*/}

      <h3 className="text-center" style={{ marginTop: "2em" }} ref={ultimiEventiRef}>
        Ultime notizie
      </h3>

      {/* // ? should i implement this? */}
      {/* <HomePagination fetchPage={recentEventsPage} /> */}

      {articlesData && !isLoading && (
        <>
          <Row className="mt-5 mb-4">
            <Col className="big-card">
              <HomeCard
                imgSrc={articlesData[0].img}
                date={articlesData[0].date}
                author={articlesData[0].author.signature}
                tags={articlesData[0].tags.map(tag => tag.name)}
                categories={articlesData[0].categories.map(category => category.name)}
                title={articlesData[0].title}
                description={articlesData[0].content}
                articleId={articlesData[0].id}
                // ? is pdfsrc needed here
                pdfSrc=""
              />
            </Col>
          </Row>
          <Row xs={1} md={2} className="gy-4">
            {articlesData.slice(1).map((article, index) => {
              return (
                <Col
                  key={article.id}
                  // * terrible hack. what happens when no more results?
                  className={`small-card ${
                    articlesData.length > 11 && index === articlesData.length - 2 && !(articlesData.length % 2)
                      ? "d-none"
                      : ""
                  }`}
                >
                  <HomeCard
                    imgSrc={article.img}
                    date={article.date}
                    author={article.author.signature}
                    tags={article.tags.map(tag => tag.name)}
                    categories={article.categories.map(category => category.name)}
                    title={article.title}
                    description={article.content}
                    articleId={article.id}
                    pdfSrc=""
                  />
                </Col>
              );
            })}
          </Row>

          {/* // todo handle no more results */}
          <div className="d-flex mt-5">
            <Button
              className="recent-events-nav-btn mx-auto fs-5"
              variant="link"
              onClick={() => {
                setFetchPage(fetchPage + 1);
              }}
            >
              Carica altro
            </Button>
          </div>
        </>
      )}
    </Col>
  );
}

export default UltimiEventi;
