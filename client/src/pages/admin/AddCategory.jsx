import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const AddCategory = () => {
  const [file, setFile] = useState(null); 
  const [text, setText] = useState("");
  const [path, setPath] = useState("");
  const [bgColor, setBgColor] = useState("");
  
  // 1. Add loading state
  const [loading, setLoading] = useState(false);

  const { axios } = useAppContext();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    if (!file) {
      toast.error("Please select an image");
      return;
    }

    // Start loading
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
      // 2. Stop loading regardless of result
      setLoading(false);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between bg-white">
       <h4 className="text-2xl font-bold text-gray-800 mt-8 border-l-4 border-blue-500 pl-4">
         Add Category Dashboard
        </h4>
      <form
        className="md:p-10 p-4 space-y-5 max-w-lg"
        onSubmit={onSubmitHandler}
      >
        {/* Image upload */}
        <div>
          <p className="text-base font-medium">Category Image</p>
          <div className="flex items-center gap-3 mt-3">
            <label htmlFor="category-image" className="cursor-pointer">
              <input
                id="category-image"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
              <img
                src={file ? URL.createObjectURL(file) : assets.upload_area}
                alt="upload"
                className="w-24 h-24 object-cover border border-gray-300 rounded-md"
              />
            </label>
          </div>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="text" className="text-base font-medium">Category Name</label>
          <input
            id="text"
            type="text"
            placeholder="Type here"
            className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        {/* Path */}
        <div className="flex flex-col gap-2">
          <label htmlFor="path" className="text-base font-medium">Category Path</label>
          <input
            id="path"
            type="text"
            placeholder="Type here"
            className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            required
          />
        </div>

        {/* Background color */}
        <div className="flex flex-col gap-2">
          <label htmlFor="color" className="text-base font-medium">Category Color</label>
          <input
            id="color"
            type="text"
            placeholder="Type here"
            className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            required
          />
        </div>

        {/* Submit button with Spinner */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto px-12 py-2.5 bg-indigo-500 hover:bg-indigo-600 transition text-white font-medium rounded flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              "ADD Category"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;