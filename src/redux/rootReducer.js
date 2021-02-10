import { combineReducers } from "redux";
import articles from "./modules/articles/reducer";
import users from "./modules/users/reducer";
import photos from "./modules/photos/reducer";

const rootReducer = combineReducers({
  articles,
  users,
  photos,
});

export default rootReducer;