import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "../styles/Article.scss";

export default function ArticleContent() {
  const selectedArticle = useSelector((state: RootState) => state.selectedArticle.content);

  return (
    <div>
      {selectedArticle.img && (
        <img src={selectedArticle.img} alt="" className="img-fluid d-block mx-auto" style={{ maxHeight: "100vh" }} />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
        className={`${selectedArticle.img ? "mt-5" : ""} ${selectedArticle.pdf ? "mb-5" : ""} `}
      />
      {selectedArticle.pdf && (
        <embed
          src={selectedArticle.pdf.replace("http://", "https://")}
          type="application/pdf"
          width="100%"
          height="600"
          style={{ border: "none" }}
        ></embed>
      )}
    </div>
  );
}
