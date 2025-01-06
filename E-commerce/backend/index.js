const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const db = require("./config/db.js");
const product = require("./routers/product.js");
const user = require("./routers/user.js");
const cloudinary = require("cloudinary").v2;

dotenv.config();

cloudinary.config({
  cloud_name: "deducmynp",
  api_key: "811198989774259",
  api_secret: "3Wmj9UBF2lbSEfR5ZNEk1w1woRo",
});

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use("/", product);
app.use("/", user);

db();

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
