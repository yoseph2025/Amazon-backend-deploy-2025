import { type } from "./ActionType.js";

export const initialState = {
  basket: [],
  user: null
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case type.ADD_TO_BASKET: {
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (existingItem) {
        return {
          ...state,
          basket: state.basket.map((item) =>
            item.id === action.item.id
              ? { ...item, amount: item.amount + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        basket: [...state.basket, { ...action.item, amount: 1 }],
      };
    }

    case type.REMOVE_FROM_BASKET: {
      const index = state.basket.findIndex((item) => item.id === action.id);

      if (index === -1) {
        return state;
      }

      const updatedBasket = [...state.basket];

      if (updatedBasket[index].amount > 1) {
        updatedBasket[index] = {
          ...updatedBasket[index],
          amount: updatedBasket[index].amount - 1,
        };
      } else {
        updatedBasket.splice(index, 1);
      }

      return {
        ...state,
        basket: updatedBasket,
      };
    }
case type.SET_USER:
  return{
    ...state, user: action.user
  }
    default:
      return state;
  }
};
