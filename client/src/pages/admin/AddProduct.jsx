

import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  
  const [variants, setVariants] = useState([]);
  const [variantInput, setVariantInput] = useState('');

  const [loading, setLoading] = useState(false);
  const { axios, categories } = useAppContext();

  const addVariant = () => {
    const trimmedValue = variantInput.trim();
    if (trimmedValue && !variants.includes(trimmedValue)) {
      setVariants([...variants, trimmedValue]);
      setVariantInput(''); 
    }
  };

  const removeVariant = (val) => {
    setVariants(prev => prev.filter(item => item !== val));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', JSON.stringify(description.split('\n')));
      formData.append('category', category);
      formData.append('price', price);
      formData.append('offerPrice', offerPrice);
      formData.append('variants', JSON.stringify(variants));

      files.forEach((file) => {
        if (file) { formData.append('images', file); }
      });

      const { data } = await axios.post("/api/product/add", formData);

      if (data.success) {
        toast.success(data.message);
        setName(""); setDescription(""); setCategory(""); setPrice(""); setOfferPrice("");
        setFiles([]); setVariants([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[calc(100vh-70px)] overflow-y-scroll bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <h4 className="text-2xl md:text-3xl font-extrabold text-gray-800 border-l-4 border-indigo-600 pl-4">
            Add Product Dashboard
          </h4>
          <p className="text-gray-500 mt-2">Create a new product listing with variants and pricing.</p>
        </div>

        <form onSubmit={onSubmitHandler} className="bg-white shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-100 p-6 md:p-10 space-y-8">
          
          {/* Images Section */}
          <div className="space-y-4">
            <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">Product Images</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array(4).fill("").map((_, index) => (
                <label key={index} htmlFor={`image${index}`} className="group relative aspect-square">
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    accept="image/*" type="file" id={`image${index}`} hidden
                  />
                  <div className="w-full h-full rounded-xl border-2 border-dashed border-gray-200 group-hover:border-indigo-400 bg-gray-50 transition-all cursor-pointer overflow-hidden flex items-center justify-center">
                    <img
                      src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                      alt="upload" 
                      className={`transition-transform duration-300 group-hover:scale-105 ${files[index] ? 'w-full h-full object-cover' : 'w-10 h-10 opacity-40'}`}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Product Name */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Product Name</label>
              <input 
                onChange={(e)=>setName(e.target.value)} 
                value={name} 
                type="text" 
                placeholder="e.g. Nike Air Max" 
                className="w-full outline-none py-3 px-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm" 
                required 
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Description (One point per line)</label>
              <textarea 
                rows="4"
                onChange={(e)=>setDescription(e.target.value)} 
                value={description} 
                placeholder="High quality material&#10;Water resistant" 
                className="w-full outline-none py-3 px-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm resize-none" 
                required 
              />
            </div>

            {/* Variants Section */}
            <div className="flex flex-col gap-3 md:col-span-2">
  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
    Available Sizes / Colors
  </label>
  
  {/* Container: Stacked on mobile, side-by-side on small screens and up */}
  <div className="flex flex-col sm:flex-row gap-2">
    <input 
      type="text" 
      value={variantInput}
      onChange={(e) => setVariantInput(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addVariant())}
      placeholder="XL, Blue, 1kg..." 
      className="flex-1 outline-none py-3 px-4 rounded-xl border border-gray-200 focus:border-indigo-500 transition-all shadow-sm text-base" 
    />
    
    <button 
      type="button" 
      onClick={addVariant}
      className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-bold text-sm active:scale-95 shadow-lg shadow-indigo-100"
    >
      ADD
    </button>
  </div>
  
  {/* Variants Tags: flex-wrap ensures they flow naturally on all screens */}
  <div className="flex flex-wrap gap-2 mt-1">
    {variants.map((v, i) => (
      <span 
        key={i} 
        className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-[11px] font-black uppercase border border-indigo-100 animate-in fade-in zoom-in duration-200"
      >
        {v}
        <button 
          type="button" 
          onClick={() => removeVariant(v)} 
          className="hover:text-red-500 text-lg leading-none font-bold"
        >
          &times;
        </button>
      </span>
    ))}
  </div>
</div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Category</label>
              <select 
                onChange={(e)=>setCategory(e.target.value)} 
                value={category} 
                className="w-full outline-none py-3 px-4 rounded-xl border border-gray-200 focus:border-indigo-500 bg-white transition-all shadow-sm" 
                required
              >
                <option value="">Select Category</option>
                {categories.map((item, index) => (
                  <option key={index} value={item.path}>{item.path}</option>
                ))}
              </select>
            </div>

            {/* Pricing Group */}
            <div className="grid grid-cols-2 gap-4 md:col-span-1">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Original</label>
                <input 
                  onChange={(e)=>setPrice(e.target.value)} 
                  value={price} 
                  type="number" 
                  className="w-full outline-none py-3 px-4 rounded-xl border border-gray-200 focus:border-indigo-500 transition-all shadow-sm" 
                  required 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Offer</label>
                <input 
                  onChange={(e)=>setOfferPrice(e.target.value)} 
                  value={offerPrice} 
                  type="number" 
                  className="w-full outline-none py-3 px-4 rounded-xl border border-gray-200 focus:border-indigo-500 transition-all shadow-sm" 
                  required 
                />
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              disabled={loading} 
              className={`w-full py-4 bg-gray-900 text-white font-black rounded-2xl transition-all shadow-xl shadow-gray-200 active:scale-[0.98] ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black'}`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>UPLOADING PRODUCT...</span>
                </div>
              ) : "ADD PRODUCT TO STORE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

