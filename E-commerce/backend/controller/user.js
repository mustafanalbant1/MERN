const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { MailtrapClient } = require("mailtrap");

const register = async (req, res) => {
  try {
    const avatar = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "awatars",
      width: 130,
      crop: "scale",
    });
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Böyle bir kullanıcı zaten var!",
      });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Şifre en az 6 karakter olmalıdır!" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      avatar: {
        public_id: avatar.public_id,
        url: avatar.secure_url,
      },
    });

    const token = jwt.sign({ id: newUser._id }, "SECRETOKEN", {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    };

    res.status(201).cookie("token", token, cookieOptions).json({
      newUser,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucuda bir hata oluştu!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(500)
        .json({ message: "Böyle bir kullanıcı bulunamadı!" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      res.status(500).json({ message: "Yanlış şifre veya kullanıcı adı" });
    }

    const token = jwt.sign({ id: user._id }, "SECRETOKEN", {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    };

    res.status(200).cookie("token", token, cookieOptions).json({
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucuda bir hata oluştu!" });
  }
};

const logOut = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now()),
  };
  res.status(200).cookie("token", null, cookieOptions).json({
    message: "Çıkkış işlemi başarılı!",
  });
};

// Mailtrap API yapılandırması
const CLIENT = new MailtrapClient({
  token: "b3e21f3097355393cbc21794544810aa", // Mailtrap API Token
  testInboxId: 3342509, // Test Inbox ID
});

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(500)
        .json({ message: "Böyle bir kullanıcı bulunamadı!" });
    }

    // Şifre sıfırlama token'ı oluştur
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 5 * 60 * 1000; // 5 dakika geçerli

    await user.save({ validateBeforeSave: false });

    // Şifre sıfırlama bağlantısı
    const passwordUrl = `${req.protocol}://${req.get(
      "host"
    )}/reset/${resetToken}`;
    const message = `Merhaba, şifre sıfırlama işlemi için aşağıdaki bağlantıyı kullanabilirsiniz:\n\n${passwordUrl}\n\nBu bağlantı 5 dakika içinde geçerliliğini yitirecektir.`;

    // Mailtrap gönderici ve alıcı ayarları
    const sender = {
      email: "no-reply@yourapp.com", // Gönderen e-posta adresi
      name: "Your App Name",
    };
    const recipients = [
      {
        email: req.body.email, // Kullanıcının e-posta adresi
      },
    ];

    // E-posta gönderimi
    await CLIENT.testing.send({
      from: sender,
      to: recipients,
      subject: "Şifre Sıfırlama Talebi",
      text: message,
      category: "Password Reset",
    });

    res.status(200).json({
      message: "Şifre sıfırlama bağlantısı e-posta olarak gönderildi.",
    });
  } catch (error) {
    console.error(error);

    if (user) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
    }

    res.status(500).json({ message: "E-posta gönderiminde hata oluştu!" });
  }
};
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
    return res.status(500).json({ message: "Geçersiz Token!" });
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  const token = jwt.sign({ id: user._id }, "SECRETOKEN", {
    expiresIn: "10h",
  });
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  };

  res.status(200).cookie("token", token, cookieOptions).json({
    user,
    token,
  });
};

const userDetail = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    user,
  });
};

module.exports = {
  register,
  login,
  logOut,
  forgotPassword,
  resetPassword,
  userDetail,
};
