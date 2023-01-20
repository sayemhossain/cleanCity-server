const express = require("express");
const { ObjectId } = require("mongodb");
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

router.get("/get-specific-user-products", async (req, res) => {
  try {
    const email = req.query.email;
    const filter = { email: email };

    const product = await productCollection.find(filter).toArray();
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/delete-specific-user-products", async (req, res) => {
  try {
    const id = req.query.id;
    const filter = { _id: ObjectId(id) };

    const result = await productCollection.deleteOne(filter);
    res.status(200).send("Delete Successfull !");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
