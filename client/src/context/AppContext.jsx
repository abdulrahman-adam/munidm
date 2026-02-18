// import { useContext, useEffect, useState } from "react";
// import { createContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom"; // Add useLocation
// import toast from "react-hot-toast";
// import axios from "axios";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
// export const AppContext = createContext();
// export const AppContextProvider = ({children}) => {
//     const currency = import.meta.env.VITE_CURRENCY;

//     const location = useLocation(); // <--- Get the current URL location
//     const navigate = useNavigate();
//     const [orders, setOrders] = useState([]);
//     // The state of user
//     const [user, setUser] = useState(null);
//     // The state of isSeller
//     const [isSeller, setIsSeller] = useState(false);
//     const [userData, setUserData] = useState(null); // The state
//     // The state of user Login
//     const [showUserLogin, setShowUserLogin] = useState(false);
//     // The state of fetching the products
//     const [products, setProducts] = useState([]);
//     // The state of fetching the Categories
//     const [categories, setCategories] = useState([]);
//     //The state of CartItems
//     const [cartItems, setCartItems] = useState({})
//     // The state of searchQuery
//     // const [searchQuery, setSearchQuery] = useState({})
//     const [searchQuery, setSearchQuery] = useState("")

//     const [contacts, setContacts] = useState([]);
    

    
//     // The function verify Admin Status || Admin is logged or not
//     const fetchSeller = async () => {
//         try {
//             // Calling tha API
//             const {data} = await axios.get("/api/seller/is-auth");
//             // Cheacking the data
//             if(data.success) {
//                 setIsSeller(true);
//             }else {
//                 setIsSeller(false);
//             }
//         } catch (error) {
//             setIsSeller(false);
//         }
//     }

//     // The function verify User Status || User is logged or not User Data and cart items
   

//     const fetchUser = async () => {
//     try {
//         const { data } = await axios.get("/api/user/is-auth");
//         if (data.success) {
//             setUser(data.user);
            
//             // FIX: If cartItems is a string (common with MySQL JSON columns), parse it
//             let rawCart = data.user.cartItems;
//             if (typeof rawCart === "string") {
//                 try {
//                     // Sometimes data arrives double-stringified, we parse until it's an object
//                     while (typeof rawCart === "string") {
//                         rawCart = JSON.parse(rawCart);
//                     }
//                     setCartItems(rawCart);
//                 } catch (e) {
//                     setCartItems({});
//                 }
//             } else {
//                 setCartItems(rawCart || {});
//             }
//         }
//     } catch (error) {
//         setUser(null);
//     }
// }


//     // Fetching Products function
//     const fetchProducts = async () => {
//         // Getting the products from the database
//         try {
//             // Calling the API
//             const {data} = await axios.get("/api/product/list");
//             // Cheacking the response
//             if(data.success) {
//                 setProducts(data.products);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);  
//         }
//     }


//     // Delete Product function
// const deleteProduct = async (productId) => {
//     try {
//         // Send DELETE request with the product ID in the request body
//         const { data } = await axios.delete('/api/product/delete', {
//             data: { id: productId }  // Send the product ID in the request body
//         });

//         if (data.success) {
//             // If successful, show success message
//             toast.success('The Product has been deleted successfully!');
//             // Remove the deleted product from the state (to update UI)
//             setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
//         } else {
//             toast.error(data.message);
//         }
//     } catch (error) {
//         toast.error(error.message);
//     }
// };


//  // Fetching Categories function
//     const fetchCategories = async () => {
//         // Getting the Categories from the database
//         try {
//             // Calling the API
//             const {data} = await axios.get("/api/category/list");
//             // Cheacking the response
//             if(data.success) {
//                 setCategories(data.categories);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);  
//         }
//     }

//   // Delete Product function


// const deleteCategory = async (categoryId) => {
//     try {
//         // Must be .post to match the router above
//         const { data } = await axios.post('/api/category/delete', { id: categoryId });

//         if (data.success) {
//             toast.success('Deleted successfully!');
//             // Remember to use .id (MySQL) not .id (MongoDB)
//             setCategories(prev => prev.filter(cat => cat.id !== categoryId));
//         }
//     } catch (error) {
//         toast.error(error.message);
//     }
// };
//     // The Function Add Product to cart
   

