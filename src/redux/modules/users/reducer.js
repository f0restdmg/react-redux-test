import { usersTypes } from "./action-types";

export const users = (state = [], action) => {
  switch (action.type) {
    case usersTypes.SET_USERS:
      return [...state, ...action.payload];
    case usersTypes.ADD_USER:
      return [...state, action.payload];
    case usersTypes.EDIT_USER:
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    case usersTypes.DELETE_USER:
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
};

export default users;