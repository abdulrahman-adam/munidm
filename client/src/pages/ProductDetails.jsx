import { useEffect, useState, useMemo } from "react"; // Added useMemo for efficiency
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // 1. SAFE FIND: Use useMemo and loose equality (==) or String conversion 
  // to ensure "45" (URL) matches 45 (Data)
  const product = useMemo(() => {
    return products.find((item) => String(item.id) === String(id));
  }, [products, id]);

  // 2. RELATED PRODUCTS LOGIC
  useEffect(() => {
    if (product && products.length > 0) {
      const filtered = products.filter(
        (item) => item.category === product.category && item.id !== product.id
      );
      setRelatedProducts(filtered.slice(0, 5));
    }
  }, [products, product]);

  // 3. THUMBNAIL LOGIC
  useEffect(() => {
    if (product?.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  // 4. LOADING GUARD: This prevents the "category of undefined" crash
  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      {/* Breadcrumbs */}
      <p className="text-sm text-gray-600">
        <Link to={"/"} className="hover:text-indigo-500">Home</Link> / 
        <Link to={"/products"} className="hover:text-indigo-500"> Products</Link> /
        <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-indigo-500">
          {" "}{product.category}
        </Link> / 
        <span className="text-indigo-500 font-medium"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* Left: Images */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.image.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className={`border max-w-24 rounded overflow-hidden cursor-pointer transition ${
                  thumbnail === image ? "border-indigo-500" : "border-gray-500/30"
                }`}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden bg-white">
            <img
              src={thumbnail}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium text-gray-800">{product.name}</h1>
          
          <div className="flex items-center gap-0.5 mt-2">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="star"
                className="w-4 h-4"
              />
            ))}
            <p className="text-base ml-2 text-gray-500">(4.0)</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-400 line-through text-lg">
              {currency} {product.price}
            </p>
            <p className="text-3xl font-semibold text-indigo-600">
              {currency} {product.offerPrice}
            </p>
            <span className="text-xs text-gray-400">(Inclusive of all taxes)</span>
          </div>

          <div className="mt-8">
            <p className="text-base font-semibold mb-2">About Product</p>
            <ul className="list-disc ml-5 space-y-1 text-gray-600">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center mt-10 gap-4">
            <button
              onClick={() => addToCart(product.id)}
              className="flex-1 py-4 font-medium bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition active:scale-95"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product.id);
                navigate("/cart");
              }}
              className="flex-1 py-4 font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition active:scale-95"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-24 border-t pt-16">
        <div className="flex flex-col items-center mb-10">
          <div className="mb-8 space-y-2">
  <h2 className="
    /* Mobile: texte compact */
    text-xl font-bold 
    /* Tablette: taille intermédiaire */
    sm:text-2xl 
    /* Laptop/Desktop: grand et élégant */
    md:text-3xl md:font-extrabold 
    
    text-gray-800 tracking-tight
  ">
    Produits Similaires
  </h2>
  
  <p className="
    /* Mobile: petite police */
    text-xs 
    /* Desktop: police standard */
    sm:text-sm 
    
    text-gray-500 font-normal max-w-2xl
  ">
    Vous pourriez aussi aimer ces articles sélectionnés spécialement pour vous selon vos préférences.
  </p>
  
  {/* Ligne de décoration optionnelle */}
  <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
</div>
          <div className="w-16 h-1 bg-indigo-500 rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
            className="px-10 py-2.5 border border-indigo-500 text-indigo-500 rounded-full hover:bg-indigo-50 transition"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;