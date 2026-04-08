// import { useEffect, useState, useMemo } from "react"; // Added useMemo for efficiency
// import { useAppContext } from "../context/AppContext";
// import { Link, useParams } from "react-router-dom";
// import { assets } from "../assets/assets";
// import ProductCard from "../components/ProductCard";

// const ProductDetails = () => {
//   const { products, navigate, currency, addToCart } = useAppContext();
//   const { id } = useParams();

//   const [thumbnail, setThumbnail] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   // 1. SAFE FIND: Use useMemo and loose equality (==) or String conversion 
//   // to ensure "45" (URL) matches 45 (Data)
//   const product = useMemo(() => {
//     return products.find((item) => String(item.id) === String(id));
//   }, [products, id]);

//   // 2. RELATED PRODUCTS LOGIC
//   useEffect(() => {
//     if (product && products.length > 0) {
//       const filtered = products.filter(
//         (item) => item.category === product.category && item.id !== product.id
//       );
//       setRelatedProducts(filtered.slice(0, 5));
//     }
//   }, [products, product]);

//   // 3. THUMBNAIL LOGIC
//   useEffect(() => {
//     if (product?.image?.length > 0) {
//       setThumbnail(product.image[0]);
//     }
//   }, [product]);

//   // 4. LOADING GUARD: This prevents the "category of undefined" crash
//   if (!product) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <p className="text-gray-500">Loading product details...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-12">
//       {/* Breadcrumbs */}
//       <p className="text-sm text-gray-600">
//         <Link to={"/"} className="hover:text-indigo-500">Home</Link> / 
//         <Link to={"/products"} className="hover:text-indigo-500"> Products</Link> /
//         <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-indigo-500">
//           {" "}{product.category}
//         </Link> / 
//         <span className="text-indigo-500 font-medium"> {product.name}</span>
//       </p>

//       <div className="flex flex-col md:flex-row gap-16 mt-4">
//         {/* Left: Images */}
//         <div className="flex gap-3">
//           <div className="flex flex-col gap-3">
//             {product.image.map((image, index) => (
//               <div
//                 key={index}
//                 onClick={() => setThumbnail(image)}
//                 className={`border max-w-24 rounded overflow-hidden cursor-pointer transition ${
//                   thumbnail === image ? "border-indigo-500" : "border-gray-500/30"
//                 }`}
//               >
//                 <img src={image} alt={`Thumbnail ${index + 1}`} />
//               </div>
//             ))}
//           </div>
//           <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden bg-white">
//             <img
//               src={thumbnail}
//               alt={product.name}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         </div>

//         {/* Right: Product Details */}
//         <div className="text-sm w-full md:w-1/2">
//           <h1 className="text-3xl font-medium text-gray-800">{product.name}</h1>
          
//           <div className="flex items-center gap-0.5 mt-2">
//             {[...Array(5)].map((_, i) => (
//               <img
//                 key={i}
//                 src={i < 4 ? assets.star_icon : assets.star_dull_icon}
//                 alt="star"
//                 className="w-4 h-4"
//               />
//             ))}
//             <p className="text-base ml-2 text-gray-500">(4.0)</p>
//           </div>

//           <div className="mt-6">
//             <p className="text-gray-400 line-through text-lg">
//               {currency} {product.price}
//             </p>
//             <p className="text-3xl font-semibold text-indigo-600">
//               {currency} {product.offerPrice}
//             </p>
//             <span className="text-xs text-gray-400">(Inclusive of all taxes)</span>
//           </div>

//           <div className="mt-8">
//             <p className="text-base font-semibold mb-2">About Product</p>
//             <ul className="list-disc ml-5 space-y-1 text-gray-600">
//               {product.description.map((desc, index) => (
//                 <li key={index}>{desc}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="flex items-center mt-10 gap-4">
//             <button
//               onClick={() => addToCart(product.id)}
//               className="flex-1 py-4 font-medium bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition active:scale-95"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={() => {
//                 addToCart(product.id);
//                 navigate("/cart");
//               }}
//               className="flex-1 py-4 font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition active:scale-95"
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Related Products Section */}
//       <div className="mt-24 border-t pt-16">
//         <div className="flex flex-col items-center mb-10">
//           <div className="mb-8 space-y-2">
//   <h2 className="
//     /* Mobile: texte compact */
//     text-xl font-bold 
//     /* Tablette: taille intermédiaire */
//     sm:text-2xl 
//     /* Laptop/Desktop: grand et élégant */
//     md:text-3xl md:font-extrabold 
    
//     text-gray-800 tracking-tight
//   ">
//     Produits Similaires
//   </h2>
  
//   <p className="
//     /* Mobile: petite police */
//     text-xs 
//     /* Desktop: police standard */
//     sm:text-sm 
    
