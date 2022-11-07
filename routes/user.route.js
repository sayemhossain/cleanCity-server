const express = require("express");
const router = express.Router();
const dbConnect = require("../utils/dbConnect");
const client = dbConnect();

const userCollection = client.db("clean-city-admin").collection("users");

router.get("/", async (req, res) => {
  try {
    const users = await userCollection.find().toArray();
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send("Not Found");
  }
});

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const query = { email: email };
    const result = await userCollection.find(query).toArray();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send("Not found");
  }
});

router.put("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = req.body;

    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: user,
    };
    const result = await userCollection.updateOne(filter, updateDoc, options);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).send("Not found");
  }
});

router.put("/admin/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const filter = { email: email };
    const updateDoc = {
      $set: { role: "admin" },
    };
    const result = await userCollection.updateOne(filter, updateDoc);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).send("Not found");
  }
});

router.delete("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const filter = { email: email };
    const result = await userCollection.deleteOne(filter);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send("Not found");
  }
});

module.exports = router;
