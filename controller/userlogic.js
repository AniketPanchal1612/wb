const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// exports.registerUser = async (req, res) => {
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const { name, email, password, number, address } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new User({ name, email, password: hashedPassword, number, address });
//     await user.save();
//     res.status(201).json({ message: "User Resgistration successful" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, number, address } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, number, address });
    await newUser.save();

    res.status(201).json({ message: "User registration successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { email: user.email, id: user._id },
      "your_secret_key",
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ message: "login successful", authority: user.authority, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
