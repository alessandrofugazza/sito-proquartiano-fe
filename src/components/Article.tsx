import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IArticleApiResponse } from "../interfaces/IArticleApi";
import RouteWrapper from "./RouteWrapper";
import { Spinner } from "react-bootstrap";

export default function Article() {
  const params = useParams();
  const [articleData, setArticleData] = useState<IArticleApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const fetchUrl = "http://localhost:3001/articles/" + params.id;
  const fetchArticleData = async () => {
    try {
      const re = await fetch(fetchUrl);
      if (re.ok) {
        const data = await re.json();
        setArticleData(data);
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
    fetchArticleData();
  }, []);
  return (
    <>
      {isLoading && <Spinner variant="danger" />}
      {articleData && <RouteWrapper title={articleData.title} content={articleData.content} breadcrumb={false} />}
    </>
  );
}
