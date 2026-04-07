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
import toast from "react-hot-toast"; // Ensure toast is imported

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // --- 1. VARIANTS STATE (Matching ProductCard Logic) ---
  const [selectedVariants, setSelectedVariants] = useState([]);

  const product = useMemo(() => {
    return products.find((item) => String(item.id) === String(id));
  }, [products, id]);

  // --- 2. TOGGLE VARIANT FUNCTION ---
  const toggleVariant = (v) => {
    setSelectedVariants(prev => 
      prev.includes(v) 
        ? prev.filter(item => item !== v) 
        : [...prev, v]
    );
  };

  useEffect(() => {
    if (product && products.length > 0) {
      const filtered = products.filter(
        (item) => item.category === product.category && item.id !== product.id
      );
      setRelatedProducts(filtered.slice(0, 5));
    }
    // Reset variants when changing products
    setSelectedVariants([]);
  }, [products, product]);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  // --- 3. HANDLE ADD TO CART WITH VALIDATION ---
  const handleAddToCart = (isBuyNow = false) => {
    if (product.variants?.length > 0 && selectedVariants.length === 0) {
      return toast.error("Veuillez sélectionner au moins une option");
    }
    
    const variantString = selectedVariants.sort().join("-");
    addToCart(product.id, variantString);
    
    if (isBuyNow) {
      navigate("/cart");
    } else {
      toast.success("Ajouté au panier !");
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
    <div className="mt-12 px-4 md:px-0">
      {/* Breadcrumbs */}
      <p className="text-sm text-gray-600 mb-6">
        <Link to={"/"} className="hover:text-indigo-500">Home</Link> / 
        <Link to={"/products"} className="hover:text-indigo-500"> Products</Link> /
        <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-indigo-500">
          {" "}{product.category}
        </Link> / 
        <span className="text-indigo-500 font-medium"> {product.name}</span>
      </p>

      {/* Main Product Section */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        
        {/* Left: Images (Responsive Update) */}
        <div className="flex-1 flex flex-col-reverse md:flex-row gap-3">
          {/* Thumbnails list */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 scrollbar-hide">
            {product.image.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className={`border w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden cursor-pointer shrink-0 transition-all ${
                  thumbnail === image ? "border-indigo-500 ring-2 ring-indigo-100" : "border-gray-200"
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1 border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
            <img
              src={thumbnail}
              alt={product.name}
              className="w-full h-auto object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="star"
                className="w-4 h-4"
              />
            ))}
            <p className="text-sm ml-2 text-gray-400 font-medium">(120 Reviews)</p>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl inline-block w-full md:w-auto">
            <p className="text-gray-400 line-through text-sm">
              {currency} {product.price}
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-black text-indigo-600">
                {currency} {product.offerPrice}
              </p>
              <span className="text-xs font-bold text-green-600">
                {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
              </span>
            </div>
          </div>

          {/* --- VARIANTS SECTION --- */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Sélectionnez vos options
              </p>
              {product.variants?.length > 0 && (
                <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold">
                  {selectedVariants.length} Sélectionné(s)
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {product.variants && product.variants.length > 0 ? (
                product.variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => toggleVariant(v)}
                    className={`px-5 py-2.5 text-xs font-bold border-2 rounded-xl transition-all duration-200 
                    ${selectedVariants.includes(v) 
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100 scale-105" 
                      : "bg-white border-gray-100 text-gray-500 hover:border-indigo-200"}`}
                  >
                    {v}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">Standard / Taille Unique</p>
              )}
            </div>
          </div>

          <div className="mt-10">
            <p className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Description</p>
            <ul className="space-y-2">
              {product.description.map((desc, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                   <span className="text-indigo-500 mt-1">•</span> {desc}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center mt-10 gap-4">
            <button
              onClick={() => handleAddToCart(false)}
              className="w-full sm:flex-1 py-4 font-bold bg-gray-900 text-white rounded-2xl hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleAddToCart(true)}
              className="w-full sm:flex-1 py-4 font-bold bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-24 border-t pt-16">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">
            Produits Similaires
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-md">
            Découvrez d'autres articles qui pourraient vous intéresser.
          </p>
          <div className="h-1.5 w-12 bg-indigo-500 rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {relatedProducts
            .filter((p) => p.inStock)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              navigate("/products");
              window.scrollTo(0, 0);
            }}
            className="px-12 py-3 border-2 border-indigo-600 text-indigo-600 font-bold rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;