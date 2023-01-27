const express = require('express');
const categoryRouter = express.Router();

// utils import
const {
    envelopes,
    getEnvelopeBycategory,
    updateEnvelopeByIndex
} = require("./utils");

// => API/spending-category routes 
categoryRouter.get("/", (req, res) =>{
    try{
      res.send(envelopes);
    }catch(err) {
      next(err)
    }
});

categoryRouter.get("/:categoryName", (req, res, next) =>{
    const envelopeParam = req.params.categoryName;
    try{
      res.send(getEnvelopeBycategory(envelopeParam));
    }catch(err) {
      next(err)
    }
});

categoryRouter.post("/", (req, res, next) =>{
    const envelopeBody = req.body;
    try{
      envelopes.push(envelopeBody);
      res.status(201).send("Envelope successfully added");
    }catch(err) {
      next(err)
    }
});

categoryRouter.put("/:categoryName", updateEnvelopeByIndex, (req, res, next) =>{
    try{
      res.status(200).send("Envelope successfully updated");
    }catch(err) {
      next(err)
    }
});

categoryRouter.delete("/:categoryName", (req, res, next)=>{
    const envelopeParam = req.params.categoryName;
    try{
      // Find the index & remove the enevelop
      const envelopeIndex = envelopes.findIndex(env => env.category === envelopeParam);
      envelopes.splice(envelopeIndex, 1);

      res.status(204).send("Envelope successfully deleted");
    }catch(err) {
      next(err)
   }
});

categoryRouter.use((err, req, res, next)=>{
    console.error(err.stack);
    req.status(500).send(err.message)
})


// Export router to "api.js"
module.exports = categoryRouter;