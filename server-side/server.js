const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

//cors
app.use(cors());
// bodyParser
app.use(bodyParser.json());

// Import & mount API router 
const apiRouter = require('./api');
app.use("/api", apiRouter);

// Server listening 
app.listen(PORT, ()=>{
    console.log(`Server is running on port:${PORT}`)
})