// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// //the function Register user
// export const register = async(req, res) => {
//     try {
//         // Getting the data from request body
//         const {name, email, password} = req.body;

//         // Checking the fields
//         if(!name || !email || !password) {
//             return res.json({success: false, message: "Missing Details"})
//         }
//         // Cheacking if existing any email by this particullar email
//         const existingUser = await User.findOne({email});
//         if(existingUser) 
//             return res.json({success: false, message: "User already exists"});
//         // Encrypyt the user password
//         const hashedPassword = await bcrypt.hash(password, 10);
//         //Create the user data
//         const user = await User.create({name, email, password: hashedPassword});
//         // Create the token 
//         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
//         // Send the token to response
//         res.cookie('token', token, {
//             httpOnly: true, // Prevent Javascript to access cookie
//             secure:process.env.NODE_ENV === 'production', // Use secure cookie in production
//             sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
//             maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
//         });
//         // Send this response to user
//         return res.json({success: true, user: {email: user.email, name: user.name}})
//     } catch (error) {
//         console.log(error.message)
//         res.json({success: false, message: error.message});
//     }
// }

// // the function login user

// export const login = async(req, res) => {
//     try {
//         // Getting the information from request body
//         const {email, password} = req.body
//         //Cheacking if email and password available 
//         if(!email || !password) {
//             return res.json({success: false, message: "Email and Password are required"})
//         }

//         // Find the user from database
//         const user = await User.findOne({email})
//         // There is no user available by this particullar 
//         if(!user) {
//             return res.json({success: false, message: "Invalid email or password"});
//         }
//         // On matching the password in database and the password entered
//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch) {
//             return res.json({success: false, message: "Invalid email or password"});
//         }
//         // Generate the token 
//          const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
//         // Send the token to response
//         res.cookie('token', token, {
//             httpOnly: true, // Prevent Javascript to access cookie
//             secure:process.env.NODE_ENV === 'production', // Use secure cookie in production
//             sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
//             maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
//         });
//         // Send this response to user
//         return res.json({success: true, user: {email: user.email, name: user.name}})

//     } catch (error) {
//         console.log(error.message)
//         res.json({success: false, message: error.message});
//     }
// }

// // the function Cheack Auth
// export const isAuth = async(req, res) => {
//     try {
//         // On extract the userId
//         const {userId} = req.body;
//         // Find the user from the database
//         const user = await User.findById(userId).select("-password");
//         // return the this user in response
//         return res.json({success: true, user});
//     } catch (error) {
//         console.log(error.message)
//         res.json({success: false, message: error.message});
//     }
// }

// // The function logout
// export const logout = async (req, res) => {
//     try {
//         // On clear the cookie 
//         res.clearCookie('token', {
//             httpOnly: true,
//             secure:process.env.NODE_ENV === 'production', 
//             sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
//         });
//         return res.json({success: true, message: "You are logged out"})
//     } catch (error) {
//         console.log(error.message)
//         res.json({success: false, message: error.message});
//     }
// }



import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Sequelize findOne syntax uses a 'where' clause
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user (role will default to 'USER' per the model we made)
        const user = await User.create({ name, email, password: hashedPassword });

        // IMPORTANT: MySQL uses 'id', not '_id'
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, user: { email: user.email, name: user.name, role: user.role } });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "Email and Password are required" });
        }

        // Sequelize findOne with where clause
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        // Use user.id (MySQL standard)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, user: { email: user.email, name: user.name, role: user.role } });

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Check Auth
export const isAuth = async (req, res) => {
    try {
        const { userId } = req.body;

        // Sequelize uses findByPk (Find By Primary Key) for IDs
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] } // This is how you select("-password")
        });

        return res.json({ success: true, user });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "You are logged out" });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}