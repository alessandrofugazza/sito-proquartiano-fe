import HomeCard from "./HomeCard";
import img1 from "../../assets/img/PQ_sagraW2023.jpg";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IArticleApiResponse, IArticlesApiResponse } from "../../interfaces/IArticleApi";

function UltimiEventi() {
  const [articlesData, setArticlesData] = useState<IArticlesApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const fetchUrl = "http://localhost:3001/articles";
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
      <h3 className="text-center" style={{ marginTop: "2em" }}>
        Ultimi eventi
      </h3>
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
              />
            </Col>
          </Row>
          <Row xs={1} md={2} className="gy-4">
            <Col>
              <HomeCard
                imgSrc={img1}
                date="29 Agosto 2023"
                author="DC"
                tags={["testtag1", "testtag2"]}
                categories={["associazione"]}
                title="SAGRA DI QUARTIANO 2023"
                description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
              />
            </Col>
            <Col>
              <HomeCard
                imgSrc={img1}
                date="29 Agosto 2023"
                author="DC"
                tags={["testtag1", "testtag2"]}
                categories={["associazione"]}
                title="SAGRA DI QUARTIANO 2023"
                description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
              />
            </Col>
            <Col>
              <HomeCard
                imgSrc={img1}
                date="29 Agosto 2023"
                author="DC"
                tags={["testtag1", "testtag2"]}
                categories={["associazione"]}
                title="SAGRA DI QUARTIANO 2023"
                description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
              />
            </Col>
            <Col>
              <HomeCard
                imgSrc={img1}
                date="29 Agosto 2023"
                author="DC"
                tags={["testtag1", "testtag2"]}
                categories={["associazione"]}
                title="SAGRA DI QUARTIANO 2023"
                description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
              />
            </Col>
            <Col>
              <HomeCard
                imgSrc={img1}
                date="29 Agosto 2023"
                author="DC"
                tags={["testtag1", "testtag2"]}
                categories={["associazione"]}
                title="SAGRA DI QUARTIANO 2023"
                description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
              />
            </Col>
            <Col>
              <HomeCard
                imgSrc={img1}
                date="29 Agosto 2023"
                author="DC"
                tags={["testtag1", "testtag2"]}
                categories={["associazione"]}
                title="SAGRA DI QUARTIANO 2023"
                description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
              />
            </Col>
            <Col>
              <HomeCard
                imgSrc={img1}
                date="29 Agosto 2023"
                author="DC"
                tags={["testtag1", "testtag2"]}
                categories={["associazione"]}
                title="SAGRA DI QUARTIANO 2023"
                description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
              />
            </Col>
            <Col>
              <HomeCard
                imgSrc={img1}
                date="29 Agosto 2023"
                author="DC"
                tags={["testtag1", "testtag2"]}
                categories={["associazione"]}
                title="SAGRA DI QUARTIANO 2023"
                description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default UltimiEventi;
