

// import { useContext, useEffect, useState, createContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//     const currency = import.meta.env.VITE_CURRENCY;
//     const navigate = useNavigate();

//     const [orders, setOrders] = useState([]);
//     const [user, setUser] = useState(null);
//     const [isSeller, setIsSeller] = useState(false);
//     const [userData, setUserData] = useState(null);
//     const [showUserLogin, setShowUserLogin] = useState(false);
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [cartItems, setCartItems] = useState({});
//     const [searchQuery, setSearchQuery] = useState("");
//     const [contacts, setContacts] = useState([]);

//     // --- 1. FONCTIONS D'AUTHENTIFICATION (SILENCIEUSES) ---

//     const fetchSeller = async () => {
//         try {
//             const { data } = await axios.get("/api/seller/is-auth");
//             setIsSeller(data.success);
//         } catch (error) {
//             setIsSeller(false);
//         }
//     };

//     const fetchUser = async () => {
//         try {
//             const { data } = await axios.get("/api/user/is-auth");
//             if (data.success) {
//                 setUser(data.user);
//                 let rawCart = data.user.cartItems;
//                 if (typeof rawCart === "string") {
//                     try {
//                         while (typeof rawCart === "string") { rawCart = JSON.parse(rawCart); }
//                         setCartItems(rawCart);
//                     } catch (e) { setCartItems({}); }
//                 } else {
//                     setCartItems(rawCart || {});
//                 }
//             }
//         } catch (error) {
//             setUser(null);
//         }
//     };

//     // --- 2. CHARGEMENT DES DONNÉES ---

//     const fetchProducts = async () => {
//         try {
//             const { data } = await axios.get("/api/product/list");
//             if (data.success) setProducts(data.products);
//         } catch (error) {
//             console.error("Erreur produits:", error.message);
//         }
//     };

//     const fetchCategories = async () => {
//         try {
//             const { data } = await axios.get("/api/category/list");
//             if (data.success) setCategories(data.categories);
//         } catch (error) {
//             console.error("Erreur catégories:", error.message);
//         }
//     };

//     const getAllContacts = async () => {
//         // N'appelle l'API QUE si on sait que c'est un vendeur
//         if (!isSeller) return; 
//         try {
//             const { data } = await axios.get(`/api/contact/all`);
//             if (data.success) setContacts(data.data || []);
//         } catch (error) {
//             console.error("Erreur contacts:", error.message);
//         }
//     };

//     // --- 3. ACTIONS UTILISATEUR (AVEC TOASTS) ---

//     const deleteProduct = async (productId) => {
//         try {
//             const { data } = await axios.delete('/api/product/delete', { data: { id: productId } });
//             if (data.success) {
//                 toast.success('Product deleted!');
//                 setProducts(prev => prev.filter(p => p.id !== productId));
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error("Delete failed");
//         }
//     };

//     // Delete Category Function

//     const deleteCategory = async (categoryId) => {
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

//     const addToCart = (itemId) => {
//         if (!itemId) return;
//         let cartData = structuredClone(cartItems || {});
//         cartData[itemId] = (cartData[itemId] || 0) + 1;
//         setCartItems(cartData);
//         toast.success("Added to cart ✨");
//     };

//     const removeFromCart = (itemId) => {
//         let cartData = structuredClone(cartItems);
//         if (cartData[itemId]) {
//             cartData[itemId] -= 1;
//             if (cartData[itemId] <= 0) delete cartData[itemId];
//         }
//         setCartItems(cartData);
//         toast.success("Removed from cart");
//     };

//     const getCartCount = () => Object.values(cartItems).reduce((a, b) => a + b, 0);

//     const getCartAmount = () => {
//         let totalAmount = 0;
//         for (const id in cartItems) {
//             let itemInfo = products.find((p) => String(p.id) === String(id));
//             if (itemInfo) totalAmount += itemInfo.offerPrice * cartItems[id];
//         }
//         return Math.floor(totalAmount * 100) / 100;
//     };


//     const updateCartItems = (itemId, quantity) => {
//     // 1. Ensure itemId is valid
//     if (!itemId || itemId === "undefined") return;

//     // 2. Safety check: If cartItems somehow became a string, parse it or reset it
//     let currentCart = cartItems;
//     if (typeof cartItems === 'string') {
//         try {
//             currentCart = JSON.parse(cartItems);
//         } catch (e) {
//             currentCart = {};
//         }
//     }

