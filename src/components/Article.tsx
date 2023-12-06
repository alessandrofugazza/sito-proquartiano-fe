import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IArticleApiResponse } from "../interfaces/IArticleApi";
import RouteWrapper from "./RouteWrapper";
import { Spinner } from "react-bootstrap";
import ArticleContent from "./ArticleContent";
import { useDispatch } from "react-redux";
import { SELECT_ARTICLE, selectArticleAction } from "../redux/actions";

export default function Article() {
  const params = useParams();
  const [articleData, setArticleData] = useState<IArticleApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  const fetchUrl = `${process.env.REACT_APP_API_URL}/articoli/` + params.id;
  const fetchArticleData = async () => {
    try {
      const re = await fetch(fetchUrl);
      if (re.ok) {
        const data = await re.json();
        // ? using usestate and then dispatch to save the same data. this is stupid
        setArticleData(data);
        dispatch({ type: SELECT_ARTICLE, payload: data });
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
      {articleData && (
        <RouteWrapper title={articleData.title} content={<ArticleContent />} breadcrumb={false} isArticle={true} />
      )}
    </>
  );
}
