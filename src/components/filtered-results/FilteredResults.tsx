import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { IArticleApiResponse, IArticlesApiResponse } from "../../interfaces/IArticleApi";
import { useLocation, useParams } from "react-router-dom";
import SingleFilteredResult from "./SingleFilteredResult";

interface IFilteredResultsProps {
  title?: string;
}

// todo WHY DUPLICATED KEYS??
export default function FilteredResults({ title = "" }: IFilteredResultsProps) {
  const [articlesData, setArticlesData] = useState<IArticleApiResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const location = useLocation();
  // const [fetchPage, setFetchPage] = useState(0);
  let fetchPage = 0;

  const fetchArticlesData = async () => {
    const fetchUrl = `http://localhost:3001${location.pathname}${location.search}&page=${fetchPage}`;
    // const pagedFetchUrl = `${fetchUrl}&page=${fetchPage}`;
    try {
      const re = await fetch(fetchUrl);
      if (re.ok) {
        const newData = await re.json();
        setArticlesData(oldData => [...(oldData || []), ...newData.content]);
      } else {
        setHasError(true);
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };
  // useEffect(() => {
  //   fetchArticlesData(fetchPage);
  // }, []);
  // useEffect(() => {
  //   fetchArticlesData();
  // }, [fetchPage]);
  useEffect(() => {
    setArticlesData(null);
    fetchArticlesData();
  }, [location.search]);
  return (
    <>
      {title && <h1>{title}</h1>}
      <Row className="gy-4">
        {articlesData &&
          !isLoading &&
          articlesData.map(article => {
            return (
              <SingleFilteredResult
                key={article.id}
                imgSrc={article.img}
                pdfSrc={article.pdf}
                date={article.date}
                author={article.author.signature}
                tags={article.tags.map(tag => tag.name)}
                categories={article.categories.map(category => category.name)}
                title={article.title}
                description={article.content}
                articleId={article.id}
              />
            );
          })}
      </Row>
      <div className="d-flex mt-5">
        <Button
          className="recent-events-nav-btn mx-auto fs-5"
          variant="link"
          onClick={() => {
            // const nextPage = fetchPage + 1;
            // setFetchPage(fetchPage => fetchPage + 1);
            fetchPage += 1;
            // console.log(nextPage);
            fetchArticlesData();
          }}
        >
          Carica altro
        </Button>
      </div>
    </>
  );
}
