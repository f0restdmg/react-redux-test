import { photosTypes } from "./action-types";

export const addPhoto = (payload) => ({
  type: photosTypes.ADD_PHOTO,
  payload,
});

export const delPhoto = (payload) => ({
  type: photosTypes.DELETE_PHOTO,
  id: payload,
});

export const editPhoto = (payload) => ({
  type: photosTypes.EDIT_PHOTO,
  payload,
});

export const getPhotos = (payload) => ({
  type: photosTypes.SET_PHOTOS,
  payload,
});