//     text-gray-500 font-normal max-w-2xl
//   ">
//     Vous pourriez aussi aimer ces articles sélectionnés spécialement pour vous selon vos préférences.
//   </p>
  
//   {/* Ligne de décoration optionnelle */}
//   <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
// </div>
//           <div className="w-16 h-1 bg-indigo-500 rounded-full mt-2"></div>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {relatedProducts
//             .filter((p) => p.inStock)
//             .map((p) => (
//               <ProductCard key={p.id} product={p} />
//             ))}
//         </div>

//         <div className="flex justify-center mt-12">
//           <button
//             onClick={() => {
//               navigate("/products");
//               window.scrollTo(0, 0);
//             }}
//             className="px-10 py-2.5 border border-indigo-500 text-indigo-500 rounded-full hover:bg-indigo-50 transition"
//           >
//             See More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;



import { useEffect, useState, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);

  // Memoize product search for performance
  const product = useMemo(() => {
    return products.find((item) => String(item.id) === String(id));
  }, [products, id]);

  // --- LOGIC: TOGGLE VARIANT ---
  const toggleVariant = (v) => {
    setSelectedVariants((prev) =>
      prev.includes(v) ? prev.filter((item) => item !== v) : [...prev, v]
    );
  };

  // --- LOGIC: RELATED PRODUCTS & RESET ---
  useEffect(() => {
    if (product && products.length > 0) {
      const filtered = products.filter(
        (item) => item.category === product.category && item.id !== product.id
      );
      setRelatedProducts(filtered.slice(0, 5));
    }
    // Clean state when switching products
    setSelectedVariants([]);
    window.scrollTo(0, 0);
  }, [id, products, product]);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  // --- LOGIC: ADD TO CART ---
  const handleAddToCart = (isBuyNow = false) => {
    if (product.variants?.length > 0 && selectedVariants.length === 0) {
      return toast.error("Veuillez sélectionner au moins une option");
    }

    // Create the unique variant string for the Cart Key
    const variantString = selectedVariants.sort().join("-");
    
    // Call Context function with ID and Variants
    addToCart(product.id, variantString);

    if (isBuyNow) {
      navigate("/cart");
    } else {
      toast.success("Ajouté au panier ! ✨");
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="mt-12 px-4 md:px-0 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-8 flex gap-2 items-center">
        <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-indigo-600 transition">Products</Link>
        <span>/</span>
        <span className="text-indigo-600 font-semibold">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* LEFT: IMAGE GALLERY */}
        <div className="flex-1 flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 scrollbar-hide pb-2">
            {product.image.map((img, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(img)}
                className={`border-2 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  thumbnail === img ? "border-indigo-600 scale-95" : "border-transparent bg-gray-50"
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex-1 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm group">
            <img
              src={thumbnail}
              alt={product.name}
              className="w-full h-full object-center object-cover group-hover:scale-110 transition duration-700"
            />
          </div>
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div className="flex-1 py-2">
          <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            {product.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 leading-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} className="w-4 h-4" alt="star" />
              ))}
            </div>
            <p className="text-sm text-gray-400 font-medium">(120 Reviews)</p>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-3xl font-black text-indigo-600">
                {currency}{product.offerPrice}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-400 line-through text-sm">{currency}{product.price}</span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                  -{Math.round(((product.price - product.offerPrice) / product.price) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* VARIANTS SECTION */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Options</h3>
              {selectedVariants.length > 0 && (
                <button onClick={() => setSelectedVariants([])} className="text-xs text-indigo-500 hover:underline">Effacer</button>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {product.variants?.length > 0 ? (
                product.variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => toggleVariant(v)}
                    className={`px-6 py-3 text-xs font-bold rounded-xl border-2 transition-all duration-300 ${
                      selectedVariants.includes(v)
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 -translate-y-1"
                        : "bg-white border-gray-100 text-gray-500 hover:border-indigo-200"
                    }`}
                  >
                    {v}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">Modèle Standard</p>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-10 border-t border-gray-100 pt-8">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4">Description</h3>
            <ul className="grid grid-cols-1 gap-3">
              {product.description.map((desc, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  {desc}
                </li>
              ))}
            </ul>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center mt-12 gap-4">
            <button
              onClick={() => handleAddToCart(false)}
              className="group w-full sm:flex-1 py-4 font-bold bg-gray-900 text-white rounded-2xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleAddToCart(true)}
              className="w-full sm:flex-1 py-4 font-bold bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-100"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-32 border-t border-gray-100 pt-16 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Vous pourriez aimer</h2>
          <div className="h-1 w-12 bg-indigo-600 mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {relatedProducts.filter(p => p.inStock).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;