// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import toast from "react-hot-toast";

// const Cart = () => {
//   // Getting the product details from context
//   const {
//     products,
//     axios,
//     currency,
//     user,
//     cartItems,
//     setCartItems,
//     removeFromCart,
//     getCartCount,
//     updateCartItems,
//     navigate,
//     getCartAmount,
//   } = useAppContext();
//   // The state cartArray
//   const [cartArray, setCartArray] = useState([]);
//   // The state variable for addresses
//   const [addresses, setAddresses] = useState([]);
//   // The state variable for Addresses
//   const [showAddress, setShowAddress] = useState(false);
//   // The state variable for selected
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   // The state variable for payment Options
//   const [paymentOption, setPaymentOption] = useState("COD");

//   // The function get the Cart
//   //  const getCart = () => {
//   //     let tempArray = [];
//   //     for(const key in cartItems) {
//   //         const product = products.find((item) =>item.id === key);
//   //         product.quantity = cartItems[key];
//   //         tempArray.push(product);
//   //     }
//   //     setCartArray(tempArray);
//   //  }

//   // The function get the Cart
//   const getCart = () => {
//     let tempArray = [];
//     for (const key in cartItems) {
//       // FIX 1: Ensure we compare Strings to avoid type mismatches
//       const product = products.find(
//         (item) =>
//           String(item.id) === String(key) || String(item.id) === String(key),
//       );

//       // FIX 2: Only proceed if the product was actually found
//       if (product) {
//         // Create a shallow copy to avoid mutating the original product object in the products array
//         const productWithQty = { ...product };
//         productWithQty.quantity = cartItems[key];
//         tempArray.push(productWithQty);
//       }
//     }
//     setCartArray(tempArray);
//   };

//   // The function Place order
//   const placeOrder = async () => {
//     try {
//       // Cheacking if the user selected the address or not
//       if (!selectedAddress) {
//         return toast.error("Please select an address");
//       }
//       //the function Place oeder COD
//       if (paymentOption === "COD") {
//         //Calling the API
//         const { data } = await axios.post("/api/order/cod", {
//           userId: user.id,
//           address: selectedAddress.id,
//           items: cartArray.map((item) => ({
//             product: item.id,
//             quantity: item.quantity,
//           })),
//         });

//         //Cheacking the response
//         if (data.success) {
//           toast.success(data.message);
//           // setCartItems({});
//           navigate("/my-orders");
//         } else {
//           toast.error(data.message);
//         }
//       } else {
//         // Place Order with stripe
//         // Calling the api
//         const { data } = await axios.post("/api/order/stripe", {
//           userId: user.id,
//           address: selectedAddress.id,
//           items: cartArray.map((item) => ({
//             product: item.id,
//             quantity: item.quantity,
//           })),
//         });

//         //Cheacking the response
//         if (data.success) {
//           // Opent the Url has pointed in backend
//           window.location.replace(data.url);
//         } else {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // The function fetch the user address
//   const getUserAddress = async () => {
//     try {
//       // Calling the API
//       const { data } = await axios.get("/api/address/get");
//       if (data.success) {
//         setAddresses(data.addresses);
//         if (data.addresses.length > 0) {
//           setSelectedAddress(data.addresses[0]);
//         } else {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Excute the function getCart
//   useEffect(() => {
//     if (products.length > 0 && cartItems) {
//       getCart();
//     }
//   }, [products, cartItems]);

//   // When the user is available this function will be excuted
//   useEffect(() => {
//     if (user) {
//       getUserAddress();
//     }
//   }, [user]);

//   return products.length > 0 && cartItems ? (
//     <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
//       <div className="flex-1 max-w-4xl">
//         <h1 className="text-3xl font-medium mb-6">
//           Shopping Cart{" "}
//           <span className="text-sm text-indigo-500">
//             {getCartCount()} Items
//           </span>
//         </h1>

//         <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
//           <p className="text-left">Product Details</p>
//           <p className="text-center">Subtotal</p>
//           <p className="text-center">Action</p>
//         </div>

//         {cartArray.map((product, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
//           >
//             <div className="flex items-center md:gap-6 gap-3">
//               <div
//                 onClick={() => {
//                   (navigate(
//                     `/products/${product.category.toLowerCase()}/${product.id}`,
//                   ),
//                     scrollTo(0, 0));
//                 }}
//                 className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
//               >
//                 <img
//                   className="max-w-full h-full object-cover"
//                   src={product.image[0]}
//                   alt={product.name}
//                 />
//               </div>

//               <div>
//                 <p className="hidden md:block font-semibold">{product.name}</p>
//                 <div className="font-normal text-gray-500/70">
//                   <p>
//                     Weight: <span>{product.weight || "N/A"}</span>
//                   </p>
//                   <div className="flex items-center">
//                     <p>Quantity:</p>

