import { v2 as cloudinary } from "cloudinary";

import Category from "../models/Category.js";




export const addCategory = async (req, res) => {
  try {
    // console.log("req.body:", req.body);
    // console.log("req.file:", req.file);

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    // Map fields from req.body
    const categoryData = {
      text: req.body.text,
      path: req.body.path,
      bgColor: req.body.bgColor,
    };

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    // Save to database (include public_id for future delete)
    await Category.create({
      ...categoryData,
      image: result.secure_url,
      imagePublicId: result.public_id,
    });

    res.json({ success: true, message: "The category has been added" });
  } catch (error) {
    console.error("Error in addCategory:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




// the function get all Products
// export const categoryList = async (req, res) => {
//     try {
//         // Getting the products from the database
//         const categories = await Category.find({});// find({}) return all the products
//         return res.json({success: true, categories});
//     } catch (error) {
//         console.log(error.message);
//         return res.json({success: false, message: error.message});
//     }
// }

// The function to get all Categories
export const categoryList = async (req, res) => {
    try {
        // Mongoose: Category.find({}) 
        // Sequelize: Category.findAll()
        const categories = await Category.findAll(); 

        return res.json({ success: true, categories });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}


// the function delete Product
// export const deleteCategory = async (req, res) => {
//   try {
//     const { id } = req.body;

//     // 1️⃣ Find category by ID
//     const category = await Category.findById(id);
//     if (!category) {
//       return res.status(404).json({ success: false, message: "Category not found" });
//     }

//     // 2️⃣ Delete image from Cloudinary
//     if (category.image && category.image.publicId) {
//       try {
//         await cloudinary.uploader.destroy(category.image.publicId);
//       } catch (err) {
//         console.warn("Error deleting image from Cloudinary:", err.message);
//       }
//     }

//     // 3️⃣ Delete category from database
//     await Category.findByIdAndDelete(id);

//     // 4️⃣ Send success response
//     return res.json({ success: true, message: "Category deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting category:", error.message);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };


export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("Incoming ID to delete:", id); // Check if this is a number or string

    const category = await Category.findByPk(id);
    
    if (!category) {
      console.log("DATABASE SEARCH: No category found with ID:", id);
      // Change status to 200 temporarily to see the JSON message in the browser
      return res.status(200).json({ success: false, message: `Category ID ${id} not found in MySQL` });
    }

    if (category.imagePublicId) {
      await cloudinary.uploader.destroy(category.imagePublicId);
    }

    await category.destroy();

    return res.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("SQL Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};