const express = require("express");
const router = express.Router();
const dbConnect = require("../utils/dbConnect");
const client = dbConnect();

const packageOrderCollection = client
  .db("clean-city-admin")
  .collection("packageOrders");

router.get("/", async (req, res) => {
  try {
    const packages = await packageOrderCollection.find().toArray();
    const result = packages.reverse();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const packageData = req.body;
    const result = await packageOrderCollection.insertOne(packageData);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await packageOrderCollection
      .find({ email: email })
      .toArray();

    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await packageOrderCollection.findOne(query);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
