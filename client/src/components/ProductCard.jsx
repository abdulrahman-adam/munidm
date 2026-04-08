import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  // Getting the currency from AppContext
  const { currency, cartItems, addToCart, removeFromCart, navigate } =
    useAppContext();

  return (
    product && (
      
        <div
          onClick={() => {
            navigate(
              `/products/${product.category.toLowerCase()}/${product.id}`,
            );
            scrollTo(0, 0);
          }}
          // className="border border-gray-500/20 rounded-md bg-white 
          //    w-full max-w-full sm:max-w-xs md:max-w-56 
          //    h-[360px] px-3 sm:px-4 py-2 mx-auto 
          //    flex flex-col justify-between mb-16"
          className="border border-gray-500/20 rounded-md bg-white 
             /* Mobile: 2 colonnes avec calc | Tablet/Laptop: Largeur fixe */
             w-[calc(50%-10px)] sm:w-[220px] md:w-[224px] 
             h-[380px] px-3 sm:px-4 py-2 
             flex flex-col justify-between transition-all hover:shadow-lg mb-16"
        >
          {/* Section Image centrée */}
          <div className="group cursor-pointer flex items-center justify-center px-2">
            <img
              className="group-hover:scale-105 transition w-full h-[160px]"
              src={product.image[0]}
              alt={product.name}
            />
          </div>

          <div className="text-gray-500/60 text-sm">
            <p>Catégorie: {product.category}</p>

            <p className="text-gray-700 font-medium text-lg truncate w-full">
              {product.name}
            </p>

            <p className="text-gray-500 truncate w-full">
              {product.description}
            </p>

            {/* Section Étoiles */}
            <div className="flex items-center gap-0.5">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt=""
                    className="md:w-3.5 w-3"
                  />
                ))}
              <p className="ml-1">(4)</p>
            </div>

            <div className="mt-3">
              {/* Prix */}
              <div className="mb-2">
                <p className="md:text-xl text-base font-medium">
                  <span className="text-blue-600">
                    {product.offerPrice} {currency}
                  </span>
                  &nbsp;&nbsp;
                  <span className="text-gray-300 md:text-sm text-xs line-through">
                    {product.price} {currency}
                  </span>
                </p>
              </div>

              {/* Bouton Panier / Sélecteur Quantité */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="text-primary"
              >
                {!cartItems[product.id] ? (
                  <button
                    className="flex items-center justify-center gap-2 bg-primary/10 border border-primary/40 w-full h-[36px] rounded text-primary font-medium transition-colors hover:bg-primary/20"
                    onClick={() => addToCart(product.id)}
                  >
                    <img
                      src={assets.cart_icon}
                      alt="cart_icon"
                      className="w-4 h-4"
                    />
                    <span className="text-blue-600">Ajouter au Panier</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between gap-2 w-full h-[36px] bg-indigo-500/25 rounded select-none">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="cursor-pointer text-xl px-4 h-full font-bold hover:bg-indigo-500/10 rounded-l transition-colors"
                    >
                      −
                    </button>

                    <span className="flex-1 text-center font-medium">
                      {cartItems[product.id]}
                    </span>

                    <button
                      onClick={() => addToCart(product.id)}
                      className="cursor-pointer text-xl px-4 h-full font-bold hover:bg-indigo-500/10 rounded-r transition-colors"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      
    )
  );
};

export default ProductCard;


// import React, { useState } from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";

// const ProductCard = ({ product }) => {
//   const { currency, cartItems, addToCart, removeFromCart, navigate } = useAppContext();

//   // --- 1. STATE FOR MULTIPLE SELECTIONS ---
//   // We use an array to store all chosen variants
//   const [selectedVariants, setSelectedVariants] = useState([]);

//   // --- 2. TOGGLE FUNCTION ---
//   const toggleVariant = (v) => {
//     setSelectedVariants(prev => 
//       prev.includes(v) 
//         ? prev.filter(item => item !== v) // Remove if already selected
//         : [...prev, v]                   // Add if not selected
//     );
//   };

