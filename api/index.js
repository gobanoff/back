const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { connectToDb, PORT } = require("../db");
const Business = require("../businesses");
const cors = require('cors');
dotenv.config();

const app = express();

// Middleware to parse JSON request body
app.use(bodyParser.json());
app.use(cors());
// Sample data for the shop and items
let shops = [
  { id: 1, name: "My Shop", location: "123 Main St" },
  { id: 2, name: "Another Shop", location: "456 Side St" },
  { id: 3, name: "Third Shop", location: "789 Another St" },
];

app.get("/shops", (req, res) => {
  res.json(shops);
  console.log("Retrieved shops");
});

app.get("/businesses", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching businesses", error: err });
  }
});

app.get("/", (req, res) => {
  res.send("Hello from the Express server!");
});

connectToDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
  });


module.exports = app;