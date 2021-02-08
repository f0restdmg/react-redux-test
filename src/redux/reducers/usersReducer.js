const users = (state = [], action) => {
  switch (action.type) {
    case "SET_USERS":
      return [...state, ...action.payload];
    case "ADD_USER":
      return [...state, action.payload];
    case "EDIT_USER": 
      return state.map(item => {
       if (item.id === action.payload.id) {
         item.name = action.payload.name;
         item.email = action.payload.email;
         item.phone = action.payload.phone;
         item.username = action.payload.username;
         item.website = action.payload.website;
       } 
       return item;
      })
    case "DELETE_USER":
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
};

export default users;