//     const addToCart = (itemId) => {
//     // 1. SAFETY CHECK: If itemId is missing or null, stop immediately
//     if (!itemId) {
//         console.error("addToCart was called without a valid ID");
//         return;
//     }

//     // 2. Ensure we are working with an object (prevents the "not an object" crash)
//     let currentCart = cartItems;
//     if (typeof cartItems !== 'object' || cartItems === null) {
//         currentCart = {};
//     }

//     let cartData = structuredClone(currentCart);

//     // 3. Logic to add or increment
//     if (cartData[itemId]) {
//         cartData[itemId] += 1;
//     } else {
//         cartData[itemId] = 1;
//     }

//     setCartItems(cartData);
//     toast.success("Added to cart ✨🛒");
// };

//     // The function Update Cart item quantity
//     const updateCartItems = (itemId, quantity) => {
//         // Create a copy of cartItems
//         let cartData = structuredClone(cartItems);
//         cartData[itemId] = quantity;
//         setCartItems(cartData);
//         toast.success("Your cart has been updated 🛍️➕");
//     }
// //     const updateCartItems = (itemId, quantity) => {
// //     // 1. Ensure itemId is valid
// //     if (!itemId || itemId === "undefined") return;

// //     // 2. Safety check: If cartItems somehow became a string, parse it or reset it
// //     let currentCart = cartItems;
// //     if (typeof cartItems === 'string') {
// //         try {
// //             currentCart = JSON.parse(cartItems);
// //         } catch (e) {
// //             currentCart = {};
// //         }
// //     }

// //     let cartData = structuredClone(currentCart);
// //     cartData[itemId] = quantity;
// //     setCartItems(cartData);
// //     toast.success("Your cart has been updated 🛍️➕");
// // }

//     // The function remove Product from cartItems
//     const removeFromCart = (itemId) => {
//         // Create a copy of cartItems
//         let cartData = structuredClone(cartItems);
//         if(cartData[itemId]) {
//             cartData[itemId] -= 1;
//             if(cartData[itemId] === 0) {
//                 delete cartData[itemId];
//             }
//         }

//         toast.success("The Item has been removed from your cart ❌🛍️");
//         setCartItems(cartData);
//     }

//     // The function cart count
//     const getCartCount = () => {
//         let totalCount = 0;
//         for(const item in cartItems) {
//             totalCount += cartItems[item];
//         }
//         return totalCount;
//     }

//     // The function get Cart total Amount
    
//     // The function get Cart total Amount
// const getCartAmount = () => {
//     let totalAmount = 0;
//     for (const items in cartItems) {
//         // items is the ID from the cart (usually a string)
//         // Convert both to String to ensure they match correctly
//         let itemInfo = products.find((product) => String(product.id) === String(items));
        
//         // FIX: Only calculate if itemInfo was actually found
//         if (itemInfo && cartItems[items] > 0) {
//             totalAmount += itemInfo.offerPrice * cartItems[items];
//         }
//     }
//     return Math.floor(totalAmount * 100) / 100;
// }

//   const fetchOrders = async () => {
//   try {
//     const { data } = await axios.get("/api/order/seller");
//     if (data.success) setOrders(data.orders);
//   } catch (error) {
//     toast.error(error.message);
//   }
// };

// const deleteOrder = async (orderId) => {
//   try {
//     const { data } = await axios.delete(`/api/order/delete/${orderId}`);
//     if (data.success) {
//       toast.success(data.message);
//       setOrders(prev => prev.filter(o => o.id !== orderId)); // update context state
//       return true;
//     } else {
//       toast.error(data.message);
//       return false;
//     }
//   } catch (error) {
//     toast.error(error.message);
//     return false;
//   }
// };


//     // Calling the function fetchProducts when ant component has loaded
//     useEffect(() => {
//         fetchUser();
//         fetchSeller();
//         fetchProducts();
//         fetchCategories();
//     }, [])


   


