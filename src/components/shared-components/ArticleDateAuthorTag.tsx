import { useNavigate } from "react-router-dom";
import "../../styles/ArticleDateAuthorTag.scss";

interface ArticleDateAuthorTagProps {
  date: string;
  author: string;
  tags: string[];
}

function ArticleDateAuthorTag({ date, author, tags }: ArticleDateAuthorTagProps) {
  const navitate = useNavigate();
  const dateObj = new Date(date);

  const formattedDate = dateObj.toLocaleDateString("it-IT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="d-flex gap-2 date-author-tags">
      <div>
        <i className="bi bi-person-fill"></i>
        <span
          onClick={e => {
            e.stopPropagation();
            navitate(`/articoli?autore=${author}`);
          }}
        >
          {author}
        </span>
      </div>
      <div>
        <i className="bi bi-calendar-event"></i>
        <span className="date">{formattedDate}</span>
      </div>
      {tags.length > 0 && (
        <div>
          <i className="bi bi-tags-fill"></i>
          {tags.map((tag, index) => (
            <span key={tag} className="span-container">
              <span
                className="tag"
                onClick={e => {
                  e.stopPropagation();
                  navitate(`/articoli?tag=${tag}`);
                }}
              >
                {tag}
              </span>
              {index < tags.length - 1 && ", "}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArticleDateAuthorTag;
