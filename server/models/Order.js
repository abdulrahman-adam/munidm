import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.js';

const Order = sequelize.define('Order', {
    userId: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
            const value = this.getDataValue('items');
            return typeof value === 'string' ? JSON.parse(value) : value;
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
            // This ensures order.address.street works even if stored as a string
            return typeof value === 'string' ? JSON.parse(value) : value;
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
    }
}, {
    timestamps: true 
});

export default Order;