// import mongoose from "mongoose";

// const categorySchema = new mongoose.Schema({
//    text: {type: String, required: true},
//    path: {type: String, required: true},
//    image: {type: String, required: true},
//    bgColor: {type: String, required: true},

// }, {timestamps: true})

// const Category = mongoose.models.category || mongoose.model('category', categorySchema);
// export default Category;



import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.js'; // Ensure this path points to your sequelize connection

const Category = sequelize.define('Category', {
    // MySQL automatically creates an 'id' primary key, so we don't need to define it
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagePublicId: {
        type: DataTypes.STRING,
        allowNull: true, // Stores the Cloudinary ID for easy deletion
    },
    bgColor: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true, // This handles the 'createdAt' and 'updatedAt' automatically
   //  tableName: 'categories' // Optional: forces the table name to be 'categories'
});

export default Category;