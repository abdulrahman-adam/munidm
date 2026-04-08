import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const AddCategory = () => {
  const [file, setFile] = useState(null); 
  const [text, setText] = useState("");
  const [path, setPath] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [loading, setLoading] = useState(false);

  const { axios } = useAppContext();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.error("Please select an image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("text", text);
      formData.append("path", path);
      formData.append("bgColor", bgColor);
      formData.append("image", file);

      const { data } = await axios.post("/api/category/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(data.message);
        setText("");
        setPath("");
        setBgColor("");
        setFile(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[calc(100vh-73px)] overflow-y-scroll bg-[#F8FAFC]">
      {/* Centered container for big screens */}
      <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12">
        
        {/* Header Section */}
        <div className="mb-8">
          <h4 className="text-2xl md:text-3xl font-extrabold text-gray-800 border-l-4 border-indigo-600 pl-4">
            Add Category Dashboard
          </h4>
          <p className="text-sm text-gray-500 mt-2 pl-5">Create a new navigation category for your store.</p>
        </div>

        {/* Professional Form Card */}
        <form
          className="bg-white shadow-sm border border-gray-200 rounded-2xl p-5 md:p-10 space-y-6 md:space-y-8"
          onSubmit={onSubmitHandler}
        >
          {/* Image upload */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">Category Image</p>
            <div className="flex items-center gap-4">
              <label htmlFor="category-image" className="group cursor-pointer">
                <input
                  id="category-image"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl border-2 border-dashed border-gray-200 group-hover:border-indigo-400 bg-gray-50 flex items-center justify-center overflow-hidden transition-all">
                  <img
                    src={file ? URL.createObjectURL(file) : assets.upload_area}
                    alt="upload"
                    className={file ? "w-full h-full object-cover" : "w-10 h-10 opacity-40"}
                  />
                </div>
              </label>
              <div className="text-xs text-gray-400">
                <p>Recommended: Square JPG/PNG</p>
                <p>Max size: 2MB</p>
              </div>
            </div>
          </div>

          {/* Form Fields Grid - Swaps to 2 columns on tablet/desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="text" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Category Name</label>
              <input
                id="text"
                type="text"
                placeholder="e.g. Electronics"
                className="outline-none py-3 px-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-base"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>

            {/* Path */}
            <div className="flex flex-col gap-2">
              <label htmlFor="path" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Category Path</label>
              <input
                id="path"
                type="text"
                placeholder="e.g. electronics"
                className="outline-none py-3 px-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-base"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                required
              />
            </div>

            {/* Background color */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="color" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Background Color (Hex/Name)</label>
              <div className="flex gap-3">
                 <input
                  id="color"
                  type="text"
                  placeholder="#EFEFEF or lightblue"
                  className="flex-1 outline-none py-3 px-4 rounded-xl border border-gray-200 focus:border-indigo-500 transition-all text-base"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  required
                />
                {/* Visual Color Preview Square */}
                <div 
                  className="w-12 h-12 rounded-xl border border-gray-200 shadow-inner" 
                  style={{ backgroundColor: bgColor || '#f3f4f6' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>CREATING...</span>
                </>
              ) : (
                "ADD CATEGORY"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;