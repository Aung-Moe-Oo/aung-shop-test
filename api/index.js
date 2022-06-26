const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
// const userRoute = require("./routes/user");
// const authRoute = require("./routes/auth");
// const productRoute = require("./routes/product");
// const orderRoute = require("./routes/order");
// const cartRoute = require("./routes/cart");

dotenv.config();

// for vercel deployment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: __dirname + "/.env" });
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
// app.use("/api/products", productRoute);
// app.use("/api/orders", orderRoute);
// app.use("/api/carts", cartRoute);

// all your routes should go here
app.use("/api/auth", require(path.join(__dirname, "/routes/auth.js")));
app.use("/api/users", require(path.join(__dirname, "/routes/user.js")));
app.use(
  "/api/products",
  require(path.join(__dirname, "/routes/product.js"))
);
app.use("/api/orders", require(path.join(__dirname, "/routes/order.js")));
app.use("/api/carts", require(path.join(__dirname, "/routes/cart.js")));

// static files (build of your frontend)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build", "index.html"));
// });

// app.listen(process.env.PORT || 5000, () => {
//   console.log("Server is running on port 5000!");
// });

