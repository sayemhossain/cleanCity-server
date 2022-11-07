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