//     useEffect(() => {
//     const updateCart = async () => {
//         try {
//             // Only sync if user is logged in AND cart has actual data
//             if (user && Object.keys(cartItems).length > 0) {
//                 const { data } = await axios.post("/api/cart/update", { cartItems });
                
//                 if (!data.success) {
//                     toast.error(data.message);
//                 }
//             }
//         } catch (error) {
//             // If you see "Network Error" here, it's because the server crashed
//             console.error("Cart Sync Error:", error.message);
//         }
//     };

//     // Use a small timeout to "debounce" the request
//     const delayDebounce = setTimeout(() => {
//         if (user) {
//             updateCart();
//         }
//     }, 500); // Wait 500ms after last click before hitting the server

//     return () => clearTimeout(delayDebounce);
// }, [cartItems, user]);


// // Function to fetch all contact messages from MySQL
//   // Function to fetch all contact messages from MySQL
// const getAllContacts = async () => {
//     try {
//         // We use the baseURL set at the top, or force it if needed
//         const { data } = await axios.get(`/api/contact/all`);

//         if (data.success) {
//             // Check if data.data exists (Sequelize returns rows in data.data here)
//             setContacts(data.data || []); 
//         } else {
//             toast.error(data.message);
//         }
//     } catch (error) {
//         console.error("Fetch Contacts Error:", error);
//         // If the error is 404, double check your backend route naming
//         if (error.response && error.response.status === 404) {
//             console.warn("Route /api/contact/all not found on server.");
//         }
//     }
// };

//   // Function to delete a contact message
//   const deleteContact = async (id) => {
//     try {
//       const { data } = await axios.delete(`/api/contact/delete/${id}`);

//       if (data.success) {
//         toast.success(data.message);
//         // Refresh the list immediately after deleting
//         getAllContacts();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   // Fetch contacts on load if needed
//   useEffect(() => {
//     getAllContacts();
//   }, []);

//     // On access ths State vaiables in any other component
//     const value = {

//         currency,
//         navigate, 
//         user, 
//         setUser, 
//         isSeller, 
//         setIsSeller, 
//         showUserLogin, 
//         setShowUserLogin,
//         products,
//         addToCart,
//         updateCartItems,
//         removeFromCart,
//         cartItems,
//         setCartItems,
//         searchQuery, setSearchQuery,
//         getCartAmount, getCartCount,
//         axios, fetchProducts, deleteProduct,
//         deleteOrder, orders,fetchOrders,
//         fetchCategories, categories, setCategories,deleteCategory,
//         userData,    // The variable
//         setUserData, // The function <--- MAKE SURE THIS IS HERE
//         getAllContacts,
//         deleteContact,
//         contacts,         // <--- CRITICAL: Make sure this is here!
//         setContacts,
//     };

//     return <AppContext.Provider value={value}>
//         {children}
//     </AppContext.Provider>
// }


// export const useAppContext = () => {
//   return useContext(AppContext);
// };




