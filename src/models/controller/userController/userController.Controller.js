import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../../../../DB/models/UserModel/UserModel.DB.js";
import dotenv from "dotenv";
dotenv.config();
export const UserRegister = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !password || !name) {
      const missingFields = [
        !email ? "(Email)" : "",
        !password ? "(Password)" : "",
        !name ? "(Name)" : "",
      ]
        .filter((field) => field)
        .join(" ");

      return res.status(400).json({
        success: false,
        message: `${missingFields} is required`,
      });
    }
    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: `password must be more than 6 character`,
      });
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email))
      return res.status(400).json({
        success: false,
        message: `Invalid email format`,
      });
    const registeredUser = await UserModel.findOne({ email });
    if (registeredUser) {
      res
        .status(400)
        .json({ success: false, message: "Email is already Exists" });
    } else {
      const decryptedPass = await bcrypt.hash(password, 10);
      await UserModel.create({ email, name, password: decryptedPass });
      res.json({ success: true, message: "Registration Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};
export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await UserModel.findOne({ email });
    
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }
    const isMatched = bcrypt.compare(password, user.password);
    if (!isMatched) {
      res.status(400).json({ success: false, message: "Invalid Password" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "8h",
      });
      res.status(200).json({
        success: true,
        message: "Login Successfully",
        result: { user: user, token: token },
      });
    }
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: `Login Controller ${error}`,
    });
  }
};


