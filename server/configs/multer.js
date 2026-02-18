// import multer from "multer";

// export const upload = multer({
//     storage: multer.diskStorage({}),
//     limits: { fileSize: 5 * 1024 * 1024 } // Allow up to 5MB per image
// });

import multer from "multer";

const storage = multer.diskStorage({});
const upload = multer({ storage });

export { upload };