//     let cartData = structuredClone(currentCart);
//     cartData[itemId] = quantity;
//     setCartItems(cartData);
//     toast.success("Your cart has been updated 🛍️➕");
// }




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

//     // Chargement initial
//     useEffect(() => {
//         const init = async () => {
//             await fetchUser();
//             await fetchSeller();
//             fetchProducts();
//             fetchCategories();
//         };
//         init();
//     }, []);

//     // Chargement spécifique vendeur
//     useEffect(() => {
//         if (isSeller) {
//             getAllContacts();
//         }
//     }, [isSeller]);

//     // Sync du panier
//     useEffect(() => {
//         const updateCart = async () => {
//             try {
//                 if (user && Object.keys(cartItems).length > 0) {
//                     await axios.post("/api/cart/update", { cartItems });
//                 }
//             } catch (error) {
//                 console.error("Cart Sync Error");
//             }
//         };
//         const delay = setTimeout(() => { if (user) updateCart(); }, 500);
//         return () => clearTimeout(delay);
//     }, [cartItems, user]);


//     //   // Function to delete a contact message
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

//     const value = {
//         currency, navigate, user, setUser, isSeller, setIsSeller,
//         showUserLogin, setShowUserLogin, products, addToCart,
//         cartItems, setCartItems, removeFromCart, getCartCount, getCartAmount,
//         axios, fetchProducts, deleteProduct, deleteCategory, categories, contacts, setContacts,
//         getAllContacts, userData, setUserData, setSearchQuery,
//         searchQuery, setSearchQuery,updateCartItems,deleteOrder,deleteContact
//     };

//     return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// }

// export const useAppContext = () => useContext(AppContext);


import { useContext, useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

// Axios Configuration
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    // --- State Management ---
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(null); // CRITICAL: null means "loading"
    const [userData, setUserData] = useState(null);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [contacts, setContacts] = useState([]);

    // --- 1. AUTHENTICATION FUNCTIONS ---

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
                // Handle Cart Parsing
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

    // --- 2. DATA FETCHING ---

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("/api/product/list");
            if (data.success) setProducts(data.products);
        } catch (error) {
            console.error("Products error:", error.message);
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get("/api/category/list");
            if (data.success) setCategories(data.categories);
        } catch (error) {
            console.error("Categories error:", error.message);
        }
    };

    const getAllContacts = async () => {
        if (!isSeller) return; 
        try {
            const { data } = await axios.get(`/api/contact/all`);
            if (data.success) setContacts(data.data || []);
        } catch (error) {
            console.error("Contacts error:", error.message);
        }
    };

    // --- 3. ACTIONS ---

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

    const deleteCategory = async (categoryId) => {
        try {
            const { data } = await axios.post('/api/category/delete', { id: categoryId });
            if (data.success) {
                toast.success('Deleted successfully!');
                setCategories(prev => prev.filter(cat => cat.id !== categoryId));
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            const { data } = await axios.delete(`/api/order/delete/${orderId}`);
            if (data.success) {
                toast.success(data.message);
                setOrders(prev => prev.filter(o => o.id !== orderId));
                return true;
            }
            return false;
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    };

    const deleteContact = async (id) => {
        try {
            const { data } = await axios.delete(`/api/contact/delete/${id}`);
            if (data.success) {
                toast.success(data.message);
                getAllContacts();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // --- 4. CART LOGIC ---

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

    const updateCartItems = (itemId, quantity) => {
        if (!itemId || itemId === "undefined") return;
        let currentCart = typeof cartItems === 'string' ? JSON.parse(cartItems) : cartItems;
        let cartData = structuredClone(currentCart || {});
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart updated 🛍️");
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

    // --- 5. EFFECTS ---

    // Initial Load
    useEffect(() => {
        const init = async () => {
            await fetchUser();
            await fetchSeller();
            fetchProducts();
            fetchCategories();
        };
        init();
    }, []);

    // Load Seller Data
    useEffect(() => {
        if (isSeller) getAllContacts();
    }, [isSeller]);

    // Sync Cart to DB
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

    const value = {
        currency, navigate, user, setUser, isSeller, setIsSeller,
        showUserLogin, setShowUserLogin, products, addToCart,
        cartItems, setCartItems, removeFromCart, getCartCount, getCartAmount,
        axios, fetchProducts, deleteProduct, deleteCategory, categories, contacts, 
        setContacts, getAllContacts, userData, setUserData, setSearchQuery,
        searchQuery, updateCartItems, deleteOrder, deleteContact, orders, setOrders
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);