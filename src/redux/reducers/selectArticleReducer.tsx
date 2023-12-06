import { IArticleApiResponse } from "../../interfaces/IArticleApi";
import { SELECT_ARTICLE } from "../actions";

interface selectedArticleAction {
  type: typeof SELECT_ARTICLE;
  payload: IArticleApiResponse; // Replace with your actual payload type
}

const initialState = {
  content: {} as IArticleApiResponse,
};

const selectedArticleReducer = (state = initialState, action: selectedArticleAction) => {
  switch (action.type) {
    case SELECT_ARTICLE:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default selectedArticleReducer;
