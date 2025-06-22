import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        i => i.id === item.id && i.size === item.size
      );
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id && i.size === item.size
            ? { ...i, qty: parseInt(i.qty) + parseInt(item.qty) }
            : i
        );
      }
      return [...prevItems, item];
    });
  };

  const updateQty = (id, size, qty) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.size === size
          ? { ...item, qty }
          : item
      )
    );
  };

  const removeFromCart = (id, size) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === id && item.size === size))
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};








// import React, { createContext, useState } from 'react';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (item) => {
//     setCartItems(prevItems => {
//       const existingItem = prevItems.find(
//         i => i.id === item.id && i.size === item.size
//       );
//       if (existingItem) {
//         return prevItems.map(i =>
//           i.id === item.id && i.size === item.size
//             ? { ...i, qty: parseInt(i.qty) + parseInt(item.qty) }
//             : i
//         );
//       }
//       return [...prevItems, item];
//     });
//   };

//   const updateQty = (id, size, qty) => {
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === id && item.size === size
//           ? { ...item, qty }
//           : item
//       )
//     );
//   };

//   const removeFromCart = (id, size) => {
//     setCartItems(prevItems =>
//       prevItems.filter(item => !(item.id === id && item.size === size))
//     );
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
