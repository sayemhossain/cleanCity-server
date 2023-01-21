const express = require("express");
const { ObjectId, ObjectID } = require("mongodb");
const router = express.Router();
const dbConnect = require("../utils/dbConnect");
const client = dbConnect();

const orderCollection = client.db("clean-city-admin").collection("orders");

router.get("/", async (req, res) => {
  try {
    const result = await orderCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const orderDetails = req.body;
    const result = await orderCollection.insertOne(orderDetails);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/get-specific-user-orders", async (req, res) => {
  try {
    const email = req.query.email;
    const filter = { email: email };

    const product = await orderCollection.find(filter).toArray();
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
