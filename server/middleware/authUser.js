// import jwt from "jsonwebtoken";

// const authUser = async (req, res, next) => {
//     //Extract thr token from cookies
//     const {token} = req.cookies;
//     //Cheacking the token available or not
//     if(!token) {
//         return res.json({success: false, message: 'Not Authorized'});
//     }

//     try {
//         // Decode the token to extract Id
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
//          req.userId = decoded.id; // ✅ attach here
//         if(tokenDecode.id) {
//             // req.body.userId = tokenDecode.id;
            
//         } else {
//             return res.json({success: false, message: 'Not Authorized'})
//         }
//         next()
//     } catch (error) {
//         res.json({success: false, message: error.message});
//     }
// } 

// export default authUser;


// import jwt from 'jsonwebtoken';
// const authUser = async (req, res, next) => {

//     // 
//     const {token} = req.cookies;
//     // On checking is the token available or not
//     if(!token) {
//         return res.json({success: false, message: 'Not Authorize'});
//     }
//     // Whent the token available
//     try {
//         // decode the token
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
//         if(tokenDecode.id) {
//             // ✅ Ensure req.body is an object before assigning to it
//             if (!req.body) req.body = {};
//             req.body.userId = tokenDecode.id;
//         } else {
//             return res.json({success: false, message: 'Not Authorize'});
//         }

//         // On calling the function next() it will execute controller function
//         next();
//     } catch (error) {
//         console.error(error);
//         res.json({success: false, message:error.message});
//     }
// }

// export default authUser;



import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    // Si pas de token, on renvoie juste success false
    if (!token) {
        return res.json({ success: false });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        
        if (tokenDecode.id) {
            if (!req.body) req.body = {};
            req.body.userId = tokenDecode.id;
            next();
        } else {
            return res.json({ success: false });
        }
    } catch (error) {
        res.json({ success: false });
    }
}

export default authUser;