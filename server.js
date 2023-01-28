const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Import & mount API router 
const apiRouter = require('./server/api');
app.use("/API", apiRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port:${PORT}`)
})