//   // --- 3. DYNAMIC CART KEY ---
//   // Sorts and joins the variants so "Red-Large" and "Large-Red" are the same key
//   const cartKey = selectedVariants.length > 0 
//     ? `${product.id}-${[...selectedVariants].sort().join("-")}` 
//     : product.id;

//   return (
//     product && (
//       <div
//         onClick={() => {
//           navigate(`/products/${product.category.toLowerCase()}/${product.id}`);
//           scrollTo(0, 0);
//         }}
//         className="border border-gray-500/20 rounded-md bg-white 
//              w-[calc(50%-10px)] sm:w-[220px] md:w-[224px] 
//              h-[460px] px-3 sm:px-4 py-2 
//              flex flex-col justify-between transition-all hover:shadow-lg mb-16"
//       >
//         <div className="group cursor-pointer flex items-center justify-center px-2">
//           <img
//             className="group-hover:scale-105 transition w-full h-[160px] object-contain"
//             src={product.image[0]}
//             alt={product.name}
//           />
//         </div>

//         <div className="text-gray-500/60 text-sm flex-1 flex flex-col justify-end">
//           <p className="text-[10px]">Catégorie: {product.category}</p>
//           <p className="text-gray-700 font-bold text-base truncate">{product.name}</p>

//           {/* --- MULTI-SELECT VARIANT SECTION --- */}
//           <div className="my-2" onClick={(e) => e.stopPropagation()}>
//             <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1">
//               Sélectionnez vos options ({selectedVariants.length}):
//             </p>
//             <div className="flex flex-wrap gap-1.5">
//               {product.variants && product.variants.length > 0 ? (
//                 product.variants.map((v, i) => (
//                   <button
//                     key={i}
//                     onClick={() => toggleVariant(v)}
//                     className={`px-2 py-1 text-[10px] font-medium border rounded transition-all 
//                     ${selectedVariants.includes(v) 
//                       ? "bg-blue-600 border-blue-600 text-white shadow-sm" 
//                       : "bg-white border-gray-200 text-gray-600 hover:border-blue-400"}`}
//                   >
//                     {v}
//                   </button>
//                 ))
//               ) : (
//                 <span className="text-[10px] text-gray-400 italic">Taille unique</span>
//               )}
//             </div>
//           </div>

//           <div className="mt-auto">
//             <div className="mb-2">
//               <p className="text-lg font-bold">
//                 <span className="text-blue-600">{product.offerPrice} {currency}</span>
//               </p>
//             </div>

//             <div onClick={(e) => e.stopPropagation()}>
//               {!cartItems[cartKey] ? (
//                 <button
//                   disabled={selectedVariants.length === 0 && product.variants?.length > 0}
//                   className={`flex items-center justify-center gap-2 w-full h-[36px] rounded text-xs font-semibold transition-colors
//                     ${selectedVariants.length === 0 && product.variants?.length > 0
//                       ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
//                       : "bg-blue-600 text-white hover:bg-blue-700"}`}
//                   onClick={() => addToCart(product.id, selectedVariants.sort().join("-"))}
//                 >
//                   Ajouter au Panier
//                 </button>
//               ) : (
//                 <div className="flex items-center justify-between gap-2 w-full h-[36px] bg-blue-50 border border-blue-200 rounded">
//                   <button
//                     onClick={() => removeFromCart(cartKey)}
//                     className="flex-1 h-full text-blue-600 hover:bg-blue-100 font-bold"
//                   >
//                     −
//                   </button>
//                   <span className="text-blue-700 font-bold">{cartItems[cartKey]}</span>
//                   <button
//                     onClick={() => addToCart(product.id, selectedVariants.sort().join("-"))}
//                     className="flex-1 h-full text-blue-600 hover:bg-blue-100 font-bold"
//                   >
//                     +
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default ProductCard;