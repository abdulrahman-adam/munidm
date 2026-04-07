// import { DataTypes } from 'sequelize';
// import { sequelize } from '../configs/db.js';

// const Order = sequelize.define('Order', {
//     userId: {
//         type: DataTypes.STRING, 
//         allowNull: false
//     },
//     items: {
//         type: DataTypes.JSON,
//         allowNull: false,
//         get() {
//             const value = this.getDataValue('items');
//             return typeof value === 'string' ? JSON.parse(value) : value;
//         }
//     },
//     amount: {
//         type: DataTypes.FLOAT,
//         allowNull: false
//     },
//     address: {
//         type: DataTypes.JSON,
//         allowNull: false,
//         get() {
//             const value = this.getDataValue('address');
//             // This ensures order.address.street works even if stored as a string
//             return typeof value === 'string' ? JSON.parse(value) : value;
//         }
//     },
//     status: {
//         type: DataTypes.STRING,
//         defaultValue: 'Order Placed'
//     },
//     paymentType: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     isPaid: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false
//     }
// }, {
//     timestamps: true 
// });

// export default Order;


import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.js';

const Order = sequelize.define('Order', {
    userId: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    /**
     * Items structure will now professionally support variants:
     * [
     * { "product": "123", "quantity": 2, "variant": "Red-Large" },
     * { "product": "456", "quantity": 1, "variant": "Standard" }
     * ]
     */
    items: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
            const value = this.getDataValue('items');
            return typeof value === 'string' ? JSON.parse(value) : value;
        },
        // Professional Setter to ensure data consistency
        set(value) {
            this.setDataValue('items', typeof value === 'string' ? JSON.parse(value) : value);
        }
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    address: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
            const value = this.getDataValue('address');
            return typeof value === 'string' ? JSON.parse(value) : value;
        },
        set(value) {
            this.setDataValue('address', typeof value === 'string' ? JSON.parse(value) : value);
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Order Placed'
    },
    paymentType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    // Adding a tracking ID can be helpful for variants-heavy orders
    paymentId: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    }
}, {
    timestamps: true 
});

export default Order;