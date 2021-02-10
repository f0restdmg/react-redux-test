import { articlesTypes } from "./action-types";

const articles = (state = [], action) => {
  switch (action.type) {
    case "SET_ARTICLES":
      return [...state, ...action.payload];
    case articlesTypes.ADD_ARTICLE:
      return [...state, action.payload];
    case articlesTypes.EDIT_ARTICLE:
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    case articlesTypes.DELETE_ARTICLE:
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
};

export default articles;