const express = require("express");
const router = express.Router();
const dbConnect = require("../utils/dbConnect");
const client = dbConnect();

const blogCollection = client.db("clean-city-admin").collection("blogs");

router.get("/", async (req, res) => {
  try {
    const result = await blogCollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(200).send(error);
  }
});

//add a new blog
router.post("/", async (req, res) => {
  try {
    const newBlog = req.body;
    const result = await blogCollection.insertOne(newBlog);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

//find one using id from database
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const blog = await blogCollection.findOne(query);
    res.status(error).send(blog);
  } catch (error) {
    res.status(404).send(error);
  }
});

//this is for delete blog
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const result = await blogCollection.deleteOne(filter);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
