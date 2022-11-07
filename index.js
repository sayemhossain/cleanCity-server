const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { ObjectId } = require("mongodb");
const dbConnect = require("./utils/dbConnect");
const usersRouters = require("./routes/user.route");
const blogRouters = require("./routes/blog.router");

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
    const packageOrderCollection = client
      .db("clean-city-admin")
      .collection("packageOrders");
    const contactCollection = client
      .db("clean-city-admin")
      .collection("contacts");
    const productCollection = client
      .db("clean-city-admin")
      .collection("products");

    /*-----------------------------------------------------------------------------
                       CREATE USER AND STORE IN DATABASE CODE
      ----------------------------------------------------------------------------*/
    //get all user
    app.use("/user", usersRouters);
    app.use("/blog", blogRouters);

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

    //find one using id from database
    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const blog = await blogCollection.findOne(query);
      res.send(blog);
    });

    // add new blo
    app.post("/blogs", async (req, res) => {
      const newBlog = req.body;
      const result = await blogCollection.insertOne(newBlog);
      res.send(result);
    });

    //this is for delete tool
    app.delete("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await blogcollection.deleteOne(filter);
      res.send(result);
    });

    //this is for review
    app.post("/contact", async (req, res) => {
      const contactData = req.body;
      const result = await contactCollection.insertOne(contactData);
      res.send(result);
    });

    //get all contact
    app.get("/contact", async (req, res) => {
      const contacts = await contactCollection.find().toArray();
      const result = contacts.reverse();
      res.send(result);
    });

    // add package
    app.post("/package", async (req, res) => {
      const packageData = req.body;
      const result = await packageOrderCollection.insertOne(packageData);
      res.send(result);
    });
    //get all contact
    app.get("/package", async (req, res) => {
      const packages = await packageOrderCollection.find().toArray();
      const result = packages.reverse();
      res.send(result);
    });
    // limit dashboard access
    app.get("/userpackage/:email", async (req, res) => {
      const email = req.params.email;
      const result = await packageOrderCollection
        .find({ email: email })
        .toArray();

      res.send(result);
    });
    app.get("/userpackage/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await packageOrderCollection.findOne(query);
      res.send(result);
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
