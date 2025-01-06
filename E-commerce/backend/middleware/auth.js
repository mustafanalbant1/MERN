const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const authenticationMid = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Token'ın doğruluğunu kontrol et

  try {
    if (!token) {
      return res
        .status(500)
        .json({ message: "Erişim için lütfen login olunuz" });
    }
    const decodedData = jwt.verify(token, "SECRETTOKEN");
    if (!decodedData) {
      return res
        .status(500)
        .json({ message: "Geçersiz token veya başka bir hata!" });
    }

    req.user = await User.findById(decodedData.id);
    if (!req.user) {
      return res.status(500).json({ message: "Kullanıcı bulunamadı" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Geçersiz token veya başka bir hata!" });
  }
};

const roleChecked = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(500)
        .json({ message: "Giriş için izininiz bulunmamaktadır" });
    }
    next();
  };
};

module.exports = { authenticationMid, roleChecked };
