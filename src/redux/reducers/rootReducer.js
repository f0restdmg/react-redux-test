import { combineReducers } from "redux";
import articles from "../reducers/articlesReducer";
import users from "../reducers/usersReducer";
import photos from "../reducers/photosReducer";

const rootReducer = combineReducers({
  articles,
  users,
  photos,
});

export default rootReducer;