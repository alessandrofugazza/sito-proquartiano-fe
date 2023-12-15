import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
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
import { useLocation, useParams } from "react-router-dom";
import "../styles/Favorites.scss";

interface RouteWrapperProps {
  title: string;
  description?: string;
  content: React.ReactNode;
  breadcrumb?: boolean;
  isArticle?: boolean;
  hasFavorites?: boolean;
}

// * too much article related stuff in component used by every route
function RouteWrapper({
  title,
  description = "",
  content,
  breadcrumb = true,
  isArticle = false,
  hasFavorites = true,
}: RouteWrapperProps) {
  const selectedArticle = useSelector((state: RootState) => state.selectedArticle.content);
  const previewData = useSelector((state: RootState) => state.previewData.content);
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.content);
  const location = useLocation();
  const currentUrl = location.pathname;
  const params = useParams();
  const [isFavorite, setIsFavorite] = useState(favorites.some(favorite => favorite.url === currentUrl));
  const handleAddToFavorites = () => {
    if (isFavorite) {
      dispatch({
        type: REMOVE_FROM_FAVORITES,
        payload: favorites.findIndex(favorite => favorite.url === currentUrl),
      });
    } else {
      dispatch({ type: ADD_TO_FAVORITES, payload: { url: currentUrl, title: title } });
    }
    setIsFavorite(!isFavorite);
  };
  const renderTooltip = (props: TooltipProps) => (
    <Tooltip id="button-tooltip" {...props}>
      {isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
    </Tooltip>
  );
  useEffect(() => {
    setIsFavorite(favorites.some(favorite => favorite.url === currentUrl));
  }, [currentUrl]);
  return (
    <main className="flex-grow-1 d-flex position-relative">
      {/* // ? what about this */}
      {/* <div className="position-fixed favorites-btn">
        <i className="by bi-star fs-5"></i>
      </div> */}
      <Container className="d-flex flex-column py-4 my-5 border shadow " style={{ backgroundColor: "white" }}>
        {/* // ? this title condition */}
        {title && (
          <div className="position-relative">
            {/* // ^ params.id !== "preview" and the like */}
            {hasFavorites && params.id !== "preview" && (
              <OverlayTrigger placement="left" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                <i
                  // todo customize border of filled star
                  className={`bi ${isFavorite ? "bi-bookmark-fill" : "bi-bookmark"} fs-4 position-absolute top-0 end-0`}
                  onClick={handleAddToFavorites}
                ></i>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-bookmark-fill  position-absolute top-0 end-0"
                  viewBox="0 0 16 16"
                  onClick={handleAddToFavorites}
                >
                  <path
                    d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"
                    fill={isFavorite ? "#ff313186" : "transparent"}
                    stroke="currentColor"
                    stroke-width="1"
                  />
                </svg> */}
              </OverlayTrigger>
            )}
            {breadcrumb && <MyBreadcrumb />}
            <header className="position-relative">
              <h1 className=" mb-3" style={{ marginTop: "1em" }}>
                {title}
              </h1>
              {isArticle && (
                <>
                  {params.id === "preview" ? (
                    <ArticleCategories categories={previewData.categories} />
                  ) : (
                    <ArticleCategories categories={selectedArticle.categories.map(category => category.name)} />
                  )}
                  <div className="my-1"></div>
                  {params.id === "preview" ? (
                    <ArticleDateAuthorTag date={previewData.date} author={previewData.author} tags={previewData.tags} />
                  ) : (
                    <ArticleDateAuthorTag
                      date={selectedArticle.date}
                      author={selectedArticle.author.signature}
                      tags={selectedArticle.tags.map(tag => tag.name)}
                    />
                  )}
                  {/* // todo make tooltip disappear after click */}
                </>
              )}
              {description && <p>{description}</p>}
            </header>
            <hr className="my-4" />
          </div>
        )}
        <div className="mt-3 mb-5">{content}</div>
        {title && <NavigationButtons />}
      </Container>
    </main>
  );
}

export default RouteWrapper;
