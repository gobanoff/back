const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { connectToDb } = require("./db");
const Business = require("./businesses");
dotenv.config();

const app = express();

// Middleware to parse JSON request body
app.use(bodyParser.json());

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
  res.send("Hello from the serverless function!");
});

module.exports = async (req, res) => {
    try {
      await connectToDb();
      app(req, res); // Pass the request and response to Express
    } catch (err) {
      console.error("Failed to connect to the database", err);
      res.status(500).json({ message: "Database connection error" });
    }
  };
