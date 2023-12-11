import { useEffect, useState } from "react";
import { IArticleApiResponse } from "../../interfaces/IArticleApi";
import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import "../../styles/PublishedArticles.scss";

export default function PublishedArticles() {
  const [articlesData, setArticlesData] = useState<IArticleApiResponse[] | null>(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const navigate = useNavigate();

  const fetchArticles = async () => {
    const re = await fetch(
      `${process.env.REACT_APP_API_URL}/articoli?autore=${localStorage.getItem("username")}&page=0`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
      }
    );
    const newData = await re.json();
    if (newData.last === true) {
      setIsLastPage(true);
    }
    setArticlesData(oldData => [...(oldData || []), ...newData.content]);
  };
  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <>
      <ButtonGroup className="flex-column">
        {articlesData?.map(article => (
          // todo add tooltips
          <Button
            onClick={() => navigate(`/articoli/${article.id}`)}
            variant="link"
            key={article.id}
            className="text-start d-flex gap-3 align-items-center"
            style={{ height: "2em" }} // ^ fuck
          >
            {article.title}
            <span className="edit-buttons d-flex gap-1 align-items-center">
              <i className="bi bi-pencil-square fs-5"></i>
              <i className="bi bi-x fs-3"></i>
            </span>
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
}
