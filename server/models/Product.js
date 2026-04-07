

import { DataTypes } from 'sequelize';
import { sequelize } from "../configs/db.js";


const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // MySQL doesn't have an 'Array' type; we use JSON for flexibility
    description: {
        type: DataTypes.JSON, 
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    offerPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    // --- NEW ATTRIBUTE ADDED BELOW ---
    variants: {
        type: DataTypes.JSON,
        allowNull: true, // Optional, some products might not have sizes/weights
        comment: "Stores sizes (39, 40) or weights (1kg, 500g) as a JSON array"
    },
   image: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('image');
            // If it's a string, parse it. If it's already an object/array, return it.
            if (typeof rawValue === 'string') {
                try {
                    return JSON.parse(rawValue);
                } catch (e) {
                    return [];
                }
            }
            return rawValue || [];
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    inStock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    // This automatically adds createdAt and updatedAt (equivalent to timestamps: true)
    timestamps: true 
});

export default Product;