const Product = require("../models/product.js");
const ProductFilter = require("../utils/productFilter.js");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

const allProduct = async (req, res) => {
  const resultPerPage = 10;
  const productFilter = new ProductFilter(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await productFilter.query;
  res.status(200).json({
    products,
  });
};

const adminProduct = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    products,
  });
};

const detailProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Veritabanında ürünü açıkça ID ile sorgula
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Ürün bulunamadı." });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

const createProduct = async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let allImage = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });

    allImage.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = allImage;
  req.body.user = req.user.id;

  // const product = await Product.findById(req.body);
  const product = await Product.create(req.body);

  res.status(201).json({
    product,
  });
};

const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(201).json({
    message: "Ürün silindi",
  });
};

const updateProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
    }
  }

  let allImage = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });

    allImage.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = allImage;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    message: "Ürün güncellendi",
  });
};

const createReview = async (req, res, next) => {
  const { productId, comment, raiting } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    comment,
    raiting: Number(raiting),
  };
  const product = await Product.findById(productId);

  product.reviews.push(review);

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.raiting;
  });

  product.rating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    message: "Yorumun başarıyla eklendi...",
  });
};

module.exports = {
  allProduct,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
  adminProduct,
};
