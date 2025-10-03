import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//generate token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      })
    }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      _id: user._id, //mongoDB id
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

//login funxtion
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(500).json({ message: "Invalid email or password" });
//     }
//     //compare the password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(500).json({ message: "Invalid email or password" });
//     }

//     res.status(201).json({
//       _id: user._id, //mongoDB id
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//     // if (!existingUser) {
//     //   return res.status(400).json({ message: "Invalid email or password" });
//     // }
//     // const isMatch = await bcrypt.compare(password, existingUser.password);
//     // res.status(200).json({
//     //   _id: existingUser._id,
//     //   name: existingUser.name,
//     //   email: existingUser.email,
//     //   token: generateToken(existingUser._id),
//     // });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

export const loginUser = async (req, res) => {
  try {
    console.log("🟢 Login request received:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("👤 Found user:", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);
    console.log("🔐 Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("🔴 Login error:", error); // <--- IMPORTANT
    res.status(500).json({ message: "Server error" });
  }
};



// (chatgpt)
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const existingUser = await User.findOne({ email });

//     if (!existingUser) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // compare the password
//     const isMatch = await bcrypt.compare(password, existingUser.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // success response
//     res.status(200).json({
//       _id: existingUser._id,
//       name: existingUser.name,
//       email: existingUser.email,
//       token: generateToken(existingUser._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };










//get user profile function
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
