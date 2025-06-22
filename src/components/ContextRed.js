import React, { createContext, useReducer, useContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, { qty: action.qty, size: action.size, name: action.name, img: action.img }];
    default:
      console.log("Error in Reducer");
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);






// import React, { createContext, useReducer } from 'react'
// import { useContext } from 'react';
// const CartStateContext = createContext();
// const CartDispatchContext = createContext();

// const reducer = (state,action)=>{
// switch(action.type){
//     case"ADD":
//     return[...state,{qty:action.qty,size:action.size}]
    
//     default:
//         console.log("Error in Reducer");
// }
// }

// export const CartProvider = ({children})=>{
//     const[state,dispatch] = useReducer(reducer,[])
//     return(
// <CartDispatchContext.Provider value={dispatch}>
//     <CartDispatchContext.Provider value={state}>
//         {children}
//     </CartDispatchContext.Provider>
// </CartDispatchContext.Provider>
//     )
// }
// export const useCart = () => useContext(CartStateContext);
// export const useDispatchCart = () => useContext(CartDispatchContext);