//                     <select
//                       onChange={(e) =>
//                         updateCartItems(product.id, Number(e.target.value))
//                       }
//                       value={cartItems[product.id]}
//                       className="outline-none"
//                     >
//                       {Array(cartItems[product.id] > 9 ? cartArray[product.id] : 9)
//                         .fill("")
//                         .map((_, index) => (
//                           <option key={index} value={index + 1}>
//                             {index + 1}
//                           </option>
//                         ))}

//                       {/* {[...Array(10)].map((_, index) => (
//                         <option key={index} value={index + 1}>
//                           {index + 1}
//                         </option>
//                       ))} */}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <p className="text-center">
//               {product.offerPrice * product.quantity} {currency}
//             </p>

//             <button
//               onClick={() => removeFromCart(product.id)}
//               className="cursor-pointer mx-auto"
//             >
//               <img
//                 src={assets.remove_icon}
//                 alt="remove"
//                 className="inline-block w-6 h-6"
//               />
//             </button>
//           </div>
//         ))}

//         <button
//           onClick={() => {
//             navigate("/products");
//             scrollTo(0, 0);
//           }}
//           className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
//         >
//           <img
//             className="group-hover:-translate-x-1 transition"
//             src={assets.arrow_right_icon_colored}
//             alt="arrow"
//           />
//           Continue Shopping
//         </button>
//       </div>

//       <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
//         <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>

//         <hr className="border-gray-300 my-5" />

//         <div className="mb-6">
//           <p className="text-sm font-medium uppercase">Delivery Address</p>

//           <div className="relative flex justify-between items-start mt-2">
//             <p className="text-gray-500">
//               {selectedAddress
//                 ? `${selectedAddress.street},${selectedAddress.city},${selectedAddress.state},${selectedAddress.country}`
//                 : "No address found"}
//             </p>

//             <button
//               onClick={() => setShowAddress(!showAddress)}
//               className="text-indigo-500 hover:underline cursor-pointer"
//             >
//               Change
//             </button>

//             {showAddress && (
//               <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
//                 {addresses.map((address, index) => (
//                   <p
//                     onClick={() => {
//                       setSelectedAddress(address);
//                       setShowAddress(false);
//                     }}
//                     className="text-gray-500 p-2 hover:bg-gray-100"
//                   >
//                     {address.street} {address.city} {address.state}{" "}
//                     {address.country}
//                   </p>
//                 ))}

//                 <p
//                   onClick={() => navigate("/add-address")}
//                   className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
//                 >
//                   Add address
//                 </p>
//               </div>
//             )}
//           </div>

//           <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

//           <select
//             onChange={(e) => setPaymentOption(e.target.value)}
//             className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
//           >
//             <option value="COD">Cash On Delivery</option>

//             <option value="Online">Online Payment</option>
//           </select>
//         </div>

//         <hr className="border-gray-300" />

//         <div className="text-gray-500 mt-4 space-y-2">
//           <p className="flex justify-between">
//             <span>Price</span>
//             <span>
//               {getCartAmount()} {currency}
//             </span>
//           </p>

//           <p className="flex justify-between">
//             <span>Shipping Fee</span>
//             <span className="text-green-600">Free</span>
//           </p>

//           <p className="flex justify-between">
//             <span>Tax (20%)</span>
//             <span>
//               {/* {(getCartAmount() * 2) / 100} {currency} */}
//               {((getCartAmount() * 20) / 100).toFixed(2)} {currency}
//             </span>
//           </p>

//           <p className="flex justify-between text-lg font-medium mt-3">
//             <span>Total Amount:</span>
//             <span>
//               {/* {getCartAmount() + (getCartAmount() * 2) / 100} {currency} */}
//               {(getCartAmount() + (getCartAmount() * 20) / 100).toFixed(2)} {currency}
//             </span>
//           </p>
//         </div>

