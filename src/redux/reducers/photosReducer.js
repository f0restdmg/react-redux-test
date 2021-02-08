const photos = (state = [], action) => {
  switch (action.type) {
    case "SET_PHOTOS":
      return [...state, ...action.payload];
    case "ADD_PHOTO":
      return [...state, action.payload];
    case "EDIT_PHOTO": 
      return state.map(item => {
       if (item.id === action.payload.id) {
         item.title = action.payload.title;
         item.url = action.payload.url;
       } 
       return item;
      })
    case "DELETE_PHOTO":
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
};

export default photos;