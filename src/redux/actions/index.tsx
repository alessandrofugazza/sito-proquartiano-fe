import { Action, ThunkAction } from "@reduxjs/toolkit";
import { IArticleApiResponse } from "../../interfaces/IArticleApi";
import { RootState } from "../store";

export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const SELECT_ARTICLE = "SELECT_ARTICLE";
// export const GET_ARTICLES = "GET_ARTICLES";
// export const GET_ARTICLES_LOADING_ON = "GET_ARTICLES_LOADING_ON";
// export const GET_ARTICLES_LOADING_OFF = "GET_ARTICLES_LOADING_OFF";
// export const GET_ARTICLES_ERROR_ON = "GET_ARTICLES_ERROR_ON";
// export const GET_ARTICLES_ERROR_OFF = "GET_ARTICLES_ERROR_OFF";

export const addToFavoritesAction = (
  currentUrl: string,
  currentTitle: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  // learn wtf is going on here
  return (dispatch, getState) => {
    const currentState = getState();
    const checkPageInFavorites = currentState.favorites.content.findIndex(favorite => favorite.url === currentUrl);

    if (checkPageInFavorites === -1) {
      dispatch({ type: ADD_TO_FAVORITES, payload: { url: currentUrl, title: currentTitle } });
    } else {
      console.log("already favorite");
    }
  };
};

export const removeFromFavoritesAction = (i: number): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch, getState) => {
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: i });
  };
};

export const selectArticleAction = (
  selectedArticle: IArticleApiResponse
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch, getState) => {
    dispatch({ type: SELECT_ARTICLE, payload: selectedArticle });
  };
};
