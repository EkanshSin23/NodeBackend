const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const dbConnect = require("./config/dbConnection")
var cors = require('cors');


dbConnect();


const bodyparser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.get("/api", (req, res) => {
    res.send("Welcome to UPSC Hindi api page !");
});
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandler);



app.listen(port, () => {
    console.log(`Server Started At ${port}`)
})
