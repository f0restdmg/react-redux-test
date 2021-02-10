import { usersTypes } from "./action-types";

export const addUser = (payload) => ({
  type: usersTypes.ADD_USER,
  payload,
});

export const delUser = (payload) => ({
  type: usersTypes.DELETE_USER,
  id: payload,
});

export const editUser = (payload) => ({
  type: usersTypes.EDIT_USER,
  payload,
});

export const getUsers = (payload) => ({
  type: usersTypes.SET_USERS,
  payload,
});
