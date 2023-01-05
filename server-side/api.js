const express = require('express');
const apiRouter = express.Router();

// db imports
const {
    envelopes,
    getEnvelopeBycategory
} = require("./db");

// middlewear imports
const {
    updateEnvelopeByIndex
} = require("./middleware");

// spendRouter
const spendRouter = require("./spend");
apiRouter.use("/spend", spendRouter)

// GET all
apiRouter.get("/", (req, res) =>{
    res.send(envelopes);
});

// GET categoryName
apiRouter.get("/:categoryName", (req, res, next) =>{
    const envelopeParam = req.params.categoryName;
    res.send(getEnvelopeBycategory(envelopeParam));
});

// POST >> db.js
apiRouter.post("/", (req, res, next) =>{
    const envelopeBody = req.body;
    envelopes.push(envelopeBody);
    res.send("Envelope successfully added");
});

// PUT categoryName
apiRouter.put("/:categoryName", updateEnvelopeByIndex, (req, res, next) =>{
    res.send("Envelope successfully updated");
});

apiRouter.delete("/:categoryName", (req, res, next)=>{
    const envelopeParam = req.params.categoryName;
    // Find the index & remove the evnevelop
    const envelopeIndex = envelopes.findIndex(env => env.category === envelopeParam);
    envelopes.splice(envelopeIndex, 1);

    res.send("Envelope successfully deleted");
});

// Export router to "server.js"
module.exports = apiRouter;