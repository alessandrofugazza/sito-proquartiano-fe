import { useDispatch } from "react-redux";
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, addToFavoritesAction } from "../redux/actions";
import ArticleCategories from "./shared-components/ArticleCategories";
import ArticleDateAuthorTag from "./shared-components/ArticleDateAuthorTag";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";
import { OverlayTrigger, Tooltip, TooltipProps } from "react-bootstrap";
import "../styles/Article.scss";

export default function ArticleContent() {
  const dispatch = useDispatch();
  const selectedArticle = useSelector((state: RootState) => state.selectedArticle.content);
  const favoriteArticles = useSelector((state: RootState) => state.favorites.content);
  const [isFavorite, setIsFavorite] = useState(favoriteArticles.some(article => article.id === selectedArticle.id));
  const handleAddToFavorites = () => {
    if (isFavorite) {
      dispatch({
        type: REMOVE_FROM_FAVORITES,
        payload: favoriteArticles.findIndex(article => article.id === selectedArticle.id),
      });
    } else {
      dispatch({ type: ADD_TO_FAVORITES, payload: selectedArticle });
    }
    setIsFavorite(!isFavorite);
  };
  const renderTooltip = (props: TooltipProps) => (
    <Tooltip id="button-tooltip" {...props}>
      {isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
    </Tooltip>
  );

  return (
    <div className="position-relative">
      <ArticleCategories categories={selectedArticle.categories.map(category => category.name)} />
      <ArticleDateAuthorTag
        date={selectedArticle.date}
        author={selectedArticle.author.signature}
        tags={selectedArticle.tags.map(tag => tag.name)}
      />
      <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
      <img src={selectedArticle.img} alt="" className="img-fluid" />
      {selectedArticle.pdf && (
        <embed
          src={selectedArticle.pdf}
          type="application/pdf"
          width="100%"
          height="600"
          style={{ border: "none" }}
        ></embed>
      )}

      {/* // todo make tooltip disappear after click */}
      <OverlayTrigger placement="left" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
        {/* // todo let user check favorites */}
        <i
          // todo customize border of filled star
          className={`bi ${isFavorite ? "bi-star-fill" : "bi-star"} fs-4 position-absolute top-0 end-0`}
          onClick={handleAddToFavorites}
        ></i>
      </OverlayTrigger>
    </div>
  );
}
