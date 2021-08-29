import { helperConstants } from "./constants";

// themeAction
export const themeAction = (themeName) => {
  return async (dispatch) => {
    dispatch({
      type: helperConstants.THEME_CHANGE_REQUEST,
      payload: {
        themeName,
      },
    });
  };
};

// searchAction
export const searchAction = (searchText) => {
  return async (dispatch) => {
    dispatch({
      type: helperConstants.SEARCH_CHANGE_REQUEST,
      payload: {
        searchText,
      },
    });
  };
};

// changeMargin
export const changeMargin = (marginTop) => {
  return async (dispatch) => {
    dispatch({
      type: helperConstants.MARGIN_CHANGE_REQUEST,
      payload: {
        marginTop,
      },
    });
  };
};
