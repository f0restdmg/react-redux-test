const articles = (state = [], action) => {
  switch (action.type) {
    case "SET_ARTICLES":
      return [
        ...state,
        ...action.payload
      ]
    default:
      return state;
  }
};

export default articles;
