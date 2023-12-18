import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { IArticleApiResponse, IArticlesApiResponse } from "../../interfaces/IArticleApi";
import { useLocation, useParams } from "react-router-dom";
import SingleFilteredResult from "./SingleFilteredResult";
import withGet from "../helpers/withGet";
import { IWithGetProps } from "../../interfaces/IWithGetProps";
import SingleFilteredResultPlaceholder from "./SingleFilteredResultPlaceholder";
import GenericErrorAlert from "../shared-components/GenericErrorAlert";

interface IFilteredResultsProps {
  title?: string;
}

// learn
type FilteredResultsProps = IFilteredResultsProps & IWithGetProps;

// ? usestate
// learn difference
let fetchPage = 0;

function FilteredResults({ title = "", isLoading, setIsLoading, error, setError }: FilteredResultsProps) {
  const [articlesData, setArticlesData] = useState<IArticleApiResponse[] | null>(null);
  const location = useLocation();
  const [isLastPage, setIsLastPage] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const tag = queryParams.get("tag");
  const categoria = queryParams.get("categoria");
  const autore = queryParams.get("autore");
  function titleCase(str: string) {
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  // todo STUPID HACKS FOR 0.1
  let queryParamTitle = "";
  if (tag) {
    queryParamTitle = `Tag: ${tag}`;
  } else if (categoria) {
    const titleCasedCategory = titleCase(categoria);
    queryParamTitle = `Categoria: ${titleCasedCategory}`;
  } else if (autore) {
    queryParamTitle = `Autore: ${autore}`;
  }
  // const [fetchPage, setFetchPage] = useState(0);

  const fetchArticlesData = async () => {
    const fetchUrl = `${process.env.REACT_APP_API_URL}${location.pathname}${location.search}&page=${fetchPage}`;
    // const pagedFetchUrl = `${fetchUrl}&page=${fetchPage}`;
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
      setError({
        hasError: true,
        errorMessage: "Errore nel reperimento dati.",
      });
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
  const placeholderCounter = Array.from({ length: 5 });
  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        {title ? <h1>{title}</h1> : <h1 className="h2 mb-5">{queryParamTitle}</h1>}
      </div>
      <Row className="gy-4">
        {/* // todo i dont even know if this is working or not and for some reason cant test it */}
        {isLoading ? (
          placeholderCounter.map((_, index) => <SingleFilteredResultPlaceholder key={index} />)
        ) : error.hasError ? (
          <GenericErrorAlert />
        ) : (
          articlesData?.map(article => {
            return (
              <SingleFilteredResult
                key={article.id}
                imgSrc={article.img ? article.img[0] : ""}
                date={article.date}
                author={article.author.signature}
                tags={article.tags.map(tag => tag.name)}
                categories={article.categories.map(category => category.name)}
                title={article.title}
                content={article.content}
                articleId={article.id}
              />
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
              fetchPage += 1;
              fetchArticlesData();
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
  );
}

export default withGet(FilteredResults);
