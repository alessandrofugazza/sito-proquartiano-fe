import { UPDATE_PREVIOUS_URL } from "../actions";

const initialState = {
  previousUrl: "",
};

const updatePreviousUrlReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PREVIOUS_URL:
      return {
        ...state,
        previousUrl: window.location.href,
      };

    default:
      return state;
  }
};

export default updatePreviousUrlReducer;
