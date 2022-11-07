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

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await userCollection.findOne({ email: email });
    const isAdmin = user?.role === "admin";
    res.status(200).send({ admin: isAdmin });
  } catch (error) {
    res.status(404).send(error);
  }
});

router.put("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const filter = { email: email };
    const updateDoc = {
      $set: { role: "admin" },
    };
    const result = await userCollection.updateOne(filter, updateDoc);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
