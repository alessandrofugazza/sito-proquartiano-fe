import HomeCard from "../home/HomeCard";
import img1 from "../../assets/img/PQ_sagraW2023.jpg";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IArticleApiResponse, IArticlesApiResponse } from "../../interfaces/IArticleApi";
import { useParams } from "react-router-dom";

function UltimiEventi({ fetchUrlPath = "" }) {
  const [articlesData, setArticlesData] = useState<IArticlesApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  let fetchUrl = "http://localhost:3001/articoli";
  const params = useParams();
  if (fetchUrlPath) {
    fetchUrl += `/${fetchUrlPath}/${params.categoryOrTagName}`;
  }
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
      {fetchUrlPath && (
        <h1 className="text-center my-3 h2">{`Ultimi eventi con ${fetchUrlPath} "${params.categoryOrTagName}"`}</h1>
      )}
      {!fetchUrlPath && (
        <h3 className="text-center" style={{ marginTop: "2em" }}>
          Ultimi eventi
        </h3>
      )}
      {articlesData && !isLoading && (
        <>
          <Row className="mt-5 mb-4">
            <Col>
              <HomeCard
                imgSrc={img1}
                date={articlesData.content[0].date}
                author={articlesData.content[0].author.username}
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
                    imgSrc={img1}
                    date={article.date}
                    author={article.author.username}
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
    </div>
  );
}

export default UltimiEventi;
