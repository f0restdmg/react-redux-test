import { photosTypes } from "./action-types";

const photos = (state = [], action) => {
  switch (action.type) {
    case photosTypes.SET_PHOTOS:
      return [...state, ...action.payload];
    case photosTypes.ADD_PHOTO:
      return [...state, action.payload];
    case photosTypes.EDIT_PHOTO:
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    case photosTypes.DELETE_PHOTO:
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
};

export default photos;