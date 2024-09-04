import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

// export const create = async (req, res) => {
//     try {
//         const user = await User.create(req.body);
//         const token = createJWT(user);
//         res.json(token);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// }

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

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error('User not found');

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error('Invalid password');

        res.json(createJWT(user));
    } catch (error) {
        console.error(error); 
        res.status(400).json({ error: 'Bad Credentials' });
    }
}

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