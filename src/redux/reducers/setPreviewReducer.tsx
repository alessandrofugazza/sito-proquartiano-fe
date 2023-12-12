import { IArticleApiResponse } from "../../interfaces/IArticleApi";
import { IAddArticlePreviewProps } from "../../interfaces/IAddArticlePreviewProps";
import { SET_PREVIEW } from "../actions";

interface setPreviewAction {
  type: typeof SET_PREVIEW;
  payload: IAddArticlePreviewProps;
}

const initialState = {
  content: {} as IAddArticlePreviewProps,
};

const setPreviewReducer = (state = initialState, action: setPreviewAction) => {
  switch (action.type) {
    case SET_PREVIEW:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default setPreviewReducer;
