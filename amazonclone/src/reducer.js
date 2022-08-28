export const initialState = {
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  // basket:[],
  user: null,
  totalItem: 0,
  totalAmount: 0,
  //dark: false,
  dark: JSON.parse(localStorage.getItem("mode")) || false,
};

// Selector

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.rprice * item.quantity + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      const idValue = state.basket.filter(
        (basketItem) => basketItem.id == action.item.id
      );
      // console.log(idValue.length)
      if (idValue.length == 0) {
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
      } else {
        const quantIncr = state.basket.map((curElem) => {
          if (curElem.id == action.item.id) {
            return { ...curElem, quantity: curElem.quantity + 1 };
          }
          return curElem;
        });
        return {
          ...state,
          basket: quantIncr,
        };
      }

    // let Updated= state.basket.push(...state.basket, action.item)

    //  if(state.basket.includes(action.item))
    //  { console.log(action.item);
    //   const repeatId = state.basket.map((curElem) => {
    //     if (curElem.id !== action.item.id) {
    //       return {
    //         curElem
    //       };
    //     } else
    //     return { ...curElem, quantity: curElem.quantity + 1 };
    //   });
    //   return {
    //     ...state,
    //     basket: repeatId,
    //   };
    //  }
    //  else
    //   // const Updated= state.basket.push(action.item);
    //   return {
    //           ...state,
    //           basket: [...state.basket, action.item],
    //         };

    //   if(state.basket.length>=0) {
    //   return {
    //     ...state,
    //     basket: [...state.basket, action.item],
    //   };
    //   const something=state.basket.filter((curElem) => {
    //     if (curElem.id !== action.item.id) {
    //       return {
    //         curElem
    //       };
    //     } else
    //     return { ...curElem, quantity: curElem.quantity + 1 };
    //   });
    // }
    // else{
    //   const repeatId = state.basket.map((curElem) => {
    //     if (curElem.id !== action.item.id) {
    //       return {
    //         curElem
    //       };
    //     } else
    //     return { ...curElem, quantity: curElem.quantity + 1 };
    //   });

    //   return {
    //     ...state,
    //     basket: repeatId,
    //   };
    // }

    // real ye tha pehly
    // return {
    //       ...state,
    //       basket: [...state.basket, action.item],
    //     };

    // const repeatId = for (const state.basket of elements) {
    //   return (elements==action.item)
    // }
    //       let newBasket = [...state.basket];

    // if (repeatId.id == 1) {
    //   newBasket.splice(index, 1);
    // } else {
    //   console.warn(
    //     `Cant remove product (id: ${action.id}) as its not in basket!`
    //   );
    // }
    // return {
    //   ...state,
    //   basket: newBasket };,

    //  const repeatId= state.basket.map((curElem) => {
    //       if (curElem.id !== action.item.id) {
    //         return {

    //           basket: [...state.basket,action.item],
    //         };
    //       }
    //       else
    //       return { ...curElem, quantity: curElem.quantity + 1 }
    //     })

    //     return {
    //       ...state,
    //       basket: repeatId,
    //     };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id == action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "INCREMENT":
      const updatedCart = state.basket.map((curElem) => {
        if (curElem.id == action.payload) {
          return { ...curElem, quantity: curElem.quantity + 1 };
        }
        return curElem;
      });
      return {
        ...state,
        basket: updatedCart,
      };
    // const updatedCart = state.item.map((curElem) => {
    //   if (curElem.id === action.payload) {
    //     return { ...curElem, quantity: curElem.quantity + 1 };
    //   }
    //   return curElem;
    // });

    // return { ...state, item: updatedCart };

    case "DECREMENT": {
      const updatedCart = state.basket
        .map((curElem) => {
          if (curElem.id == action.payload) {
            return { ...curElem, quantity: curElem.quantity - 1 };
          }
          return curElem;
        })
        .filter((curElem) => curElem.quantity !== 0);
      return { ...state, basket: updatedCart };
    }

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_DARK_THEME":
      return {
        ...state,
        dark: action.setmode,
      };

    case "GET_TOTAL":
      let { totalItem, totalAmount } = state.basket.reduce(
        (accum, curVal) => {
          let { rprice, quantity } = curVal;

          let updatedTotalAmount = rprice * quantity;
          accum.totalAmount += updatedTotalAmount;

          accum.totalItem += quantity;
          return accum;
        },
        {
          totalItem: 0,
          totalAmount: 0,
        }
      );
      return { ...state, totalItem, totalAmount };

    default:
      return state;
  }
};

export default reducer;
