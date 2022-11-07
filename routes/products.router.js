const express = require("express");
const router = express.Router();
const dbConnect = require("../utils/dbConnect");
const client = dbConnect();

const productCollection = client.db("clean-city-admin").collection("products");

router.get("/", async (req, res) => {
  try {
    const result = await productCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const productData = req.body;
    const result = await productCollection.insertOne(productData);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const filter = { email: email };
    const product = await productCollection.find(filter).toArray();
    const result = product.reverse();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
