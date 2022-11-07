const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const dbConnect = require("./utils/dbConnect");
const usersRouters = require("./routes/user.route");
const adminRouters = require("./routes/admin.router");
const blogRouters = require("./routes/blog.router");
const contactRouters = require("./routes/contact.router");
const packageRouters = require("./routes/package.route");
const paymentsRouters = require("./routes/payment.route");
const productsRouters = require("./routes/products.router");

// this is midlewiere
app.use(cors());
app.use(express.json());

// //this is for connecting database
const client = dbConnect();

async function run() {
  try {
    await client.connect();
    console.log("Database connected");

    //This is the all routes
    app.use("/user", usersRouters);
    app.use("/admin", adminRouters);
    app.use("/blogs", blogRouters);
    app.use("/contact", contactRouters);
    app.use("/package", packageRouters);
    app.use("/payments", paymentsRouters);
    app.use("/products", productsRouters);
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from Clean City!");
});

app.listen(port, () => {
  console.log(`Clean City listening on port ${port}`);
});
