import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_Key = process.env.JWT_SECRET;

//logic for Login

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // math with Hashed Password
    const ValidPassword = await bcrypt.compare(password, user.password);
    if (!ValidPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    //now generate the token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_Key);
    res.status(200).json({
      token: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

//logic for Signup
const Signup = async (req, res) => {
  try {
    const { name, email, password, country } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user first
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      country,
    });

    // Now generate the token after user is created
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      JWT_Key
    );

    // Send response
    res.status(200).json({
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
      },
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { Login, Signup };
