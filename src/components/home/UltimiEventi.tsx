import HomeCard from "./HomeCard";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { IArticleApiResponse, IArticlesApiResponse } from "../../interfaces/IArticleApi";
import { useLocation, useParams } from "react-router-dom";
import HomePagination from "./HomePagination";

function UltimiEventi() {
  const [articlesData, setArticlesData] = useState<IArticlesApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  // let currentPage = 0;
  const ultimiEventiRef = useRef<HTMLDivElement>(null);

  // const handleInputChange = () => {
  //   setRecentEventsPage()
  // }

  let fetchUrl = "http://localhost:3001/articoli?size=11";
  const fetchArticlesData = async () => {
    try {
      const re = await fetch(fetchUrl);
      if (re.ok) {
        const data = await re.json();
        setArticlesData(data);
      } else {
        setHasError(true);
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchArticlesData();
  }, []);
  return (
    <div className="recent-events">
      {/* {fetchUrlPath && (
        <h1 className="text-center my-3 h2">{`Ultimi eventi con ${fetchUrlPath} "${params.categoryOrTagName}"`}</h1>
      )}*/}

      <h3 className="text-center" style={{ marginTop: "2em" }} ref={ultimiEventiRef}>
        Ultimi eventi
      </h3>

      {/* // todo should i implement this? */}
      {/* <HomePagination currentPage={recentEventsPage} /> */}

      {articlesData && !isLoading && (
        <>
          {currentPage === 0 && (
            <>
              <Row className="mt-5 mb-4">
                <Col>
                  <HomeCard
                    imgSrc={articlesData.content[0].img}
                    date={articlesData.content[0].date}
                    author={articlesData.content[0].author.signature}
                    tags={articlesData.content[0].tags.map(tag => tag.name)}
                    categories={articlesData.content[0].categories.map(category => category.name)}
                    title={articlesData.content[0].title}
                    description={articlesData.content[0].content}
                    articleId={articlesData.content[0].id}
                  />
                </Col>
              </Row>
              <Row xs={1} md={2} className="gy-4">
                {articlesData.content.slice(1).map(article => {
                  return (
                    <Col key={article.id}>
                      <HomeCard
                        imgSrc={article.img}
                        date={article.date}
                        author={article.author.signature}
                        tags={article.tags.map(tag => tag.name)}
                        categories={article.categories.map(category => category.name)}
                        title={article.title}
                        description={article.content}
                        articleId={article.id}
                      />
                    </Col>
                  );
                })}
              </Row>
            </>
          )}
          {currentPage > 0 && (
            <Row xs={1} md={2} className="gy-4">
              {articlesData.content.map(article => {
                return (
                  <Col key={article.id}>
                    <HomeCard
                      imgSrc={article.img}
                      date={article.date}
                      author={article.author.signature}
                      tags={article.tags.map(tag => tag.name)}
                      categories={article.categories.map(category => category.name)}
                      title={article.title}
                      description={article.content}
                      articleId={article.id}
                    />
                  </Col>
                );
              })}
            </Row>
          )}
          {/* todo better syntax */}
          {/* todo scroll needs to wait for fetch */}
          {/* todo handle no more results */}
          <div className="d-flex justify-content-between mt-5 ">
            <Button
              className="recent-events-nav-btn"
              variant="link"
              onClick={() => {
                const nextPage = currentPage + 1; // currentPage += 1;
                setCurrentPage(nextPage);
                fetchUrl = `http://localhost:3001/articoli?page=${nextPage}`;
                fetchArticlesData();
                if (ultimiEventiRef.current) {
                  ultimiEventiRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <div className="d-flex gap-2 align-items-center">
                <i className="bi bi-arrow-left-circle fs-5"></i> <span>Precedente</span>
              </div>
            </Button>
            {currentPage > 0 && (
              <Button
                className="recent-events-nav-btn"
                variant="link"
                onClick={() => {
                  const nextPage = currentPage - 1;
                  setCurrentPage(nextPage);

                  fetchUrl = `http://localhost:3001/articoli?page=${nextPage}`;
                  if (nextPage === 0) {
                    fetchUrl += "&size=11";
                  }
                  fetchArticlesData();
                  if (ultimiEventiRef.current) {
                    ultimiEventiRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <div className="d-flex gap-2 align-items-center">
                  <span>Successivo</span> <i className="bi bi-arrow-right-circle fs-5"></i>
                </div>
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UltimiEventi;
