const articleDetail = (state = [], action) => {
  switch (action.type) {
    case "SELECT_ARTICLE":
      return action.payload;
    default:
      return state;
  }
};

export default articleDetail;
