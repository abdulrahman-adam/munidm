import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.js';
// import { sequelize } from '../config/db.js'; // Adjust based on your DB config file

const Contact = sequelize.define('Contact', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true }
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { timestamps: true,tableName: 'contacts'});

export default Contact;