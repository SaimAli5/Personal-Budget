const express = require('express');
const apiRouter = express.Router();

const {envelops,
    getEnvelopeBycategory
} = require("./db");


// GET all
apiRouter.get("/", (req, res) =>{
    res.send(envelops);
});

// GET categoryName
apiRouter.get("/:categoryName", (req, res) =>{
    const envelope = req.params.categoryName;
    res.send(getEnvelopeBycategory(envelope));
});

// POST >> db.js
apiRouter.post("/", (req, res) =>{
    const envelopeBody = req.body;
    envelops.push(envelopeBody);
    res.send(envelopeBody);
});



// Export router to "server.js"
module.exports = apiRouter;