
// import Product from "../models/Product.js";
// import {v2 as cloudinary} from "cloudinary";
// // the function add Product
// export const addProduct = async (req, res) => {
//     try {
//         // Getting the product data from request body
//         let productData = JSON.parse(req.body.productData);
//         const images = req.files;
//         let imagesUrl = await Promise.all(
//             images.map(async (item) => {
//                 let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
//                 return result.secure_url
//             })
//         )

//         // Store the productData in database
//         await Product.create({...productData, image:imagesUrl});
//         // Send the respons
//         res.json({success: true, message: "The product has been added"})
//     } catch (error) {
//         console.log(error.message);
//         return res.json({success: false, message: error.message});
//     }
// }


// // the function get all Products
// export const productList = async (req, res) => {
//     try {
//         // Getting the products from the database
//         const products = await Product.find({});// find({}) return all the products
//         return res.json({success: true, products});
//     } catch (error) {
//         console.log(error.message);
//         return res.json({success: false, message: error.message});
//     }
// }

// // the function get Product By Id
// export const productById = async (req, res) => {
//     try {
//         // Getting the individuel product
//         const {id} = req.body;
//         // Find the product from the database
//         const product = await Product.findById(id);
//         // Send the product to response
//         return res.json({success: true, product});
//     } catch (error) {
//          console.log(error.message);
//         return res.json({success: false, message: error.message});
//     }
// }

// // the function change the stoch
// export const changeStock = async (req, res) => {
//     try {
//         // Getting the product from the body
//         const {id, inStock} = req.body;
//         // Find the product
//         await Product.findByIdAndUpdate(id, {inStock})
//         // Send the product to response
//         return res.json({success: true,message: "The stock has been updated"});
//     } catch (error) {
//          console.log(error.message);
//         return res.json({success: false, message: error.message});
//     }
// }



// // the function delete Product
// export const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.body;

//     // 1. Check if product exists
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     // 2. Delete images from Cloudinary if they exist
//     if (product.image && product.image.length > 0) {
//       for (let url of product.image) {
//         try {
//           // Extract public_id from the Cloudinary URL
//           const publicId = url.split("/").pop().split(".")[0];
//           await cloudinary.uploader.destroy(publicId);
//         } catch (err) {
//           console.warn("Error deleting image from Cloudinary:", err.message);
//         }
//       }
//     }

//     // 3. Delete product from DB
//     await Product.findByIdAndDelete(id);

//     return res.json({ success: true, message: "Product deleted successfully" });
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };


import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

// the function add Product



export const addProduct = async (req, res) => {
    try {
        const { name, description, category, price, offerPrice } = req.body;
        const files = req.files; 

        if (!files || files.length === 0) {
            return res.json({ success: false, message: "No images uploaded" });
        }

        // Upload to Cloudinary
        // Tip: For 4+ images, sequential upload is sometimes more stable than Promise.all 
        // on slow local connections to prevent ECONNRESET
        // Inside productController.js -> addProduct
const imagesUrl = [];

// Use a standard for...of loop to ensure they upload one at a time
for (const file of files) {
    try {
        console.log(`Uploading ${file.originalname}...`);
        const result = await cloudinary.uploader.upload(file.path, { 
            resource_type: 'image',
            folder: 'products'
        });
        imagesUrl.push(result.secure_url);
        console.log(`Successfully uploaded: ${file.originalname}`);
    } catch (uploadError) {
        console.error(`Failed to upload ${file.originalname}:`, uploadError);
        // If one fails, you might want to stop the whole process
        throw new Error(`Cloudinary upload failed for ${file.originalname}`);
    }
}

        // Handle description parsing safely
        let parsedDescription;
        try {
            parsedDescription = typeof description === 'string' ? JSON.parse(description) : description;
        } catch (e) {
            parsedDescription = description; // Fallback
        }

        await Product.create({
            name,
            description: parsedDescription, 
            category,
            price: Number(price),
            offerPrice: Number(offerPrice),
            image: imagesUrl, 
        });

        res.json({ success: true, message: "The product has been added successfully" });

    } catch (error) {
        console.error("Add Product Error:", error);
        res.json({ success: false, message: error.message });
    }
}

// export const addProduct = async (req, res) => {
//     try {
//         const { name, description, category, price, offerPrice } = req.body;
//         const files = req.files;

//         if (!files || files.length === 0) {
//             return res.json({ success: false, message: "No images uploaded" });
//         }

