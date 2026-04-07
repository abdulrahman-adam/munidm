


// import Product from "../models/Product.js";
// import { v2 as cloudinary } from "cloudinary";

// the function add Product



// export const addProduct = async (req, res) => {
//     try {
//         const { name, description, category, price, offerPrice } = req.body;
//         const files = req.files; 

//         if (!files || files.length === 0) {
//             return res.json({ success: false, message: "No images uploaded" });
//         }

//         // Upload to Cloudinary
//         // Tip: For 4+ images, sequential upload is sometimes more stable than Promise.all 
//         // on slow local connections to prevent ECONNRESET
//         // Inside productController.js -> addProduct
// const imagesUrl = [];

// // Use a standard for...of loop to ensure they upload one at a time
// for (const file of files) {
//     try {
//         console.log(`Uploading ${file.originalname}...`);
//         const result = await cloudinary.uploader.upload(file.path, { 
//             resource_type: 'image',
//             folder: 'products'
//         });
//         imagesUrl.push(result.secure_url);
//         console.log(`Successfully uploaded: ${file.originalname}`);
//     } catch (uploadError) {
//         console.error(`Failed to upload ${file.originalname}:`, uploadError);
//         // If one fails, you might want to stop the whole process
//         throw new Error(`Cloudinary upload failed for ${file.originalname}`);
//     }
// }

//         // Handle description parsing safely
//         let parsedDescription;
//         try {
//             parsedDescription = typeof description === 'string' ? JSON.parse(description) : description;
//         } catch (e) {
//             parsedDescription = description; // Fallback
//         }

//         await Product.create({
//             name,
//             description: parsedDescription, 
//             category,
//             price: Number(price),
//             offerPrice: Number(offerPrice),
//             image: imagesUrl, 
//         });

//         res.json({ success: true, message: "The product has been added successfully" });

//     } catch (error) {
//         console.error("Add Product Error:", error);
//         res.json({ success: false, message: error.message });
//     }
// }


// // the function get all Products

// export const productList = async (req, res) => {
//     try {
//         // 1. Get products from MySQL
//         const products = await Product.findAll(); 

//         // 2. Format the products so JSON strings become real JavaScript Objects/Arrays
//         const formattedProducts = products.map(product => {
//             // .get({ plain: true }) converts the Sequelize instance to a standard object
//             const productData = product.get({ plain: true });

//             // Parse 'image' if it is a string (MySQL JSON quirk)
//             if (typeof productData.image === 'string') {
//                 try {
//                     productData.image = JSON.parse(productData.image);
//                 } catch (e) {
//                     productData.image = []; // Fallback
//                 }
//             }

//             // Parse 'description' if it is a string
//             if (typeof productData.description === 'string') {
//                 try {
//                     productData.description = JSON.parse(productData.description);
//                 } catch (e) {
//                     productData.description = [];
//                 }
//             }

//             return productData;
//         });

//         // 3. Send the clean, parsed data
//         return res.json({ success: true, products: formattedProducts });
        
//     } catch (error) {
//         console.log(error.message);
//         return res.json({ success: false, message: error.message });
//     }
// }

import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

// the function add Product
export const addProduct = async (req, res) => {
    try {
        // --- ADDED 'variants' HERE ---
        const { name, description, category, price, offerPrice, variants } = req.body;
        const files = req.files; 

        if (!files || files.length === 0) {
            return res.json({ success: false, message: "No images uploaded" });
        }

        const imagesUrl = [];

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
                throw new Error(`Cloudinary upload failed for ${file.originalname}`);
            }
        }

        // Handle description parsing safely
        let parsedDescription;
        try {
            parsedDescription = typeof description === 'string' ? JSON.parse(description) : description;
        } catch (e) {
            parsedDescription = description;
        }

        // --- ADDED PARSING FOR VARIANTS ---
        let parsedVariants;
        try {
            parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants;
        } catch (e) {
            parsedVariants = variants; // Fallback
        }

        await Product.create({
            name,
            description: parsedDescription, 
            category,
            price: Number(price),
            offerPrice: Number(offerPrice),
            image: imagesUrl,
            variants: parsedVariants, // --- SAVING VARIANTS TO DB ---
        });

        res.json({ success: true, message: "The product has been added successfully" });

    } catch (error) {
        console.error("Add Product Error:", error);
        res.json({ success: false, message: error.message });
    }
}

// the function get all Products
export const productList = async (req, res) => {
    try {
        const products = await Product.findAll(); 

        const formattedProducts = products.map(product => {
            const productData = product.get({ plain: true });

            if (typeof productData.image === 'string') {
                try { productData.image = JSON.parse(productData.image); } catch (e) { productData.image = []; }
            }

            if (typeof productData.description === 'string') {
                try { productData.description = JSON.parse(productData.description); } catch (e) { productData.description = []; }
            }

            // --- ADDED PARSING FOR VARIANTS IN LIST ---
            if (typeof productData.variants === 'string') {
                try {
                    productData.variants = JSON.parse(productData.variants);
                } catch (e) {
                    productData.variants = [];
                }
            }

            return productData;
        });

        return res.json({ success: true, products: formattedProducts });
        
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

// ... rest of the functions (productById, changeStock, deleteProduct) remain the same

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