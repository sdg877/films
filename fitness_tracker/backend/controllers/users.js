import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const create = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(400).json({ message: err.message });
    }
}

// export const login = async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         if (!user) throw new Error('User not found');

//         const match = await bcrypt.compare(req.body.password, user.password);
//         if (!match) throw new Error('Invalid password');

//         res.json(createJWT(user));
//     } catch (error) {
//         console.error(error); 
//         res.status(400).json({ error: 'Bad Credentials' });
//     }
// }


export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token using the secret from the .env file
      const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
  
      res.json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to update user' });
    }
}

export default function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}

export const checkToken = (req, res) => {
    console.log('req.user', req.user);
    res.json(req.exp);
  }