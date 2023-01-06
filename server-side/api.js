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
    try{
      envelopes.push(envelopeBody);
      res.send("Envelope successfully added");
    }catch(err) {
      next(err)
    }
});

// PUT categoryName
apiRouter.put("/:categoryName", updateEnvelopeByIndex, (req, res, next) =>{
    res.send("Envelope successfully updated");
});

apiRouter.delete("/:categoryName", (req, res, next)=>{
    const envelopeParam = req.params.categoryName;
    try{
      // Find the index & remove the enevelop
      const envelopeIndex = envelopes.findIndex(env => env.category === envelopeParam);
      envelopes.splice(envelopeIndex, 1);

      res.send("Envelope successfully deleted");
    }catch(err) {
      next(err)
   }
});

apiRouter.use((err, req, res, next)=>{
    console.error(err.stack);
    req.status(500).send(err.message)
})

// Export router to "server.js"
module.exports = apiRouter;