import { articlesTypes } from "./action-types";

export const addArticle = (payload) => ({
  type: articlesTypes.ADD_ARTICLE,
  payload,
});

export const delArticle = (payload) => ({
  type: articlesTypes.DELETE_ARTICLE,
  id: payload,
});

export const editArticle = (payload) => ({
  type: articlesTypes.EDIT_ARTICLE,
  payload,
});

export const getArticles = (payload) => ({
  type: articlesTypes.SET_ARTICLES,
  payload,
});