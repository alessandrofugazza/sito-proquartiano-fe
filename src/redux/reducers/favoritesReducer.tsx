import { IArticleApiResponse } from "../../interfaces/IArticleApi";
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../actions";

interface IFavorite {
  url: string;
  title: string;
}

interface AddToFavoritesAction {
  type: typeof ADD_TO_FAVORITES;
  payload: IFavorite;
}

interface RemoveFromFavoritesAction {
  type: typeof REMOVE_FROM_FAVORITES;
  payload: number;
}

type FavoritesActions = AddToFavoritesAction | RemoveFromFavoritesAction;

const initialState = {
  content: [] as IFavorite[],
};

const favoritesReducer = (state = initialState, action: FavoritesActions) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        content: [...state.content, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        content: state.content.filter((_, i) => i !== action.payload),
      };
    default:
      return state;
  }
};

export default favoritesReducer;
