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
  
  // 1. Add loading state
  const [loading, setLoading] = useState(false);

  const { axios, categories } = useAppContext();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Start loading
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', JSON.stringify(description.split('\n')));
      formData.append('category', category);
      formData.append('price', price);
      formData.append('offerPrice', offerPrice);

      files.forEach((file) => {
        if (file) {
          formData.append('images', file);
        }
      });

      const { data } = await axios.post("/api/product/add", formData);

      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      // 2. Stop loading regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between bg-white">
       <h4 className="text-2xl font-bold text-gray-800 mt-8 border-l-4 border-blue-500 pl-4">
           Add Product Dashboard
        </h4>
      <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
        {/* Images Section */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  <img
                    src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                    alt="uploadArea"
                    className="max-w-24 cursor-pointer object-cover h-24 w-24 rounded border border-gray-200"
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>

        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            id="category"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.path}>{item.path}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>

          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
            <input
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        {/* 3. Button with Spinner Logic */}
        <button
          disabled={loading}
          className={`w-full py-3 bg-indigo-500 text-white font-medium rounded flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-600 transition-all'}`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Uploading...
            </>
          ) : (
            "ADD PRODUCT"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;