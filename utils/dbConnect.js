const { MongoClient, ServerApiVersion } = require("mongodb");

//For connectting Database
const dbConnect = () => {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v36mb1p.mongodb.net/?retryWrites=true&w=majority`;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  return client;
};
module.exports = dbConnect;
