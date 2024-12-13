const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Register a new user
const register = async (req, res) => {
  try {
    // Upload avatar image to Cloudinary
    const avatar = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatars", // Fixed folder name from "awatars" to "avatars"
      width: 130,
      crop: "scale",
    });

    const { name, email, password } = req.body;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Böyle bir kullanıcı zaten var!" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Şifre en az 6 karakter olmalıdır!" });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      avatar: {
        public_id: avatar.public_id,
        url: avatar.secure_url,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, "SECRETOKEN", {
      expiresIn: "1h",
    });

    // Cookie options
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    };

    // Return response with the token and user details
    res
      .status(201)
      .cookie("token", token, cookieOptions)
      .json({ newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucuda bir hata oluştu!" });
  }
};

// Login existing user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Böyle bir kullanıcı bulunamadı!" });
    }

    // Compare password with stored hash
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ message: "Yanlış şifre veya kullanıcı adı" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "SECRETOKEN", { expiresIn: "1h" });

    // Cookie options
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    };

    // Return response with the token and user details
    res.status(200).cookie("token", token, cookieOptions).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucuda bir hata oluştu!" });
  }
};

// Log out user
const logOut = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now()),
  };
  res
    .status(200)
    .cookie("token", null, cookieOptions)
    .json({ message: "Çıkış işlemi başarılı!" });
};

// Forgot password
const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "Böyle bir kullanıcı bulunamadı!" });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  const passwordUrl = `${req.protocol}://${req.get(
    "host"
  )}/reset/${resetToken}`;
  const message = `Şifre sıfırlamak için kullanacağınız link: ${passwordUrl}`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: req.body.email,
      subject: "Şifre Sıfırlama",
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Mailinizi kontrol ediniz" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(500).json({ message: error.message });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Geçersiz Token!" });
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();

  const token = jwt.sign({ id: user._id }, "SECRETOKEN", { expiresIn: "1h" });
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  };

  res.status(200).cookie("token", token, cookieOptions).json({ user, token });
};

// Get user details
const userDetail = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ user });
};

module.exports = {
  register,
  login,
  logOut,
  forgotPassword,
  resetPassword,
  userDetail,
};
