import ArticleCard from "../shared-components/ArticleCard";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { IArticleApiResponse, IArticlesApiResponse } from "../../interfaces/IArticleApi";
import { useLocation, useParams } from "react-router-dom";
import HomePagination from "./HomePagination";
import ArticleCardPlaceholder from "../shared-components/ArticleCardPlaceholder";
import { IWithGetProps } from "../../interfaces/IWithGetProps";
import withGet from "../helpers/withGet";
import GenericErrorAlert from "../shared-components/GenericErrorAlert";

function UltimiEventi({ isLoading, setIsLoading, error, setError }: IWithGetProps) {
  const [articlesData, setArticlesData] = useState<IArticleApiResponse[] | null>(null);

  const ultimiEventiRef = useRef<HTMLDivElement>(null);
  const [fetchPage, setFetchPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const params = useParams();
  const placeholderCounter = Array.from({ length: 10 });

  // todo common function for this and filteredresults. redux?
  const fetchArticlesData = async () => {
    let fetchUrl = `${process.env.REACT_APP_API_URL}/articoli?`;
    if (params.section) {
      fetchUrl += `section=${params.section}&`;
    }
    // todo this is horrible, find a way to implement an offset
    fetchPage === 0 ? (fetchUrl += "size=11") : (fetchUrl += `size=11&page=${fetchPage}`);
    try {
      const re = await fetch(fetchUrl);
      if (re.ok) {
        const newData = await re.json();
        if (newData.last === true) {
          setIsLastPage(true);
        }
        setArticlesData(oldData => [...(oldData || []), ...newData.content]);
      } else {
        setError({
          hasError: true,
          errorMessage: `Error ${re.status}: ${re.statusText}`,
        });
      }
    } catch (error) {
      // todo is this right?
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

      <>
        <Row className="mt-5 mb-4">
          <Col className="big-card">
            {isLoading ? (
              <ArticleCardPlaceholder />
            ) : error.hasError ? (
              <GenericErrorAlert />
            ) : (
              articlesData && (
                <ArticleCard
                  imgSrc={articlesData[0].img?.[0] || ""} // todo bad hack but will do for now, check api response
                  date={articlesData[0].date}
                  author={articlesData[0].author.signature}
                  tags={articlesData[0].tags?.map(tag => tag.name)}
                  categories={articlesData[0].categories.map(category => category.name)}
                  title={articlesData[0].title}
                  content={articlesData[0].content}
                  articleId={articlesData[0].id}
                />
              )
            )}
          </Col>
        </Row>
        <Row xs={1} md={2} className="gy-4">
          {isLoading ? (
            placeholderCounter.map((_, index) => (
              <Col key={index} className={`small-card`}>
                <ArticleCardPlaceholder />
              </Col>
            ))
          ) : error.hasError ? (
            <></>
          ) : (
            articlesData &&
            articlesData.slice(1).map((article, index) => {
              return (
                <Col
                  key={article.id}
                  // * terrible hack. implement offset in get
                  className={`small-card ${
                    // ^ smarter conditions
                    articlesData.length > 11 &&
                    index === articlesData.length - 2 &&
                    !(articlesData.length % 2) &&
                    !isLastPage
                      ? "d-none"
                      : ""
                  }`}
                >
                  <ArticleCard
                    imgSrc={article.img?.[0] || ""}
                    date={article.date}
                    author={article.author.signature}
                    tags={article.tags.map(tag => tag.name)}
                    categories={article.categories.map(category => category.name)}
                    title={article.title}
                    content={article.content}
                    articleId={article.id}
                  />
                </Col>
              );
            })
          )}
        </Row>

        {!isLastPage ? (
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
        ) : (
          <div className="d-flex mt-5">
            <span className="recent-events-nav-btn mx-auto fs-5">Fine dei risultati</span>
          </div>
        )}
      </>
    </Col>
  );
}

export default withGet(UltimiEventi);
