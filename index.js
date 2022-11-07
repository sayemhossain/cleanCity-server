const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const dbConnect = require("./utils/dbConnect");
const usersRouters = require("./routes/user.route");
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
    app.use("/blogs", blogRouters);
    app.use("/contact", contactRouters);
    app.use("/package", packageRouters);
    app.use("/payments", paymentsRouters);
    app.use("/products", productsRouters);

    // get all admin and super admin
    app.get("/alladmin", async (req, res) => {
      const query = { role: "admin" };
      const result = await userCollection.find(query).toArray();
      res.send(result);
    });

    // this is make admin
    app.put("/user/admin/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const updateDoc = {
        $set: { role: "admin" },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // limit dashboard access
    app.get("/admin/:email", async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email: email });
      const isAdmin = user?.role === "admin";
      res.send({ admin: isAdmin });
    });
  } finally {
  }
}
run().catch(console.dir);

// basic setup code
app.get("/", (req, res) => {
  res.send("Hello from Clean City!");
});

app.listen(port, () => {
  console.log(`Clean City listening on port ${port}`);
});
