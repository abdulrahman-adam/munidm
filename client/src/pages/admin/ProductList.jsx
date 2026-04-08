import React from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const ProductList = () => {
  const { products, currency, deleteProduct, axios, fetchProducts } = useAppContext();

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[calc(100vh-73px)] overflow-y-scroll bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h4 className="text-2xl md:text-3xl font-extrabold text-gray-800 border-l-4 border-indigo-600 pl-4">
              All Products
            </h4>
            <p className="text-sm text-gray-500 mt-1 pl-5">Manage your inventory, prices, and stock status.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm self-start">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Products</p>
             <p className="text-xl font-black text-indigo-600">{products.length}</p>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr className="text-gray-500 text-[11px] uppercase tracking-[0.1em] font-black text-left">
                  <th className="px-6 py-4 font-black">Product</th>
                  <th className="px-6 py-4 font-black">Category</th>
                  <th className="px-6 py-4 font-black hidden lg:table-cell">Variants</th>
                  <th className="px-6 py-4 font-black hidden md:table-cell">Price</th>
                  <th className="px-6 py-4 font-black">In Stock</th>
                  <th className="px-6 py-4 font-black text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-indigo-50/30 transition-colors group">
                      
                      {/* Product Name & Image */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl border border-gray-100 bg-gray-50 overflow-hidden flex-shrink-0 shadow-sm">
                            <img src={product.image[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <span className="font-bold text-gray-800 text-sm md:text-base truncate max-w-[120px] md:max-w-xs">
                            {product.name}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">
                          {product.category}
                        </span>
                      </td>

                      {/* Variants Display */}
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                          {product.variants && product.variants.length > 0 ? (
                            product.variants.map((variant, index) => (
                              <span key={index} className="px-2 py-1 bg-white border border-gray-200 text-gray-500 rounded-md text-[10px] font-bold shadow-sm">
                                {variant}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-300 text-[10px] italic">No variants</span>
                          )}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="font-black text-gray-900">
                          {currency}{product.offerPrice}
                        </span>
                      </td>

                      {/* Stock Toggle */}
                      <td className="px-6 py-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            onChange={() => toggleStock(product.id, !product.inStock)}
                            checked={product.inStock}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-100 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </td>

                      {/* Delete Action */}
                      <td className="px-6 py-4 text-center">
                        <button
                          className="w-10 h-10 flex justify-center items-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all mx-auto active:scale-90"
                          onClick={() => handleDelete(product.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-20 text-center">
                       <img src={assets.logo} className="w-20 mx-auto opacity-10 grayscale mb-4" alt="" />
                       <p className="text-gray-400 font-medium">No products found in your inventory.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;