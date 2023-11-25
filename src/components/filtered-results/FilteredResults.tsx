import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { IArticleApiResponse, IArticlesApiResponse } from "../../interfaces/IArticleApi";
import { useLocation, useParams } from "react-router-dom";
import SingleFilteredResult from "./SingleFilteredResult";

export default function FilteredResults() {
  const [articlesData, setArticlesData] = useState<IArticlesApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const location = useLocation();
  const [recentEventsPage, setRecentEventsPage] = useState(1);

  // const handleInputChange = () => {
  //   setRecentEventsPage()
  // }

  const fetchUrl = "http://localhost:3001/articoli";
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
    <>
      <Row className="gy-4">
        {articlesData &&
          !isLoading &&
          articlesData.content.map(article => {
            return (
              <SingleFilteredResult
                key={article.id}
                imgSrc={article.img}
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
    </>
  );
}
