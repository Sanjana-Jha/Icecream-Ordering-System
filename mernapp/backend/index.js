const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017'; 
//const client = new MongoClient(uri);
const mongoose = require('mongoose');



async function run() {
  try {
   
    mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
  console.log('MongoDB connected successfully');

  // Fetch collection data once and store globally
  mongoose.connection.db.collection("FoodCategory").find({}).toArray((err, data) => {
    if (err) console.log(err);
    else {
      global.FoodCategory = data;
      console.log(global.FoodCategory)
    }
  })
})
.catch(err => console.error('MongoDB connection error:', err));

    const doc = [
      {
          "CategoryName": "Ice-Cream",
          "name": "Cups Icecream",
          "img": "./card4.jpg",
          "options": [
              {
                  "Chocolate": "30",
                  "Strawberry": "20",
                  "Vanilla":"30",
                  "Butter-Scoth":"50"
              }
          ],
          "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
      },
      {
          "CategoryName": "Ice-Cream",
          "name": "Sticks Icecream",
          "img": "./card2.jpg",
          "options": [
              {
                "Chocolate": "30",
                "Strawberry": "20",
                "Vanilla":"30",
                "Butter-Scoth":"50"
              }
          ],
          "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
      },
      {
          "CategoryName": "Ice-Cream",
          "name": "Cone Icecream",
          "img": "./card3.jpg",
          "options": [
              {
                "Chocolate": "30",
                "Strawberry": "20",
                "Vanilla":"30",
                "Butter-Scoth":"50"
              }
          ],
          "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
      },
      {
          "CategoryName": "Ice-Cream",
          "name": "Family Pack",
          "img": "./card1.jpg",
          "options": [
              {
                "Chocolate": "130",
                "Strawberry": "120",
                "Vanilla":"130",
                "Butter-Scoth":"150"
              }
          ],
          "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
      },
     
     
  ];

//const result = await collection.insertMany(doc);
   // console.log(`Inserted document with _id: ${result}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api', require('./Routes/Admin'));

const pincodes = ["110001", "400001", "560001", "700001"];

app.get('/api/pincodes', (req, res) => {
   res.json(pincodes);
 });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
