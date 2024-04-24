import RegisterStrategy from "./RegisterStrategy.js";
import User from "../models/userModel.js";

class RegisterAsSeller extends RegisterStrategy {
  async register(req, res) {
    const { name, email, password, isSeller, isAdmin } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      isAdminSeller: isSeller,
      isAdmin: isAdmin,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isAdminSeller: user.isAdminSeller,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
}

export default RegisterAsSeller;