//         <button
//           onClick={placeOrder}
//           className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
//         >
//           {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
//         </button>
//       </div>
//     </div>
//   ) : null;
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    axios,
    currency,
    user,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItems,
    navigate,
    getCartAmount,
    setShowUserLogin,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  // État pour gérer le délai de chargement des données
  const [isLoaded, setIsLoaded] = useState(false);

  // Fonction pour transformer l'objet cartItems en tableau exploitable
  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => String(item.id) === String(key));

      if (product && cartItems[key] > 0) {
        const productWithQty = { ...product };
        productWithQty.quantity = cartItems[key];
        tempArray.push(productWithQty);
      }
    }
    setCartArray(tempArray);
    setIsLoaded(true);
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Veuillez sélectionner une adresse de livraison");
      }

      const orderData = {
        userId: user.id,
        address: selectedAddress.id,
        items: cartArray.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
      };

      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", orderData);
        if (data.success) {
          toast.success(data.message);
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post("/api/order/stripe", orderData);
        if (data.success) {
          window.location.replace(data.url);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  // --- VUE : CHARGEMENT ---
  if (!isLoaded && products.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // --- VUE : PANIER VIDE ---
  if (isLoaded && cartArray.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <img
            src={assets.logo}
            alt="Vide"
            className="w-12 opacity-20 grayscale"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Votre panier est vide
        </h2>
        <p className="text-gray-500 mt-2 mb-8 max-w-sm">
          On dirait que vous n'avez pas encore fait votre choix. Découvrez nos
          nouveautés !
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-indigo-600 text-white px-8 py-3 rounded-md font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
        >
          Découvrir les produits
        </button>
      </div>
    );
  }

  // --- VUE : PANIER PLEIN ---
  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto gap-10">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Mon Panier{" "}
          <span className="text-sm font-medium text-indigo-500 ml-2">
            ({getCartCount()} articles)
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-400 text-xs uppercase font-bold tracking-wider pb-3 border-b border-gray-100">
          <p>Détails Produit</p>
          <p className="text-center">Sous-total</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] items-center py-6 border-b border-gray-50"
          >
            <div className="flex items-center gap-4">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product.id}`,
                  );
                  window.scrollTo(0, 0);
                }}
                className="cursor-pointer w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0"
              >
                <img
                  className="w-full h-full object-contain"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm md:text-base mb-1">
                  {product.name}
                </p>
                <p className="text-xs text-gray-400 mb-2">
                  Poids: {product.weight || "N/A"}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500">Qté:</span>
                  <select
                    onChange={(e) =>
                      updateCartItems(product.id, Number(e.target.value))
                    }
                    value={cartItems[product.id]}
                    className="bg-white border border-gray-200 rounded text-xs p-1 outline-none"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <p className="text-center font-bold text-gray-800">
              {(product.offerPrice * product.quantity).toFixed(2)} {currency}
            </p>

            <button
              onClick={() => removeFromCart(product.id)}
              className="mx-auto p-2 hover:bg-red-50 rounded-full transition group"
            >
              <img
                src={assets.remove_icon}
                alt="Supprimer"
                className="w-5 h-5 opacity-50 group-hover:opacity-100"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => navigate("/products")}
          className="flex items-center mt-8 gap-2 text-indigo-600 font-bold text-sm hover:underline"
        >
          ← Continuer mes achats
        </button>
      </div>

      {/* --- RÉSUMÉ DE COMMANDE --- */}
      <div className="max-w-[380px] w-full bg-white p-8 border border-gray-100 shadow-sm rounded-2xl h-fit sticky top-24">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Résumé de la commande
        </h2>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-2">
              Adresse de livraison
            </label>
            <div className="relative bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-600 leading-relaxed pr-8">
                {selectedAddress
                  ? `${selectedAddress.street} ${selectedAddress.zipcode} ${selectedAddress.city} ${selectedAddress.country}`
                  : "Aucune adresse enregistrée"}
              </p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="absolute top-4 right-4 text-indigo-600 font-bold text-[10px] hover:underline"
              >
                MODIFIER
              </button>

              {showAddress && (
                <div className="absolute top-full left-0 right-0 z-20 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden">
                  {addresses.map((addr, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedAddress(addr);
                        setShowAddress(false);
                      }}
                      className="p-3 text-xs hover:bg-indigo-50 cursor-pointer border-b border-gray-50"
                    >
                      {addr.street} {addr.zipcode} {addr.city} {addr.country}
                    </div>
                  ))}
                  {/* <div onClick={() => navigate("/add-address")} className="p-3 text-xs text-indigo-600 font-bold text-center hover:bg-indigo-50 cursor-pointer">
                    + Ajouter une adresse
                  </div> */}
                  <div
                    onClick={() => {
                      if (user) {
                        // Si connecté, on va à la page d'ajout
                        navigate("/add-address");
                      } else {
                        // Sinon, message d'erreur et ouverture du login
                        toast.error(
                          "Veuillez vous connecter pour ajouter une adresse",
                        );
                        setShowUserLogin(true);
                      }
                    }}
                    className="p-3 text-xs text-indigo-600 font-bold text-center hover:bg-indigo-50 cursor-pointer"
                  >
                    + Ajouter une adresse
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-2">
              Méthode de paiement
            </label>
            <select
              onChange={(e) => setPaymentOption(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl text-xs font-medium outline-none"
            >
              <option value="COD">Paiement à la livraison (COD)</option>
              <option value="Online">Paiement par Carte / Stripe</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Sous-total</span>
              <span className="font-bold text-gray-800">
                {getCartAmount().toFixed(2)} {currency}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Livraison</span>
              <span className="text-green-600 font-bold">Gratuite</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">TVA (20%)</span>
              <span className="font-bold text-gray-800">
                {(getCartAmount() * 0.2).toFixed(2)} {currency}
              </span>
            </div>
            <div className="flex justify-between text-xl font-black text-gray-900 pt-3 border-t border-gray-100">
              <span>Total</span>
              <span>
                {(getCartAmount() * 1.2).toFixed(2)} {currency}
              </span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98]"
          >
            {paymentOption === "COD"
              ? "CONFIRMER LA COMMANDE"
              : "PROCÉDER AU PAIEMENT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
