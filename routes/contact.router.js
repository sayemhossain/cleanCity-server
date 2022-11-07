const express = require("express");
const router = express.Router();
const dbConnect = require("../utils/dbConnect");
const client = dbConnect();

const contactCollection = client.db("clean-city-admin").collection("contacts");

//get all contact
router.get("/", async (req, res) => {
  try {
    const contacts = await contactCollection.find().toArray();
    const result = contacts.reverse();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const contactData = req.body;
    const result = await contactCollection.insertOne(contactData);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
