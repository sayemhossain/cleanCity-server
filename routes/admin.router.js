const express = require("express");
const router = express.Router();
const dbConnect = require("../utils/dbConnect");
const client = dbConnect();

const userCollection = client.db("clean-city-admin").collection("users");

router.get("/", async (req, res) => {
  try {
    const query = { role: "admin" };
    const result = await userCollection.find(query).toArray();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