import { useContext, useEffect, useState, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [userData, setUserData] = useState(null);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [contacts, setContacts] = useState([]);

    // --- 1. FONCTIONS D'AUTHENTIFICATION (SILENCIEUSES) ---

    const fetchSeller = async () => {
        try {
            const { data } = await axios.get("/api/seller/is-auth");
            setIsSeller(data.success);
        } catch (error) {
            setIsSeller(false);
        }
    };

    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/is-auth");
            if (data.success) {
                setUser(data.user);
                let rawCart = data.user.cartItems;
                if (typeof rawCart === "string") {
                    try {
                        while (typeof rawCart === "string") { rawCart = JSON.parse(rawCart); }
                        setCartItems(rawCart);
                    } catch (e) { setCartItems({}); }
                } else {
                    setCartItems(rawCart || {});
                }
            }
        } catch (error) {
            setUser(null);
        }
    };

    // --- 2. CHARGEMENT DES DONNÉES ---

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("/api/product/list");
            if (data.success) setProducts(data.products);
        } catch (error) {
            console.error("Erreur produits:", error.message);
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get("/api/category/list");
            if (data.success) setCategories(data.categories);
        } catch (error) {
            console.error("Erreur catégories:", error.message);
        }
    };

    const getAllContacts = async () => {
        // N'appelle l'API QUE si on sait que c'est un vendeur
        if (!isSeller) return; 
        try {
            const { data } = await axios.get(`/api/contact/all`);
            if (data.success) setContacts(data.data || []);
        } catch (error) {
            console.error("Erreur contacts:", error.message);
        }
    };

    // --- 3. ACTIONS UTILISATEUR (AVEC TOASTS) ---

    const deleteProduct = async (productId) => {
        try {
            const { data } = await axios.delete('/api/product/delete', { data: { id: productId } });
            if (data.success) {
                toast.success('Product deleted!');
                setProducts(prev => prev.filter(p => p.id !== productId));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    // Delete Category Function

    const deleteCategory = async (categoryId) => {
    try {
        // Must be .post to match the router above
        const { data } = await axios.post('/api/category/delete', { id: categoryId });

        if (data.success) {
            toast.success('Deleted successfully!');
            // Remember to use .id (MySQL) not .id (MongoDB)
            setCategories(prev => prev.filter(cat => cat.id !== categoryId));
        }
    } catch (error) {
        toast.error(error.message);
    }
};

    const addToCart = (itemId) => {
        if (!itemId) return;
        let cartData = structuredClone(cartItems || {});
        cartData[itemId] = (cartData[itemId] || 0) + 1;
        setCartItems(cartData);
        toast.success("Added to cart ✨");
    };

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] <= 0) delete cartData[itemId];
        }
        setCartItems(cartData);
        toast.success("Removed from cart");
    };

    const getCartCount = () => Object.values(cartItems).reduce((a, b) => a + b, 0);

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const id in cartItems) {
            let itemInfo = products.find((p) => String(p.id) === String(id));
            if (itemInfo) totalAmount += itemInfo.offerPrice * cartItems[id];
        }
        return Math.floor(totalAmount * 100) / 100;
    };


    const updateCartItems = (itemId, quantity) => {
    // 1. Ensure itemId is valid
    if (!itemId || itemId === "undefined") return;

    // 2. Safety check: If cartItems somehow became a string, parse it or reset it
    let currentCart = cartItems;
    if (typeof cartItems === 'string') {
        try {
            currentCart = JSON.parse(cartItems);
        } catch (e) {
            currentCart = {};
        }
    }

    let cartData = structuredClone(currentCart);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Your cart has been updated 🛍️➕");
}




const deleteOrder = async (orderId) => {
  try {
    const { data } = await axios.delete(`/api/order/delete/${orderId}`);
    if (data.success) {
      toast.success(data.message);
      setOrders(prev => prev.filter(o => o.id !== orderId)); // update context state
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    toast.error(error.message);
    return false;
  }
};

    // Chargement initial
    useEffect(() => {
        const init = async () => {
            await fetchUser();
            await fetchSeller();
            fetchProducts();
            fetchCategories();
        };
        init();
    }, []);

    // Chargement spécifique vendeur
    useEffect(() => {
        if (isSeller) {
            getAllContacts();
        }
    }, [isSeller]);

    // Sync du panier
    useEffect(() => {
        const updateCart = async () => {
            try {
                if (user && Object.keys(cartItems).length > 0) {
                    await axios.post("/api/cart/update", { cartItems });
                }
            } catch (error) {
                console.error("Cart Sync Error");
            }
        };
        const delay = setTimeout(() => { if (user) updateCart(); }, 500);
        return () => clearTimeout(delay);
    }, [cartItems, user]);


    //   // Function to delete a contact message
  const deleteContact = async (id) => {
    try {
      const { data } = await axios.delete(`/api/contact/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        // Refresh the list immediately after deleting
        getAllContacts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

    const value = {
        currency, navigate, user, setUser, isSeller, setIsSeller,
        showUserLogin, setShowUserLogin, products, addToCart,
        cartItems, setCartItems, removeFromCart, getCartCount, getCartAmount,
        axios, fetchProducts, deleteProduct, deleteCategory, categories, contacts, setContacts,
        getAllContacts, userData, setUserData, setSearchQuery,
        searchQuery, setSearchQuery,updateCartItems,deleteOrder,deleteContact
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);