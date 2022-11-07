const express = require("express");
const router = express.Router();
const dbConnect = require("../utils/dbConnect");
const client = dbConnect();

const paymentCollection = client.db("clean-city-admin").collection("payments");

router.get("/", async (req, res) => {
  try {
    const result = await paymentCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const paymentData = req.body;
    const result = await paymentCollection.insertOne(paymentData);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const result = await paymentCollection.findOne(filter);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const filter = { userEmail: email };
    const productPayment = await paymentCollection.find(filter).toArray();
    const result = productPayment.reverse();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
