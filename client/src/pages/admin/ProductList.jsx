import React from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";


const ProductList = () => {
  // Getting the products, currency, and deleteProduct function from useAppContext
  const { products, currency, deleteProduct,axios, fetchProducts} = useAppContext();

  // The function toggle inStock
  const toggleStock = async (id, inStock) => {
    try {
      // Calling the API
      const {data} = await axios.post("/api/product/stock", {id, inStock});
      if(data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  // Handle deleting a product
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId); // Call the delete function from context
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex-1 py-10 flex flex-col justify-between">
      <div className="w-full p-4 md:p-10">
           <h4 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-blue-500 pl-4">
          All Products Dashboard
        </h4>

        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-300">
  {/* Product List - Table */}
  <table className="table-auto w-full">
    <thead className="text-gray-900 text-sm text-left bg-gray-50">
      <tr>
        <th className="px-2 py-2 md:px-4 md:py-3 font-semibold truncate">Product</th>
        <th className="px-2 py-2 md:px-4 md:py-3 font-semibold truncate">Category</th>
        <th className="px-2 py-2 md:px-4 md:py-3 font-semibold truncate hidden md:table-cell">
          Price
        </th>
        <th className="px-2 py-2 md:px-4 md:py-3 font-semibold truncate">In Stock</th>
        <th className="px-2 py-2 md:px-4 md:py-3 font-semibold truncate">Action</th>
      </tr>
    </thead>

    <tbody className="text-sm text-gray-600">
      {products.map((product) => (
        <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50">
          {/* Product Info */}
          <td className="px-2 py-2 md:px-4 md:py-3 flex items-center space-x-2 md:space-x-3 truncate">
            <div className="border border-gray-200 rounded overflow-hidden w-12 h-12 md:w-16 md:h-16">
              <img src={product.image[0]} alt="Product" className="w-full h-full object-contain" />
            </div>
            <span className="truncate sm:hidden w-full">{product.name}</span>
          </td>

          {/* Category Info */}
          <td className="px-2 py-2 md:px-4 md:py-3 truncate">{product.category}</td>

          {/* Price Info (Hidden on small screens) */}
          <td className="px-2 py-2 md:px-4 md:py-3 hidden md:table-cell truncate">
            {product.offerPrice} {currency}
          </td>

          {/* Stock Status */}
          <td className="px-2 py-2 md:px-4 md:py-3">
            <label className="relative inline-flex items-center cursor-pointer gap-2 md:gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => toggleStock(product.id, !product.inStock)}
                checked={product.inStock}
              />
              <div className="w-10 h-5 md:w-12 md:h-6 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
              <span className="dot absolute left-0.5 top-0.5 md:left-1 md:top-1 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5 md:peer-checked:translate-x-5"></span>
            </label>
          </td>

          {/* Delete Action */}
          <td className="px-2 py-2 md:px-4 md:py-3 text-center">
            <button
              className="flex justify-center items-center p-1 md:p-2 rounded hover:bg-red-100"
              onClick={() => handleDelete(product.id)}
            >
              <img
                src={assets.remove_icon}
                alt="Remove"
                className="w-5 h-5 md:w-6 md:h-8 text-gray-600 hover:text-red-500"
              />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
};

export default ProductList;
