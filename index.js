const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { ObjectId } = require("mongodb");
const dbConnect = require("./utils/dbConnect");
const usersRouters = require("./routes/user.route");
const blogRouters = require("./routes/blog.router");
const contactRouters = require("./routes/contact.router");
const packageRouters = require("./routes/package.route");

// this is midlewiere
app.use(cors());
app.use(express.json());

// //this is for connecting database
const client = dbConnect();

async function run() {
  try {
    await client.connect();
    console.log("Database connected");

    /*-----------------------------------------------------------------------------
                                   ALL COLLECTION CODE
      ----------------------------------------------------------------------------*/

    const paymentCollection = client
      .db("clean-city-admin")
      .collection("payments");

    const productCollection = client
      .db("clean-city-admin")
      .collection("products");

    /*-----------------------------------------------------------------------------
                       CREATE USER AND STORE IN DATABASE CODE
      ----------------------------------------------------------------------------*/
    //get all user
    app.use("/user", usersRouters);
    app.use("/blogs", blogRouters);
    app.use("/contact", contactRouters);
    app.use("/package", packageRouters);

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

    //this is for payment
    app.post("/payment", async (req, res) => {
      const paymentData = req.body;
      const result = await paymentCollection.insertOne(paymentData);
      res.send(result);
    });

    //get id based payment
    app.get("/payment/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await paymentCollection.findOne(filter);
      res.send(result);
    });
    //get id based payment
    app.get("/payments", async (req, res) => {
      const result = await paymentCollection.find().toArray();
      res.send(result);
    });
    //get based on email
    app.get("/payments/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { userEmail: email };
      const productPayment = await paymentCollection.find(filter).toArray();
      const result = productPayment.reverse();
      res.send(result);
    });

    //this is for upload product
    app.post("/products", async (req, res) => {
      const productData = req.body;
      const result = await productCollection.insertOne(productData);
      res.send(result);
    });

    //get all product
    app.get("/products", async (req, res) => {
      const result = await productCollection.find().toArray();
      res.send(result);
    });

    //get based on email
    app.get("/products/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const product = await productCollection.find(filter).toArray();
      const result = product.reverse();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);
// This code from mongodb database end

// basic setup code
app.get("/", (req, res) => {
  res.send("Hello from Clean City!");
});

app.listen(port, () => {
  console.log(`Clean City listening on port ${port}`);
});
