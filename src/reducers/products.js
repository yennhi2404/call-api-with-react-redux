import * as Types from "./../constants/ActionType";

var initialState = [];
// {
//   id: 1,
//   name: "Iphone 6 Plus",
//   price: 400,
//   status: true,
// },
// {
//   id: 2,
//   name: "Samsung galaxy S7 Edge",
//   price: 700,
//   status: false,
// },
// {
//   id: 3,
//   name: "Oppo F1S",
//   price: 300,
//   status: true,
// },

var findIndex = (products, id) => {
  var result = -1;
  products.forEach((product, index) => {
    if (product.id === id) {
      result = index;
    }
  });
  return result;
};

const products = (state = initialState, action) => {
  var index = -1;
  var { id, product } = action;
  switch (action.type) {
    case Types.FETCH_PRODUCTS:
      state = action.products;
      return [...state];
    case Types.DELETE_PRODUCT:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    case Types.ADD_PRODUCT:
      state.push(action.product);
      return [...state];
    case Types.UPDATE_PRODUCT:
      index = findIndex(state, product.id);
      state[index] = product;
      return [...state];
    default:
      return [...state];
  }
};

export default products;
