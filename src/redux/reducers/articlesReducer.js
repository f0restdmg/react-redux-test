const articles = (state = [], action) => {
  switch (action.type) {
    case "SET_ARTICLES":
      return [...state, ...action.payload];
    case "ADD_ARTICLE":
      return [...state, action.payload];
    case "EDIT_ARTICLE": 
      return state.map(item => {
       if (item.id === action.payload.id) {
         item.title = action.payload.title;
         item.body = action.payload.body
       } 
       return item;
      })
    case "DELETE_ARTICLE":
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
};

export default articles;
