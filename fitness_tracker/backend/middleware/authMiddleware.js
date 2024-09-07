// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js'; // Adjust the path if necessary

// const authenticateUser = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Extract token from the Authorization header

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//     const user = await User.findById(decoded.id).select("-password"); // Fetch user by decoded token ID

//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized: User not found" });
//     }

//     req.user = user; // Attach user to req object
//     next(); // Continue to the next middleware or route handler
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };

// export default authenticateUser;

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

console.log('SECRET:', process.env.SECRET);  // This should print the secret key

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);  // Use process.env.SECRET here
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticateUser;

