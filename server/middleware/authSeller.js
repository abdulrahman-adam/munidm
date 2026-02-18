
// import jwt from "jsonwebtoken";

// const authSeller = async (req, res, next) => {
//     // Getting the cookie from the request
//     const {sellerToken} = req.cookies;

//     if(!sellerToken) {
//         return res.json({success: false, message: 'Not Authorized'})
//     }
//     try {
//         // Decode the token to extract Id
//         const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET)
//         if(tokenDecode.email === process.env.SELLER_EMAIL) {
//             next()
//         } else {
//             return res.json({success: false, message: 'Not Authorized'})
//         }       
//     } catch (error) {
//         res.json({success: false, message: error.message});
//     }
    
// }

// export default authSeller;


// import jwt from 'jsonwebtoken';

// const authSeller = async (req, res, next) => {
//     try {
//         // Add a check: if req.cookies doesn't exist, it means cookie-parser failed or no cookies sent
//         if (!req.cookies) {
//             return res.json({ success: false, message: "No cookies found. Please login again." });
//         }

//         const { sellerToken } = req.cookies;

//         if (!sellerToken) {
//             return res.json({ success: false, message: "Not Authorized. Login Again" });
//         }

//         const token_decode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        
//         // Custom logic for your seller ID
//         req.body.sellerId = token_decode.id; 

//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// export default authSeller;




import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    try {
        const { sellerToken } = req.cookies;

        // Si pas de token, on renvoie success: false MAIS sans message d'erreur agressif
        if (!sellerToken) {
            return res.json({ success: false }); 
        }

        const token_decode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        
        req.body.sellerId = token_decode.id; 
        next();
    } catch (error) {
        // En cas d'erreur de jeton (expiré, etc.), on reste discret
        res.json({ success: false });
    }
};

export default authSeller;