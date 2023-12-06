import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "../styles/Article.scss";

export default function ArticleContent() {
  const selectedArticle = useSelector((state: RootState) => state.selectedArticle.content);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
      <img src={selectedArticle.img} alt="" className="img-fluid" />
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
