import { combineReducers } from "redux";
import articles from '../reducers/articlesReducer'

const rootReducer = combineReducers({
  articles
});

export default rootReducer;