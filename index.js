//username: abdullah90
//password:  2B0mFHJs5myi2apW



const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const app = express()
const port = 5000
app.use(cors())
app.use(express.json());
//MongoDB Start

const uri = "mongodb+srv://abdullah90:2B0mFHJs5myi2apW@cluster0.gjy5sb1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    await client.connect();
    const database = client.db("TodoMaster");
    const todoCollection = database.collection("todos");

    //get Api
    //geeting node server
    app.get("/todos", async (req, res) => {
      const cursor = todoCollection.find({});
      const todos = await cursor.toArray();
      res.send(todos);
    });
 
    // post API

    app.post("/todos", async (req, res) => {
      const newTodo = req.body;
      const result = await todoCollection.insertOne(newTodo);
      console.log("got new todo", req.body);
      console.log("Added todo", result);
      res.json(result);
    });

    // const result = await usersCollection.insertOne(newUser);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})