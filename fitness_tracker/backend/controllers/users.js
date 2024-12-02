import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const create = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const user = await User.create({
      name,  
      email,
      password,
      isAdmin: isAdmin || false,
    });

    const token = createJWT(user);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },  
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { user: { _id: user._id, isAdmin: user.isAdmin } },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      token,
      user: { id: user._id, email: user.email, isAdmin: user.isAdmin },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default function createJWT(user) {
  return jwt.sign(
    { user: { _id: user._id, isAdmin: user.isAdmin } },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

export const checkToken = (req, res) => {
  res.json(req.exp);
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true, 
    });

    res.json(updatedUser); 
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update user" });
  }
};

export const validateToken = (req, res) => {
  res.status(200).json({ user: req.user });
};


