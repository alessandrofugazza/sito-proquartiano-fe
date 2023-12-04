import React from "react";
import { Container } from "react-bootstrap";
import MyBreadcrumb from "./MyBreadcrumb";
import NavigationButtons from "./NavigationButtons";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, addToFavoritesAction } from "../redux/actions";
import ArticleCategories from "./shared-components/ArticleCategories";
import ArticleDateAuthorTag from "./shared-components/ArticleDateAuthorTag";
import { useState } from "react";
import { OverlayTrigger, Tooltip, TooltipProps } from "react-bootstrap";

interface RouteWrapperProps {
  title: string;
  description?: string;
  content: React.ReactNode;
  breadcrumb?: boolean;
  isArticle?: boolean;
}

// * too much article related stuff in component used by every route
function RouteWrapper({ title, description = "", content, breadcrumb = true, isArticle = false }: RouteWrapperProps) {
  const selectedArticle = useSelector((state: RootState) => state.selectedArticle.content);
  const favoriteArticles = useSelector((state: RootState) => state.favorites.content);
  const dispatch = useDispatch();
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
    <main className="flex-grow-1 d-flex">
      <Container className="d-flex flex-column py-4 my-5 border shadow " style={{ backgroundColor: "white" }}>
        {/* // ? this title condition */}
        {title && (
          <>
            {breadcrumb && <MyBreadcrumb />}
            <header className="position-relative">
              <h1 className="my-3">{title}</h1>
              {isArticle && (
                <>
                  <ArticleCategories categories={selectedArticle.categories.map(category => category.name)} />
                  <div className="my-1"></div>
                  <ArticleDateAuthorTag
                    date={selectedArticle.date}
                    author={selectedArticle.author.signature}
                    tags={selectedArticle.tags.map(tag => tag.name)}
                  />
                  {/* // todo make tooltip disappear after click */}
                  <OverlayTrigger placement="left" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                    {/* // ! let user check favorites */}
                    {/* // todo bit in the way */}
                    <i
                      // todo customize border of filled star
                      className={`bi ${isFavorite ? "bi-star-fill" : "bi-star"} fs-4 position-absolute top-0 end-0`}
                      onClick={handleAddToFavorites}
                    ></i>
                  </OverlayTrigger>
                </>
              )}
              {description && <p>{description}</p>}
            </header>
            <hr className="my-4" />
          </>
        )}
        <div className="mt-3 mb-4">{content}</div>
        {title && <NavigationButtons />}
      </Container>
    </main>
  );
}

export default RouteWrapper;
