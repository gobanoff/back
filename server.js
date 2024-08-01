const express = require('express');
const bodyParser = require('body-parser');


// Create an Express app
const app = express();

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Sample data for the shop and items
let shops = [
    { id: 1, name: "My Shop", location: "123 Main St" },
    { id: 1, name: "My Shop", location: "123 Main St" },
    { id: 1, name: "My Shop", location: "123 Main St" },
    { id: 1, name: "My Shop", location: "123 Main St" },
    { id: 1, name: "My Shop", location: "123 Main St" }
];

//app.use('/', (req, res) => {
    //res.send("shops2");
//});

app.get('/shops', (req, res) => {
    res.json(shops);console.log("shops");
});


console.log("shops");
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
module.exports = app;