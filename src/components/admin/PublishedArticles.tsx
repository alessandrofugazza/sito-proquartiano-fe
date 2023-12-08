import { useEffect, useState } from "react";
import { IArticleApiResponse } from "../../interfaces/IArticleApi";
import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router";

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
          <Button
            onClick={() => navigate(`articoli/${article.id}`)}
            variant="link"
            key={article.id}
            className="text-start"
          >
            {article.title}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
}