//         // 1. Parallel Upload with Optimization
//         // Using Promise.all is much faster than the for...of loop
//         const imagesUrl = await Promise.all(
//             files.map(async (file) => {
//                 const result = await cloudinary.uploader.upload(file.path, {
//                     resource_type: 'image',
//                     folder: 'products',
//                     // Speed Tip: Quality 'auto' and a width limit reduces processing time
//                     transformation: [
//                         { width: 1000, crop: "limit", quality: "auto" }
//                     ]
//                 });
//                 return result.secure_url;
//             })
//         );

//         // 2. Safe Description Parsing
//         let parsedDescription;
//         try {
//             parsedDescription = typeof description === 'string' ? JSON.parse(description) : description;
//         } catch (e) {
//             parsedDescription = description;
//         }

//         // 3. Create in Database
//         await Product.create({
//             name,
//             description: parsedDescription,
//             category,
//             // price: Number(price),
//             // offerPrice: Number(offerPrice),
//              price: parseFloat(price),
//             offerPrice: parseFloat(offerPrice),
//             image: imagesUrl,
//         });

//         res.json({ success: true, message: "The product has been added successfully" });

//     } catch (error) {
//         console.error("Add Product Error:", error);
//         // Ensure we only send one response even if an upload fails
//         if (!res.headersSent) {
//             res.json({ success: false, message: error.message });
//         }
//     }
// }
// the function get all Products

export const productList = async (req, res) => {
    try {
        // 1. Get products from MySQL
        const products = await Product.findAll(); 

        // 2. Format the products so JSON strings become real JavaScript Objects/Arrays
        const formattedProducts = products.map(product => {
            // .get({ plain: true }) converts the Sequelize instance to a standard object
            const productData = product.get({ plain: true });

            // Parse 'image' if it is a string (MySQL JSON quirk)
            if (typeof productData.image === 'string') {
                try {
                    productData.image = JSON.parse(productData.image);
                } catch (e) {
                    productData.image = []; // Fallback
                }
            }

            // Parse 'description' if it is a string
            if (typeof productData.description === 'string') {
                try {
                    productData.description = JSON.parse(productData.description);
                } catch (e) {
                    productData.description = [];
                }
            }

            return productData;
        });

        // 3. Send the clean, parsed data
        return res.json({ success: true, products: formattedProducts });
        
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

// the function get Product By Id
export const productById = async (req, res) => {
    try {
        const { id } = req.body;
        // Mongoose: .findById(id) -> Sequelize: .findByPk(id) (Primary Key)
        const product = await Product.findByPk(id);
        
        return res.json({ success: true, product });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

// the function change the stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        
        // Sequelize: update({fields}, {where clause})
        await Product.update({ inStock }, { where: { id } });

        return res.json({ success: true, message: "The stock has been updated" });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

// the function delete Product
// export const deleteProduct = async (req, res) => {
//     try {
//         const { id } = req.body;

//         // 1. Check if product exists
//         const product = await Product.findByPk(id);
//         if (!product) {
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }

//         // 2. Delete images from Cloudinary
//         if (product.image && product.image.length > 0) {
//             for (let url of product.image) {
//                 try {
//                     const publicId = url.split("/").pop().split(".")[0];
//                     await cloudinary.uploader.destroy(publicId);
//                 } catch (err) {
//                     console.warn("Error deleting image from Cloudinary:", err.message);
//                 }
//             }
//         }

//         // 3. Delete product from DB
//         // Mongoose: .findByIdAndDelete(id) -> Sequelize: .destroy({where})
//         await Product.destroy({ where: { id } });

//         return res.json({ success: true, message: "Product deleted successfully" });
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;

        // 1. Check if product exists
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // --- FIX: Handle MySQL JSON Parsing ---
        let images = product.image;
        if (typeof images === 'string') {
            try {
                images = JSON.parse(images);
            } catch (e) {
                images = [images]; // Fallback if it's just a single string URL
            }
        }

        // 2. Delete images from Cloudinary
        if (Array.isArray(images) && images.length > 0) {
            for (let url of images) {
                try {
                    // Safety check: ensure url is a valid string before splitting
                    if (typeof url === 'string' && url.includes('/')) {
                        const publicId = url.split("/").pop().split(".")[0];
                        
                        // Only attempt delete if we found a valid-looking ID
                        if (publicId && publicId !== "[" && publicId !== "]") {
                            await cloudinary.uploader.destroy(publicId);
                        }
                    }
                } catch (err) {
                    console.warn("Error deleting image from Cloudinary:", err.message);
                }
            }
        }

        // 3. Delete product from DB
        await Product.destroy({ where: { id } });

        return res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete Controller Error:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};