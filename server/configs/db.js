
// import dotenv from 'dotenv';
// import { Sequelize } from 'sequelize';

// dotenv.config();

// const sequelize = new Sequelize(
//     process.env.MYSQL_DATABASE, 
//     process.env.MYSQL_USER, 
//     process.env.MYSQL_PASSWORD, 
//     {
//         host: process.env.MYSQL_HOST,
//         dialect: 'mysql',
//         logging: false, 
//         // 1. Dialect options to handle larger data and timeouts
//         dialectOptions: {
//             connectTimeout: 60000, // 60 seconds
//         },
//         // 2. Connection Pool to prevent ECONNRESET
//         pool: {
//             max: 10,          // Increase max connections
//             min: 0,
//             acquire: 60000,   // Wait longer to acquire connection
//             idle: 10000       // Close idle connections after 10 seconds
//         },
//         // 3. Retry logic for temporary connection drops
//         retry: {
//             match: [
//                 /read ECONNRESET/,
//                 /ETIMEDOUT/,
//                 /max_allowed_packet/
//             ],
//             max: 3 // Retry 3 times before failing
//         }
//     }
// );

// const connectDB = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Database Connected (MySQL)');
        
//         // 4. Force MySQL to increase its packet limit for this session
//         await sequelize.query("SET GLOBAL max_allowed_packet = 67108864;");
        
//     } catch (error) {
//         console.error('Unable to connect to the database:', error.message);
//     }
// };

// export { sequelize };
// export default connectDB;


import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE, 
    process.env.MYSQL_USER, 
    process.env.MYSQL_PASSWORD, 
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false, 
        dialectOptions: {
            connectTimeout: 60000,
            // 1. THIS IS THE CORRECT WAY to handle large packets 
            // without needing SUPER privileges:
            charset: 'utf8mb4',
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 60000,
            idle: 10000
        },
        // 2. Add this to prevent timezone privilege errors
        timezone: '+00:00', 
        retry: {
            match: [
                /read ECONNRESET/,
                /ETIMEDOUT/,
                /max_allowed_packet/
            ],
            max: 3 
        }
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database Connected (MySQL)');
        
        // 3. REMOVED: await sequelize.query("SET GLOBAL max_allowed_packet...");
        // You cannot run SET GLOBAL on a VPS MySQL without root/super access.
        // If you need larger packets, you must edit /etc/mysql/my.cnf on the VPS itself.
        
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
};

export { sequelize };
export default connectDB;