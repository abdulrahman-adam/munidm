// import React, { useState } from "react";
// import { assets } from "../../assets/assets";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const AddProduct = () => {
//   const [files, setFiles] = useState([]);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [price, setPrice] = useState('');
//   const [offerPrice, setOfferPrice] = useState('');
  
//   // 1. Add loading state
//   const [loading, setLoading] = useState(false);

//   const { axios, categories } = useAppContext();

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
    
//     // Start loading
//     setLoading(true);

//     try {
//       const formData = new FormData();

//       formData.append('name', name);
//       formData.append('description', JSON.stringify(description.split('\n')));
//       formData.append('category', category);
//       formData.append('price', price);
//       formData.append('offerPrice', offerPrice);

//       files.forEach((file) => {
//         if (file) {
//           formData.append('images', file);
//         }
//       });

//       const { data } = await axios.post("/api/product/add", formData);

//       if (data.success) {
//         toast.success(data.message);
//         setName("");
//         setDescription("");
//         setCategory("");
//         setPrice("");
//         setOfferPrice("");
//         setFiles([]);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     } finally {
//       // 2. Stop loading regardless of success or failure
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between bg-white">
//        <h4 className="text-2xl font-bold text-gray-800 mt-8 border-l-4 border-blue-500 pl-4">
//            Add Product Dashboard
//         </h4>
//       <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
//         {/* Images Section */}
//         <div>
//           <p className="text-base font-medium">Product Image</p>
//           <div className="flex flex-wrap items-center gap-3 mt-2">
//             {Array(4)
//               .fill("")
//               .map((_, index) => (
//                 <label key={index} htmlFor={`image${index}`}>
//                   <input
//                     onChange={(e) => {
//                       const updatedFiles = [...files];
//                       updatedFiles[index] = e.target.files[0];
//                       setFiles(updatedFiles);
//                     }}
//                     accept="image/*"
//                     type="file"
//                     id={`image${index}`}
//                     hidden
//                   />
//                   <img
//                     src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
//                     alt="uploadArea"
//                     className="max-w-24 cursor-pointer object-cover h-24 w-24 rounded border border-gray-200"
//                   />
//                 </label>
//               ))}
//           </div>
//         </div>

//         {/* Form Fields */}
//         <div className="flex flex-col gap-1 max-w-md">
//           <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
//           <input
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//             id="product-name"
//             type="text"
//             placeholder="Type here"
//             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//             required
//           />
//         </div>

//         <div className="flex flex-col gap-1 max-w-md">
//           <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
//           <textarea
//             onChange={(e) => setDescription(e.target.value)}
//             value={description}
//             id="product-description"
//             rows={4}
//             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
//             placeholder="Type here"
//           ></textarea>
//         </div>

//         <div className="w-full flex flex-col gap-1">
//           <label className="text-base font-medium" htmlFor="category">Category</label>
//           <select
//             onChange={(e) => setCategory(e.target.value)}
//             value={category}
//             id="category"
//             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//             required
//           >
//             <option value="">Select Category</option>
//             {categories.map((item, index) => (
//               <option key={index} value={item.path}>{item.path}</option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center gap-5 flex-wrap">
//           <div className="flex-1 flex flex-col gap-1 w-32">
//             <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
//             <input
//               onChange={(e) => setPrice(e.target.value)}
//               value={price}
//               id="product-price"
//               type="number"
//               placeholder="0"
//               className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//               required
//             />
//           </div>

//           <div className="flex-1 flex flex-col gap-1 w-32">
//             <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
//             <input
//               onChange={(e) => setOfferPrice(e.target.value)}
//               value={offerPrice}
//               id="offer-price"
//               type="number"
//               placeholder="0"
//               className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//               required
//             />
//           </div>
//         </div>

//         {/* 3. Button with Spinner Logic */}
//         <button
//           disabled={loading}
//           className={`w-full py-3 bg-indigo-500 text-white font-medium rounded flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-600 transition-all'}`}
//         >
//           {loading ? (
//             <>
//               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//               Uploading...
//             </>
//           ) : (
//             "ADD PRODUCT"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;


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
  
  // --- 1. UPDATED STATE FOR DYNAMIC VARIANTS ---
  const [variants, setVariants] = useState([]);
  const [variantInput, setVariantInput] = useState('');

  const [loading, setLoading] = useState(false);
  const { axios, categories } = useAppContext();

  // --- 2. FUNCTION TO ADD A NEW VARIANT TO THE LIST ---
  const addVariant = () => {
    const trimmedValue = variantInput.trim();
    if (trimmedValue && !variants.includes(trimmedValue)) {
      setVariants([...variants, trimmedValue]);
      setVariantInput(''); // Clear input
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
      
      // Send variants as a JSON string
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
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between bg-white">
        <h4 className="text-2xl font-bold text-gray-800 mt-8 border-l-4 border-blue-500 pl-4">
            Add Product Dashboard
         </h4>
      <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
        
        {/* Images Section (Simplified for brevity) */}
        <div>
          <p className="text-base font-medium">Product Images</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill("").map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                  accept="image/*" type="file" id={`image${index}`} hidden
                />
                <img
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt="upload" className="max-w-24 cursor-pointer h-24 w-24 rounded border border-gray-200 object-cover"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Product Name</label>
          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="e.g. Nike Air Max or Cotton T-Shirt" className="outline-none py-2 px-3 rounded border border-gray-500/40" required />
        </div>

        {/* --- 3. DYNAMIC VARIANTS SECTION --- */}
        <div className="space-y-2">
          <label className="text-base font-medium">Available Sizes / Weights / Colors</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={variantInput}
              onChange={(e) => setVariantInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addVariant())}
              placeholder="Add size (e.g. XL, 42, 1kg)" 
              className="flex-1 outline-none py-2 px-3 rounded border border-gray-500/40"
            />
            <button 
              type="button" 
              onClick={addVariant}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          
          {/* Displaying added variants as tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {variants.map((v, i) => (
              <span key={i} className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full text-sm font-medium">
                {v}
                <button type="button" onClick={() => removeVariant(v)} className="text-red-500 font-bold ml-1">×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium">Category</label>
          <select onChange={(e)=>setCategory(e.target.value)} value={category} className="outline-none py-2 px-3 rounded border border-gray-500/40" required>
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.path}>{item.path}</option>
            ))}
          </select>
        </div>

        {/* Pricing */}
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-base font-medium">Original Price</label>
            <input onChange={(e)=>setPrice(e.target.value)} value={price} type="number" className="outline-none py-2 px-3 rounded border border-gray-500/40" required />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-base font-medium">Offer Price</label>
            <input onChange={(e)=>setOfferPrice(e.target.value)} value={offerPrice} type="number" className="outline-none py-2 px-3 rounded border border-gray-500/40" required />
          </div>
        </div>

        <button disabled={loading} className={`w-full py-3 bg-indigo-500 text-white font-medium rounded ${loading ? 'opacity-70' : ''}`}>
          {loading ? "UPLOADING..." : "ADD PRODUCT"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;