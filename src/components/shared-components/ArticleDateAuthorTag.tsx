import "../../styles/ArticleDateAuthorTag.scss";

interface ArticleDateAuthorTagProps {
  date: string;
  author: string;
  tags: string[];
}

function ArticleDateAuthorTag({ date, author, tags }: ArticleDateAuthorTagProps) {
  return (
    <div className="d-flex gap-2 date-author-tags">
      <div>
        <i className="bi bi-calendar-event"></i>
        <span>{date}</span>
      </div>
      <div>
        <i className="bi bi-person-fill"></i>
        <span>{author}</span>
      </div>
      <div>
        <i className="bi bi-tags-fill"></i>
        {tags.map((tag, index) => (
          <span key={tag}>
            <span className="tag">{tag}</span>
            {index < tags.length - 1 && ", "}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ArticleDateAuthorTag;
