import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "../styles/Article.scss";
import { useParams } from "react-router-dom";

// todo add some kind of background to imgs
export default function ArticleContent() {
  const selectedArticle = useSelector((state: RootState) => state.selectedArticle.content);
  const previewData = useSelector((state: RootState) => state.previewData.content);
  const params = useParams();
  return (
    // todo fix this monstrosity
    <div>
      {params.id === "preview"
        ? previewData.img?.length > 0 &&
          previewData.img.map(img => {
            return (
              <img
                src={img}
                key={img}
                alt=""
                className="img-fluid d-block mx-auto mb-4"
                style={{ maxHeight: "80vh" }}
              />
            );
          })
        : selectedArticle.img?.length > 0 &&
          selectedArticle.img.map(img => (
            <img src={img} key={img} alt="" className="img-fluid d-block mx-auto mb-4" style={{ maxHeight: "80vh" }} />
          ))}
      {params.id === "preview" ? (
        <div
          dangerouslySetInnerHTML={{ __html: previewData.content }}
          className={`content-container ${previewData.img?.length > 0 ? "mt-5" : ""} ${previewData.pdf ? "mb-5" : ""} `}
        />
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
          className={`content-container ${selectedArticle.img?.length > 0 ? "mt-5" : ""} ${
            selectedArticle.pdf ? "mb-5" : ""
          } `}
        />
      )}
      {params.id === "preview"
        ? previewData.pdf?.length > 0 && (
            <div style={{ maxWidth: "70%", margin: "auto" }} className="mb-4">
              {previewData.pdf.map(pdf => {
                return (
                  <embed
                    key={pdf}
                    src={pdf}
                    type="application/pdf"
                    width="100%"
                    height="600"
                    style={{ border: "none" }}
                  ></embed>
                );
              })}
            </div>
          )
        : selectedArticle.pdf?.length > 0 && (
            <div style={{ maxWidth: "70%", margin: "auto" }} className="mb-4">
              {selectedArticle.pdf.map(pdf => (
                <embed
                  key={pdf}
                  src={pdf.replace("http://", "https://")}
                  type="application/pdf"
                  width="100%"
                  height="600"
                  style={{ border: "none" }}
                ></embed>
              ))}
            </div>
          )}
    </div>
  );
}
